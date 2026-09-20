'use strict';
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Menü öffnen'); mobileNav.hidden = true; };
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen'); mobileNav.hidden = !open; });
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); } });
matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// The preview displays original app screenshots. It never accesses app data.
const tabs = [...document.querySelectorAll('[data-tab]')];
function selectTab(tab, focus = false) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (focus) tab.focus({ preventScroll: true });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
  });
});

// No autoplay: readers choose the pace; touch and keyboard scrolling stay native.
const gallery = document.querySelector('#story-track');
const galleryControls = document.querySelector('.gallery-controls');
const previousImage = document.querySelector('[data-gallery="previous"]');
const nextImage = document.querySelector('[data-gallery="next"]');
galleryControls.hidden = false;
function updateGalleryControls() {
  previousImage.disabled = gallery.scrollLeft <= 2;
  nextImage.disabled = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 2;
}
galleryControls.addEventListener('click', event => {
  const button = event.target.closest('[data-gallery]');
  if (!button) return;
  const card = gallery.querySelector('.story-card');
  const distance = card.getBoundingClientRect().width + parseFloat(getComputedStyle(gallery).columnGap);
  gallery.scrollBy({
    left: (button.dataset.gallery === 'next' ? 1 : -1) * distance,
    behavior: document.documentElement.classList.contains('motion-paused') ? 'instant' : 'smooth'
  });
});
gallery.addEventListener('scroll', updateGalleryControls, { passive: true });
window.addEventListener('resize', updateGalleryControls);
updateGalleryControls();

const handoff = document.querySelector('.handoff-demo');
const handoffTitle = document.querySelector('#handoff-title');
const handoffDescription = document.querySelector('#handoff-description');
const handoffActions = document.querySelector('.handoff-actions');
const resetHandoff = document.querySelector('#reset-handoff');
function resolveHandoff(accepted) {
  handoff.dataset.result = accepted ? 'accepted' : 'declined';
  handoffTitle.textContent = accepted ? 'Alex hat übernommen.' : 'Alex kann gerade nicht übernehmen.';
  handoffDescription.textContent = accepted ? 'Vom Drandenken bis zum Erledigen. Lena kann loslassen.' : 'Die Anfrage ist geklärt. Lena bleibt verantwortlich.';
  handoffActions.hidden = true;
  resetHandoff.hidden = false;
  resetHandoff.focus({ preventScroll: true });
}
document.querySelector('#accept-handoff').addEventListener('click', () => resolveHandoff(true));
document.querySelector('#decline-handoff').addEventListener('click', () => resolveHandoff(false));
resetHandoff.addEventListener('click', () => {
  delete handoff.dataset.result;
  handoffTitle.textContent = 'An Alex angefragt';
  handoffDescription.textContent = 'Antwort offen. Lena bleibt verantwortlich.';
  handoffActions.hidden = false;
  resetHandoff.hidden = true;
  document.querySelector('#accept-handoff').focus({ preventScroll: true });
});

// Anchor links open the relevant native accordion before the browser scrolls to it.
function revealLinkedAnswer() {
  if (!location.hash) return;
  const target = document.getElementById(location.hash.slice(1));
  if (target?.tagName === 'DETAILS') target.open = true;
}
document.querySelectorAll('a[href^="#frage-"]').forEach(link => link.addEventListener('click', () => {
  const answer = document.getElementById(link.hash.slice(1));
  if (answer) answer.open = true;
}));
window.addEventListener('hashchange', revealLinkedAnswer);
revealLinkedAnswer();

// Motion follows the device setting and can also be paused without storing preferences.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = document.querySelector('#motion-toggle');
let manuallyPaused = false;
function updateMotion() {
  const paused = motionPreference.matches || manuallyPaused;
  document.documentElement.classList.toggle('motion-paused', paused);
  motionToggle.setAttribute('aria-pressed', String(paused));
  motionToggle.textContent = motionPreference.matches ? 'Bewegung auf deinem Gerät reduziert' : paused ? 'Animationen fortsetzen' : 'Animationen pausieren';
  motionToggle.disabled = motionPreference.matches;
}
motionToggle.addEventListener('click', () => { manuallyPaused = !manuallyPaused; updateMotion(); });
motionPreference.addEventListener('change', updateMotion);
updateMotion();

if ('IntersectionObserver' in window && !motionPreference.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => {
    // Never hide content already visible in the first viewport.
    if (element.getBoundingClientRect().top >= innerHeight) { element.classList.add('ready'); observer.observe(element); }
  });
}
