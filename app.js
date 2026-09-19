'use strict';
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Menü öffnen'); mobileNav.hidden = true; };
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen'); mobileNav.hidden = !open; });
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); } });
matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// An explicit illustrative preview, with no account, network requests or persisted data.
const preview = document.querySelector('#app-preview');
const tabs = [...document.querySelectorAll('[data-tab]')];
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const previewHeading = (title, subtitle, symbol) => `<div class="phone-topline"><span>BEISPIEL AUS EUREM ALLTAG</span><span class="avatar sage">L</span></div><div class="phone-greeting"><div><p>${title}</p><span>${subtitle}</span></div>${icon(symbol)}</div>`;
const screens = {
  heute: preview.innerHTML,
  gedanken: `${previewHeading('Deine Gedanken.', 'Erst mal loslassen. Nur für dich.', 'note')}<div class="capture">${icon('plus')}<div>Was beschäftigt dich?<small>Hier ist Platz dafür.</small></div></div><div class="preview-notes"><div class="preview-thought">${icon('heart')}Wieder einen Abend nur für uns planen.<span>Beziehung · Nur für dich</span></div><div class="preview-thought">Welche Aufgaben möchte ich diese Woche abgeben?<span>Alltag · Nur für dich</span></div></div><div class="private-note">${icon('lock')}<span>Du entscheidest, was du teilst.</span></div>`,
  aufteilung: `${previewHeading('Unsere Aufteilung.', 'Klare Zusagen. Gemeinsam getragen.', 'handoff')}<div class="task-card sage"><div class="task-heading">${icon('home')}<span>Unser Zuhause</span></div><strong>Wocheneinkauf planen</strong><div class="task-bottom"><span><b class="avatar">L</b>Lena hat übernommen</span>${icon('check')}</div></div><div class="task-card lavender"><div class="task-heading">${icon('family')}<span>Unser Alltag</span></div><strong>Termin in der Werkstatt</strong><div class="task-bottom"><span><b class="avatar">A</b>Alex hat übernommen</span>${icon('check')}</div></div><div class="preview-summary butter"><strong>Wochenende besprechen</strong><p>Noch zu klären · Wer übernimmt?</p></div><p class="preview-label">Eine Übergabe braucht eure Zusage.</p>`,
  wir: `${previewHeading('Unser Wir.', 'Euer Alltag hat hier einen Platz.', 'family')}<div class="preview-couple"><span class="person"><b class="avatar sage">L</b>Lena</span>${icon('heart')}<span class="person"><b class="avatar lavender">A</b>Alex</span></div><div class="preview-summary sage"><strong>Unser Zuhause</strong><p>Was ansteht. Wer es übernimmt.</p></div><div class="preview-summary lavender"><strong>Unser Alltag</strong><p>Termine und Absprachen für uns beide.</p></div><div class="private-note">${icon('lock')}<span>Persönliche Gedanken bleiben getrennt.</span></div>`
};
function selectTab(tab, focus = false) {
  const changed = preview.getAttribute('aria-labelledby') !== tab.id;
  tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
  if (changed) {
    preview.innerHTML = screens[tab.dataset.tab];
    preview.setAttribute('aria-labelledby', tab.id);
    preview.scrollTop = 0;
  }
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
