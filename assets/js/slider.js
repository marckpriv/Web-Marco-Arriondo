(() => {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dotsWrap = slider.querySelector('.dots');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  let index = 0;
  let timer;
  const INTERVAL = 5000;

  // Crear dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Ir a la diapositiva ${i + 1}`);
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
  });

  function setActive(i){
    slides.forEach(s => s.classList.remove('is-active'));
    slides[i].classList.add('is-active');

    dotsWrap.querySelectorAll('button').forEach((d, di) => {
      d.setAttribute('aria-selected', di === i ? 'true' : 'false');
    });

    index = i;
  }

  function next(){ goTo((index + 1) % slides.length); }
  function prev(){ goTo((index - 1 + slides.length) % slides.length); }

  function goTo(i){
    setActive(i);
    restart();
  }

  function play(){
    timer = setInterval(next, INTERVAL);
  }
  function pause(){
    clearInterval(timer);
  }
  function restart(){
    pause(); play();
  }

  // Eventos
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  slider.addEventListener('mouseenter', pause);
  slider.addEventListener('mouseleave', play);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Init
  setActive(0);
  play();
})();
