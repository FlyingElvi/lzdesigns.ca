(function () {
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));
  if (!tiles.length) return;

  var box = document.createElement('div');
  box.className = 'lb';
  box.innerHTML =
    '<button class="lb-btn lb-close" aria-label="Close">&times;</button>' +
    '<button class="lb-btn lb-prev" aria-label="Previous">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lb-btn lb-next" aria-label="Next">&#8250;</button>' +
    '<div class="lb-cap"></div>';
  document.body.appendChild(box);

  var img = box.querySelector('img');
  var cap = box.querySelector('.lb-cap');
  var i = 0;

  function preload(n) {
    if (n < 0 || n >= tiles.length) return;
    var p = new Image();
    p.src = tiles[n].getAttribute('href');
  }

  function show(n) {
    i = (n + tiles.length) % tiles.length;
    var t = tiles[i];
    img.src = t.getAttribute('href');
    img.alt = t.dataset.title || '';
    cap.textContent = (t.dataset.title || '') + '  ·  ' + (i + 1) + ' / ' + tiles.length;
    preload(i + 1);
    preload(i - 1);
  }

  function open(n) {
    show(n);
    box.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    box.classList.remove('is-open');
    document.body.style.overflow = '';
    img.src = '';
  }

  tiles.forEach(function (t, n) {
    t.addEventListener('click', function (e) {
      e.preventDefault();
      open(n);
    });
  });

  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(i - 1); });
  box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(i + 1); });
  box.addEventListener('click', function (e) { if (e.target === box || e.target === img) close(); });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(i - 1);
    else if (e.key === 'ArrowRight') show(i + 1);
  });

  // swipe on touch
  var x0 = null;
  box.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) show(dx < 0 ? i + 1 : i - 1);
    x0 = null;
  }, { passive: true });
})();
