// Runs only for the initial static HTML fallback before the React application mounts.
document.addEventListener('DOMContentLoaded', function () {
  const nav = document.getElementById('static-mobile-nav');
  const toggle = document.querySelector('button.mobile-toggle');
  if (!nav || !toggle) return;
  toggle.addEventListener('click', function () {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
  });
});
