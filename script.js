const root = document.documentElement;
const languageButton = document.querySelector('.language-toggle');

function setLanguage(language) {
  const isChinese = language === 'zh';
  root.dataset.lang = isChinese ? 'zh' : 'en';
  root.lang = isChinese ? 'zh-CN' : 'en';
  document.title = isChinese ? '张悦｜流体力学研究者' : 'Yue Zhang | Fluid Mechanics Researcher';
  languageButton.setAttribute('aria-pressed', String(isChinese));
  languageButton.setAttribute('aria-label', isChinese ? 'Switch to English' : '切换到中文');
  try { localStorage.setItem('site-language', isChinese ? 'zh' : 'en'); } catch (_) {}
}

let savedLanguage;
try { savedLanguage = localStorage.getItem('site-language'); } catch (_) {}
setLanguage(savedLanguage || (navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'));

languageButton.addEventListener('click', () => {
  setLanguage(root.dataset.lang === 'en' ? 'zh' : 'en');
});

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === button));
    document.querySelectorAll('.publication-item').forEach((publication) => {
      publication.hidden = selected !== 'all' && publication.dataset.type !== selected;
    });
  });
});

const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 12);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -25px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

document.getElementById('current-year').textContent = new Date().getFullYear();
