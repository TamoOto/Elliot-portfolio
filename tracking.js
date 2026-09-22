(() => {
  'use strict';

  const ENDPOINT = 'https://plprdfogrdbgvrgnapcf.supabase.co/functions/v1/portfolio-track';
  const REF_KEY = 'eg_portfolio_ref';
  const SESSION_KEY = 'eg_portfolio_session';
  const REF_PATTERN = /^[A-Za-z0-9_-]{16,64}$/;

  const params = new URLSearchParams(window.location.search);
  const urlRef = params.get('r');

  if (urlRef && REF_PATTERN.test(urlRef)) {
    sessionStorage.setItem(REF_KEY, urlRef);
  }

  const ref = sessionStorage.getItem(REF_KEY);
  if (!ref || !REF_PATTERN.test(ref)) return;

  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  function send(eventType, target = null) {
    const payload = JSON.stringify({
      ref,
      event_type: eventType,
      page_path: window.location.pathname,
      target,
      session_id: sessionId,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: 'text/plain;charset=UTF-8' }));
      return;
    }

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }

  function trackingLabel(element) {
    if (element.dataset.track) return element.dataset.track;
    if (element.dataset.project) return `project_${element.dataset.project}`;

    const href = element.getAttribute('href') || '';
    if (href.includes('cv.html')) return 'cv_open';
    if (href.startsWith('mailto:')) return 'email';
    if (href.startsWith('tel:')) return 'phone';
    if (href.includes('linkedin.com')) return 'linkedin';
    if (href.includes('github.com')) return 'github';
    if (href.startsWith('#')) return `section_${href.slice(1) || 'top'}`;
    if (element.matches('button[onclick*="print"]')) return 'cv_download';
    return 'other';
  }

  // Conserve le code de suivi lors du passage du portfolio au CV, et inversement.
  document.querySelectorAll('a[href]').forEach((link) => {
    const rawHref = link.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;

    const url = new URL(rawHref, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (!url.pathname.endsWith('.html') && !url.pathname.endsWith('/')) return;
    url.searchParams.set('r', ref);
    link.href = url.toString();
  });

  document.addEventListener('click', (event) => {
    const element = event.target.closest('a, button, [data-project]');
    if (!element) return;
    send('click', trackingLabel(element));
  }, true);

  send('page_view');
})();
