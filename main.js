const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* Menu mobile */
const toggle = $('.menu-toggle');
const nav = $('.nav');
const setMenu = (open) => {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  $('i', toggle).className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
};
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
$$('.nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
});

/* Link ativo conforme a seção na tela */
const links = $$('.nav a[href^="#"]');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach((s) => spy.observe(s));

/* Acordeão da Stack (um aberto por vez) */
$$('.layer button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const layer = btn.parentElement;
    const willOpen = !layer.classList.contains('open');
    $$('.layer').forEach((l) => {
      l.classList.remove('open');
      $('button', l).setAttribute('aria-expanded', 'false');
    });
    if (willOpen) {
      layer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* Formulário: evita envio duplo */
const form = $('#contact-form');
if (form) {
  form.addEventListener('submit', () => {
    const b = $('button[type=submit]', form);
    b.disabled = true;
    b.textContent = 'Enviando...';
  });
}

/* Ano do rodapé */
$('#year').textContent = new Date().getFullYear();
