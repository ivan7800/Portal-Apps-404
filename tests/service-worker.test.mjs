import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

async function createHarness(scope = 'https://example.test/') {
  const handlers = {};
  const calls = { added: [], deleted: [], opened: [], put: [], claimed: 0, skipped: 0 };
  let network = 'ok';
  let cachedAsset = null;
  const cache = {
    addAll: async entries => calls.added.push(...entries),
    put: async (request, response) => calls.put.push(request.url || request),
    match: async request => {
      if (request === './index.html') return new Response('offline shell');
      return cachedAsset;
    }
  };
  const caches = {
    open: async key => { calls.opened.push(key); return cache; },
    keys: async () => ['another-app-v1', 'portal-apps-404-v38-1-release-audit', 'portal-apps-404-v41-19-persistent-app-opening', 'portal-apps-404-v41-20-native-app-links'],
    delete: async key => { calls.deleted.push(key); return true; }
  };
  const self = {
    registration: { scope },
    addEventListener: (name, handler) => { handlers[name] = handler; },
    clients: { claim: async () => { calls.claimed += 1; } },
    skipWaiting: () => { calls.skipped += 1; }
  };
  const context = {
    self,
    caches,
    location: { origin: 'https://example.test' },
    URL,
    Response,
    fetch: async () => {
      if (network === 'fail') throw new Error('offline');
      return new Response('network');
    }
  };
  vm.runInNewContext(await readFile(new URL('../sw.js', import.meta.url), 'utf8'), context);
  return {
    handlers,
    calls,
    setNetwork: value => { network = value; },
    setCachedAsset: value => { cachedAsset = value; }
  };
}

test('instala el shell y activa solo su familia de cachés', async () => {
  const harness = await createHarness();
  let task;
  harness.handlers.install({ waitUntil: value => { task = value; } });
  await task;
  assert.ok(harness.calls.added.includes('./assets/catalog-utils.js'));
  harness.handlers.activate({ waitUntil: value => { task = value; } });
  await task;
  assert.deepEqual(harness.calls.deleted, ['portal-apps-404-v38-1-release-audit', 'portal-apps-404-v41-19-persistent-app-opening']);
  assert.equal(harness.calls.claimed, 1);
});

test('aplica actualizaciones solo tras el mensaje explícito', async () => {
  const harness = await createHarness();
  harness.handlers.message({ data: { type: 'IGNORED' } });
  assert.equal(harness.calls.skipped, 0);
  harness.handlers.message({ data: { type: 'SKIP_WAITING' } });
  assert.equal(harness.calls.skipped, 1);
});

test('normaliza la navegación offline al shell y no intercepta otros orígenes', async () => {
  const harness = await createHarness();
  harness.setNetwork('fail');
  let response;
  harness.handlers.fetch({
    request: { method: 'GET', mode: 'navigate', url: 'https://example.test/?buscar=audio' },
    respondWith: value => { response = value; }
  });
  assert.equal(await (await response).text(), 'offline shell');
  let handled = false;
  harness.handlers.fetch({
    request: { method: 'GET', mode: 'cors', url: 'https://other.test/app.js' },
    respondWith: () => { handled = true; }
  });
  assert.equal(handled, false);
});

test('sirve un asset cacheado y actualiza su copia en segundo plano', async () => {
  const harness = await createHarness();
  harness.setCachedAsset(new Response('cached'));
  let response;
  harness.handlers.fetch({
    request: { method: 'GET', mode: 'cors', url: 'https://example.test/assets/app.js' },
    respondWith: value => { response = value; }
  });
  assert.equal(await (await response).text(), 'cached');
  await new Promise(resolve => setTimeout(resolve, 0));
  assert.equal(harness.calls.put.length, 1);
});


test('no reemplaza el shell offline al navegar a otra página HTML', async () => {
  const harness = await createHarness();
  let response;
  harness.handlers.fetch({
    request: { method: 'GET', mode: 'navigate', url: 'https://example.test/404.html' },
    respondWith: value => { response = value; }
  });
  assert.equal(await (await response).text(), 'network');
  assert.equal(harness.calls.put.includes('./index.html'), false);
});

test('no intercepta recursos del mismo origen fuera del scope', async () => {
  const harness = await createHarness('https://example.test/Portal-Apps-404/');
  let handled = false;
  harness.handlers.fetch({
    request: { method: 'GET', mode: 'cors', url: 'https://example.test/otro-proyecto/app.js' },
    respondWith: () => { handled = true; }
  });
  assert.equal(handled, false);
});
