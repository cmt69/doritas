const film = document.querySelector('video');
const toggle = document.querySelector('#play');
let optedOut = false;
function start() { film.play().catch(() => { toggle.textContent = 'Reproducir video'; }); }
toggle.addEventListener('click', () => { if (film.paused) { optedOut = false; start(); } else { optedOut = true; film.pause(); } });
film.addEventListener('play', () => toggle.textContent = 'Pausar video');
film.addEventListener('pause', () => toggle.textContent = 'Reproducir video');
new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) { film.pause(); } else if (!optedOut && !matchMedia('(prefers-reduced-motion: reduce)').matches) { start(); } }, { threshold: .35 }).observe(film);
const sections = [...document.querySelectorAll('main > section')];
const footer = document.querySelector('footer');
function showSection() {
  const current = sections.find(section => '#' + section.id === location.hash) || sections[0];
  for (const section of sections) section.hidden = section !== current;
  footer.hidden = current.id !== 'contacto';
  for (const link of document.querySelectorAll('nav a')) {
    if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  window.scrollTo(0, 0);
}
showSection();
window.addEventListener('hashchange', () => {
  showSection();
  document.querySelector('main').focus({ preventScroll: true });
});
const choices = [...document.querySelectorAll('.choice')];
const features = [...document.querySelectorAll('.feature')];
choices.forEach((choice, index) => choice.addEventListener('click', () => {
  choices.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  features.forEach((feature, i) => feature.hidden = i !== index);
}));
