/* Turbonautics — micro turbojet hero carousel (TJ-100 / TJ-450). Auto-advances every 3 seconds. */
(function () {
  var slider = document.getElementById('mte-hero-slider');
  if (!slider) return;

  var slides = slider.querySelectorAll('.mte-hero-slide');
  var dots = slider.querySelectorAll('.mte-hero-dot');
  var INTERVAL = 3000;
  var current = 0;
  var timer = null;

  function show(i) {
    current = (i + slides.length) % slides.length;
    for (var k = 0; k < slides.length; k++) {
      var on = k === current;
      slides[k].classList.toggle('is-active', on);
      slides[k].setAttribute('aria-hidden', on ? 'false' : 'true');
      if (dots[k]) {
        dots[k].classList.toggle('is-active', on);
        dots[k].setAttribute('aria-selected', on ? 'true' : 'false');
      }
    }
  }

  function start() {
    stop();
    timer = setInterval(function () { show(current + 1); }, INTERVAL);
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  for (var d = 0; d < dots.length; d++) {
    dots[d].addEventListener('click', function () {
      show(parseInt(this.getAttribute('data-slide'), 10));
      start();
    });
  }

  // Pause while the visitor is hovering or using the keyboard inside the hero
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', start);

  // Swipe between variants on touch screens
  var x0 = null;
  slider.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) { show(current + (dx < 0 ? 1 : -1)); start(); }
    x0 = null;
  }, { passive: true });

  show(0);
  start();
})();
