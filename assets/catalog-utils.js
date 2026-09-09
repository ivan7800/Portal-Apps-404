/* Universo 404 OS · Utilidades puras del catálogo */
(function (root) {
  'use strict';

  function normalizeText(value) {
    var text = String(value == null ? '' : value).toLowerCase();
    try { text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (error) {}
    return text.replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function queryTokens(query) {
    return normalizeText(query).split(/\s+/).filter(Boolean);
  }

  function appText(app, languages, aliases) {
    return normalizeText([
      app.name,
      app.category,
      app.short,
      app.description,
      app.saga,
      languages[app.name],
      aliases[app.name] || ''
    ].join(' '));
  }

  function searchScore(app, query, languages, aliases) {
    var tokens = queryTokens(query);
    if (!tokens.length) return 0;
    var name = normalizeText(app.name);
    var category = normalizeText(app.category);
    var summary = normalizeText(app.short);
    var full = appText(app, languages, aliases);
    var score = 0;
    tokens.forEach(function (token) {
      if (name.indexOf(token) !== -1) score += 12;
      if (category.indexOf(token) !== -1) score += 7;
      if (summary.indexOf(token) !== -1) score += 5;
      if (full.indexOf(token) !== -1) score += 3;
    });
    if (full.indexOf(normalizeText(query)) !== -1) score += 14;
    return score;
  }

  root.PORTAL_CATALOG = {
    normalizeText: normalizeText,
    appText: appText,
    queryTokens: queryTokens,
    searchScore: searchScore
  };
})(typeof window !== 'undefined' ? window : this);
