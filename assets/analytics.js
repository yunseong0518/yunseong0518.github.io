// Google Analytics 4 + site event tracking, shared by every page.
//
// Load it as a plain (non-deferred) script in <head> so `track()` exists
// before the page's deferred scripts run.
//
// Declarative: any element with data-track sends that event on click, and
// each data-track-* attribute becomes an event parameter (snake_case):
//   <a href="cv.pdf" data-track="cv_open" data-track-location="hero">CV</a>
//     -> gtag('event', 'cv_open', { location: 'hero', link_url: '...' })
//
// Imperative: track('showcase_view', { project: 'hpbrdf' })
//
// Only the deployed site reports to GA. Local previews (file://, localhost)
// log to the console and window.__trackLog instead, so testing never
// pollutes the real data.
(function () {
  var GA_ID = 'G-RPLGL3Y54Q';
  var IS_PROD = location.hostname === 'yunseong0518.github.io';

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  if (IS_PROD) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  window.__trackLog = [];
  window.track = function (name, params) {
    params = params || {};
    if (IS_PROD) {
      gtag('event', name, params);
    } else {
      window.__trackLog.push({ name: name, params: params });
      console.debug('[analytics]', name, params);
    }
  };

  // "trackPaperId" -> "paper_id"
  function paramName(key) {
    var rest = key.slice('track'.length);
    return rest.charAt(0).toLowerCase() + rest.slice(1).replace(/[A-Z]/g, function (c) {
      return '_' + c.toLowerCase();
    });
  }

  function onClick(e) {
    // auxclick also fires for the middle button ("open in new tab").
    if (e.type === 'auxclick' && e.button !== 1) return;
    var el = e.target.closest && e.target.closest('[data-track]');
    if (!el) return;
    var params = {};
    Object.keys(el.dataset).forEach(function (k) {
      if (k !== 'track' && k.indexOf('track') === 0) params[paramName(k)] = el.dataset[k];
    });
    if (el.href) params.link_url = el.href;
    window.track(el.dataset.track, params);
  }

  document.addEventListener('click', onClick, true);
  document.addEventListener('auxclick', onClick, true);
})();
