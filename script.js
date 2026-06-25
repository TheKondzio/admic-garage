/* =============================================
   ADMIC GARAGE — script.js
   ============================================= */

'use strict';

// ===== KONFIGURACJA — ZMIEŃ TUTAJ =====
var PHONE = '+48730421557';           // <-- wstaw swój numer telefonu
var GALLERY_PASSWORD = 'ADMIC2025';  // <-- hasło do dodawania zdjęć

// ===== SUPABASE (galeria widoczna dla WSZYSTKICH odwiedzających) =====
// Żeby galeria realizacji była widoczna dla każdego (nie tylko w Twojej
// przeglądarce), wstaw tutaj dane swojego darmowego projektu Supabase:
//   1. Załóż konto na https://supabase.com (darmowy plan wystarczy)
//   2. Stwórz nowy projekt
//   3. W panelu: Project Settings → API → skopiuj "Project URL" i "anon public" key
//   4. Wklej je poniżej
// Jeśli zostawisz to puste, galeria działa tymczasowo w trybie lokalnym
// (localStorage) — czyli widoczna tylko w Twojej przeglądarce.
var SUPABASE_URL = 'https://qsidohqwurbizrqjsnww.supabase.co';      // <-- np. 'https://xxxxx.supabase.co'
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzaWRvaHF3dXJiaXpycWpzbnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0MDIwMzAsImV4cCI6MjA5Nzk3ODAzMH0.oOh_GYew_wDuZdOHE2RGkwyJf6kjNsI-KqBeB7y6wlQ'; // <-- np. 'eyJhbGci...'
var SUPABASE_TABLE = 'realizacje';

var supabaseReady = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Automatycznie zaktualizuj wszystkie linki tel: na stronie
document.querySelectorAll('a[href^="tel:"]').forEach(function(el) {
  el.setAttribute('href', 'tel:' + PHONE);
});
// Zaktualizuj wyświetlany numer
document.querySelectorAll('.ccc-number').forEach(function(el) {
  if (el.tagName === 'A') el.textContent = PHONE;
});

// ===== NAVBAR SCROLL =====
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===== MOBILE MENU =====
var mobileMenu    = document.getElementById('mobileMenu');
var mobileOverlay = document.getElementById('mobileOverlay');
var menuBtn       = document.querySelector('.mobile-menu-btn');
var isMenuOpen    = false;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  mobileMenu.classList.toggle('open', isMenuOpen);
  mobileOverlay.classList.toggle('open', isMenuOpen);
  menuBtn.classList.toggle('open', isMenuOpen);
  menuBtn.setAttribute('aria-expanded', String(isMenuOpen));
  document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

function closeMenu() {
  if (!isMenuOpen) return;
  isMenuOpen = false;
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMenu();
    hideUploadPrompt();
    hideBaAdminModal();
    closeLightbox();
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

// ===== ADMIN ACCESS (tylko zespół ADMIC GARAGE) =====
// Przycisk "Dodaj zdjęcie" jest CAŁKOWICIE niewidoczny dla zwykłych
// odwiedzających i nie istnieje w widocznym kodzie strony.
//
// Sposób 1: kliknij logo w górnym menu 5 razy pod rząd (w ciągu 3 sekund).
// Sposób 2: otwórz stronę z dopiskiem ?admin=1 w adresie, np.:
//   https://admicgarage.pl/?admin=1
var ADMIN_URL_PARAM   = 'admin';
var ADMIN_CLICK_COUNT = 5;     // liczba kliknięć na logo
var ADMIN_CLICK_WINDOW_MS = 3000; // czas, w jakim trzeba kliknąć

function isAdminModeRequested() {
  try {
    var params = new URLSearchParams(window.location.search);
    return params.get(ADMIN_URL_PARAM) === '1';
  } catch (e) {
    return false;
  }
}

var isAdminActive = false;

function injectAdminAddButton() {
  var actions = document.querySelector('.gallery-actions');
  if (!actions) return;
  if (document.querySelector('.btn-gallery-add')) return; // już dodany

  var btn = document.createElement('button');
  btn.className = 'btn-gallery-add';
  btn.textContent = '+ Dodaj zdjęcie realizacji';
  btn.addEventListener('click', showUploadPrompt);

  actions.insertBefore(btn, actions.firstChild);
}

function enableAdminMode() {
  isAdminActive = true;
  injectAdminAddButton();
  if (typeof renderRealizacje === 'function') renderRealizacje(); // pokaż przyciski "Usuń"
  var realizacje = document.getElementById('realizacje');
  if (realizacje) {
    realizacje.scrollIntoView({ behavior: 'smooth' });
  }
}

if (isAdminModeRequested()) {
  isAdminActive = true;
  injectAdminAddButton();
}

// Sekretne wejście: 5 kliknięć na logo
(function() {
  var logoEl = document.querySelector('.logo');
  if (!logoEl) return;

  var clickCount = 0;
  var resetTimer = null;

  logoEl.addEventListener('click', function(e) {
    clickCount++;

    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = setTimeout(function() {
      clickCount = 0;
    }, ADMIN_CLICK_WINDOW_MS);

    if (clickCount >= ADMIN_CLICK_COUNT) {
      clickCount = 0;
      e.preventDefault(); // przy 5. kliknięciu nie przewijaj do #hero
      enableAdminMode();
    }
  });
})();

// ===== REALIZACJE — PRZED/PO oraz TYLKO EFEKT =====
// Każda realizacja: { id, title, type, before, after, created_at }
// type: 'ba'     -> before + after wymagane (detailing, korekta lakieru, tapicerka)
// type: 'single' -> tylko "after" wymagane (kodowanie BMW, CarPlay — brak sensownego "przed")
// "before"/"after" to obrazy w formacie data-URL (base64, skompresowane) lub
// publiczne URL-e, jeśli kiedyś przejdziesz na Supabase Storage.
var realizacje    = [];
var baGrid        = document.getElementById('baGrid');
var galleryEmpty  = document.getElementById('galleryEmpty');
var baLoadMoreWrap = document.getElementById('baLoadMoreWrap');
var baLoadMoreBtn  = document.getElementById('baLoadMoreBtn');

var LOCAL_KEY = 'admic_realizacje';
var BA_INITIAL_VISIBLE = 6; // ile kart pokazujemy na starcie, zanim trzeba kliknąć "Pokaż więcej"
var BA_LOAD_STEP = 6;       // o ile kart rozwijamy przy każdym kliknięciu
var baVisibleCount = BA_INITIAL_VISIBLE;

function supabaseHeaders() {
  return {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
  };
}

function loadRealizacje() {
  if (supabaseReady) {
    fetch(SUPABASE_URL + '/rest/v1/' + SUPABASE_TABLE + '?select=*&order=created_at.desc', {
      headers: supabaseHeaders()
    })
      .then(function(res) {
        if (!res.ok) throw new Error('Supabase fetch failed: ' + res.status);
        return res.json();
      })
      .then(function(data) {
        realizacje = data || [];
        renderRealizacje();
      })
      .catch(function(err) {
        console.error('Nie udało się wczytać realizacji z Supabase:', err);
        // Fallback na lokalne dane, żeby strona nie wyglądała zepsuta
        loadRealizacjeLocal();
      });
  } else {
    loadRealizacjeLocal();
  }
}

function loadRealizacjeLocal() {
  try {
    var stored = localStorage.getItem(LOCAL_KEY);
    realizacje = stored ? JSON.parse(stored) : [];
  } catch (e) {
    realizacje = [];
  }
  renderRealizacje();
}

function saveRealizacjeLocal() {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(realizacje.slice(0, 60)));
  } catch (e) {
    alert('Lokalna pamięć jest pełna — usuń starsze realizacje, aby dodać nowe.');
  }
}

function buildRealizationCard(item) {
  var isSingle = item.type === 'single';

  var card = document.createElement('article');
  card.className = 'ba-card' + (isSingle ? ' is-single' : '');

  var images = document.createElement('div');
  images.className = 'ba-images';

  if (!isSingle) {
    var beforeWrap = document.createElement('div');
    beforeWrap.className = 'ba-image-wrap is-before';
    var beforeImg = document.createElement('img');
    beforeImg.src = item.before;
    beforeImg.alt = (item.title || 'Realizacja ADMIC GARAGE') + ' — przed';
    beforeImg.loading = 'lazy';
    var beforeTag = document.createElement('span');
    beforeTag.className = 'ba-tag';
    beforeTag.textContent = 'Przed';
    beforeWrap.appendChild(beforeImg);
    beforeWrap.appendChild(beforeTag);
    beforeWrap.addEventListener('click', function() { openLightbox(item.before); });
    images.appendChild(beforeWrap);
  }

  var afterWrap = document.createElement('div');
  afterWrap.className = 'ba-image-wrap is-after';
  var afterImg = document.createElement('img');
  afterImg.src = item.after;
  afterImg.alt = isSingle
    ? (item.title || 'Realizacja ADMIC GARAGE')
    : (item.title || 'Realizacja ADMIC GARAGE') + ' — po';
  afterImg.loading = 'lazy';
  afterWrap.appendChild(afterImg);

  if (!isSingle) {
    var afterTag = document.createElement('span');
    afterTag.className = 'ba-tag';
    afterTag.textContent = 'Po';
    afterWrap.appendChild(afterTag);
  }

  afterWrap.addEventListener('click', function() { openLightbox(item.after); });
  images.appendChild(afterWrap);

  var caption = document.createElement('div');
  caption.className = 'ba-caption';

  var captionTitle = document.createElement('div');
  captionTitle.className = 'ba-caption-title';
  captionTitle.textContent = item.title || 'Realizacja ADMIC GARAGE';
  caption.appendChild(captionTitle);

  if (isAdminActive) {
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'ba-delete-btn';
    deleteBtn.type = 'button';
    deleteBtn.innerHTML = '🗑 Usuń';
    deleteBtn.setAttribute('aria-label', 'Usuń realizację: ' + (item.title || ''));
    deleteBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      handleDeleteClick(item, deleteBtn);
    });
    caption.appendChild(deleteBtn);
  }

  card.appendChild(images);
  card.appendChild(caption);
  return card;
}

function handleDeleteClick(item, btnEl) {
  var label = item.title || 'tę realizację';
  var confirmed = window.confirm('Usunąć "' + label + '" z galerii? Tej operacji nie można odwrócić.');
  if (!confirmed) return;

  btnEl.disabled = true;
  btnEl.textContent = 'Usuwanie...';

  deleteRealizacja(item)
    .then(function() {
      renderRealizacje();
    })
    .catch(function(err) {
      console.error('Błąd usuwania realizacji:', err);
      alert('Nie udało się usunąć realizacji. Sprawdź połączenie i spróbuj ponownie.');
      btnEl.disabled = false;
      btnEl.innerHTML = '🗑 Usuń';
    });
}

function deleteRealizacja(item) {
  if (supabaseReady) {
    return fetch(SUPABASE_URL + '/rest/v1/' + SUPABASE_TABLE + '?id=eq.' + encodeURIComponent(item.id), {
      method: 'DELETE',
      headers: supabaseHeaders()
    })
      .then(function(res) {
        if (!res.ok) throw new Error('Supabase delete failed: ' + res.status);
        return loadRealizacjePromise();
      });
  } else {
    realizacje = realizacje.filter(function(r) { return r.id !== item.id; });
    saveRealizacjeLocal();
    return Promise.resolve();
  }
}

// Wersja loadRealizacje, która zwraca Promise (potrzebne po usunięciu z Supabase,
// żeby poczekać na świeże dane przed ponownym renderem).
function loadRealizacjePromise() {
  if (!supabaseReady) return Promise.resolve();
  return fetch(SUPABASE_URL + '/rest/v1/' + SUPABASE_TABLE + '?select=*&order=created_at.desc', {
    headers: supabaseHeaders()
  })
    .then(function(res) {
      if (!res.ok) throw new Error('Supabase fetch failed: ' + res.status);
      return res.json();
    })
    .then(function(data) {
      realizacje = data || [];
    });
}

function renderRealizacje() {
  baGrid.innerHTML = '';

  if (!realizacje.length) {
    baGrid.style.display = 'none';
    galleryEmpty.style.display = 'block';
    baLoadMoreWrap.classList.remove('is-visible');
    return;
  }

  baGrid.style.display = 'grid';
  galleryEmpty.style.display = 'none';

  var visible = realizacje.slice(0, baVisibleCount);
  visible.forEach(function(item) {
    baGrid.appendChild(buildRealizationCard(item));
  });

  // "Pokaż więcej" tylko jeśli jest coś jeszcze do pokazania — strona nie
  // rozrasta się od razu o wszystkie realizacje, gdy ich liczba rośnie.
  if (realizacje.length > baVisibleCount) {
    baLoadMoreWrap.classList.add('is-visible');
    var remaining = realizacje.length - baVisibleCount;
    baLoadMoreBtn.textContent = 'Pokaż więcej realizacji (' + remaining + ')';
  } else {
    baLoadMoreWrap.classList.remove('is-visible');
  }
}

if (baLoadMoreBtn) {
  baLoadMoreBtn.addEventListener('click', function() {
    baVisibleCount += BA_LOAD_STEP;
    renderRealizacje();
  });
}

function compressImage(dataUrl, maxW, quality, callback) {
  var img = new Image();
  img.onload = function() {
    var scale  = Math.min(1, maxW / img.width);
    var canvas = document.createElement('canvas');
    canvas.width  = Math.round(img.width  * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    callback(canvas.toDataURL('image/jpeg', quality));
  };
  img.src = dataUrl;
}

function readAndCompress(file, callback) {
  if (!file || !file.type.startsWith('image/')) { callback(null); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    compressImage(e.target.result, 1200, 0.82, callback);
  };
  reader.readAsDataURL(file);
}

function saveRealizacja(item) {
  if (supabaseReady) {
    return fetch(SUPABASE_URL + '/rest/v1/' + SUPABASE_TABLE, {
      method: 'POST',
      headers: Object.assign({ 'Prefer': 'return=representation' }, supabaseHeaders()),
      body: JSON.stringify(item)
    })
      .then(function(res) {
        if (!res.ok) throw new Error('Supabase insert failed: ' + res.status);
        return res.json();
      })
      .then(function() {
        loadRealizacje();
      });
  } else {
    item.id = Date.now();
    item.created_at = new Date().toISOString();
    realizacje.unshift(item);
    saveRealizacjeLocal();
    renderRealizacje();
    return Promise.resolve();
  }
}

// ===== GALLERY PASSWORD MODAL =====
var uploadModal        = document.getElementById('uploadModal');
var uploadModalOverlay = document.getElementById('uploadModalOverlay');
var galleryPasswordEl  = document.getElementById('galleryPassword');
var galleryPasswordErr = document.getElementById('galleryPasswordError');

function showUploadPrompt() {
  uploadModal.classList.add('open');
  uploadModalOverlay.classList.add('open');
  galleryPasswordEl.value = '';
  galleryPasswordErr.classList.remove('visible');
  document.body.style.overflow = 'hidden';
  setTimeout(function() { galleryPasswordEl.focus(); }, 50);
}

function hideUploadPrompt() {
  uploadModal.classList.remove('open');
  uploadModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function confirmUploadPassword() {
  var entered = galleryPasswordEl.value;
  if (entered === GALLERY_PASSWORD) {
    hideUploadPrompt();
    showBaAdminModal();
  } else {
    galleryPasswordErr.classList.add('visible');
    galleryPasswordEl.value = '';
    galleryPasswordEl.focus();
    galleryPasswordEl.style.borderColor = '#E24B4A';
    setTimeout(function() {
      galleryPasswordEl.style.borderColor = '';
    }, 800);
  }
}

// Allow Enter key in password modal
if (galleryPasswordEl) {
  galleryPasswordEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') confirmUploadPassword();
  });
}

// ===== ADD REALIZATION MODAL (admin) =====
var baAdminModal   = document.getElementById('baAdminModal');
var baAdminOverlay = document.getElementById('baAdminOverlay');
var baTitleInput   = document.getElementById('baTitleInput');
var baTypeToggle   = document.getElementById('baTypeToggle');
var baTypeBA       = document.getElementById('baTypeBA');
var baTypeSingle   = document.getElementById('baTypeSingle');
var baTypeHint     = document.getElementById('baTypeHint');
var baAdminUploads = document.getElementById('baAdminUploads');
var baPickBefore   = document.getElementById('baPickBefore');
var baPickAfter    = document.getElementById('baPickAfter');
var baAdminPreview = document.getElementById('baAdminPreview');
var baAdminError   = document.getElementById('baAdminError');
var baAdminSave    = document.getElementById('baAdminSave');
var photoUploadBefore = document.getElementById('photoUploadBefore');
var photoUploadAfter  = document.getElementById('photoUploadAfter');

var baPendingBefore = null;
var baPendingAfter  = null;
var baCurrentType   = 'ba'; // 'ba' | 'single'

var BA_TYPE_HINTS = {
  ba: 'Dla detailingu, korekty lakieru, prania tapicerki — porównanie przed i po.',
  single: 'Dla kodowania BMW, CarPlay, aktywacji funkcji — pokazujesz tylko efekt/zrzut ekranu, bez „przed”.'
};

function setBaType(type) {
  baCurrentType = type;
  baTypeBA.classList.toggle('is-active', type === 'ba');
  baTypeSingle.classList.toggle('is-active', type === 'single');
  baTypeHint.textContent = BA_TYPE_HINTS[type];

  if (type === 'single') {
    baAdminUploads.classList.add('is-single');
    baPickBefore.style.display = 'none';
    baPickAfter.textContent = baPendingAfter ? '✓ Zdjęcie wybrane' : '+ Zdjęcie efektu';
  } else {
    baAdminUploads.classList.remove('is-single');
    baPickBefore.style.display = '';
    baPickAfter.textContent = baPendingAfter ? '✓ PO wybrane' : '+ Zdjęcie PO';
  }
  refreshBaPreview();
}

if (baTypeBA) baTypeBA.addEventListener('click', function() { setBaType('ba'); });
if (baTypeSingle) baTypeSingle.addEventListener('click', function() { setBaType('single'); });

function showBaAdminModal() {
  baAdminModal.classList.add('open');
  baAdminOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function hideBaAdminModal() {
  baAdminModal.classList.remove('open');
  baAdminOverlay.classList.remove('open');
  document.body.style.overflow = '';
  baTitleInput.value = '';
  baPendingBefore = null;
  baPendingAfter  = null;
  baAdminPreview.innerHTML = '';
  baAdminError.classList.remove('visible');
  baPickBefore.classList.remove('has-image');
  baPickAfter.classList.remove('has-image');
  baPickBefore.textContent = '+ Zdjęcie PRZED';
  baPickAfter.textContent  = '+ Zdjęcie PO';
  setBaType('ba');
}

function refreshBaPreview() {
  baAdminPreview.innerHTML = '';
  var sources = baCurrentType === 'single'
    ? [baPendingAfter]
    : [baPendingBefore, baPendingAfter];
  sources.forEach(function(src) {
    if (!src) return;
    var img = document.createElement('img');
    img.src = src;
    baAdminPreview.appendChild(img);
  });
}

if (baPickBefore) {
  baPickBefore.addEventListener('click', function() { photoUploadBefore.click(); });
}
if (baPickAfter) {
  baPickAfter.addEventListener('click', function() { photoUploadAfter.click(); });
}

if (photoUploadBefore) {
  photoUploadBefore.addEventListener('change', function(e) {
    var file = e.target.files[0];
    readAndCompress(file, function(compressed) {
      if (!compressed) return;
      baPendingBefore = compressed;
      baPickBefore.classList.add('has-image');
      baPickBefore.textContent = '✓ PRZED wybrane';
      refreshBaPreview();
    });
    e.target.value = '';
  });
}

if (photoUploadAfter) {
  photoUploadAfter.addEventListener('change', function(e) {
    var file = e.target.files[0];
    readAndCompress(file, function(compressed) {
      if (!compressed) return;
      baPendingAfter = compressed;
      baPickAfter.classList.add('has-image');
      baPickAfter.textContent = baCurrentType === 'single' ? '✓ Zdjęcie wybrane' : '✓ PO wybrane';
      refreshBaPreview();
    });
    e.target.value = '';
  });
}

if (baAdminSave) {
  baAdminSave.addEventListener('click', function() {
    var title = baTitleInput.value.trim();
    var requiresBefore = baCurrentType === 'ba';
    var valid = title && baPendingAfter && (!requiresBefore || baPendingBefore);

    if (!valid) {
      baAdminError.textContent = requiresBefore
        ? 'Dodaj oba zdjęcia (przed i po) oraz tytuł.'
        : 'Dodaj zdjęcie efektu oraz tytuł.';
      baAdminError.classList.add('visible');
      return;
    }
    baAdminError.classList.remove('visible');
    baAdminSave.textContent = 'Zapisywanie...';
    baAdminSave.disabled = true;

    var payload = {
      title: title,
      type: baCurrentType,
      after: baPendingAfter,
      before: baCurrentType === 'ba' ? baPendingBefore : null
    };

    saveRealizacja(payload)
      .then(function() {
        hideBaAdminModal();
      })
      .catch(function(err) {
        console.error('Błąd zapisu realizacji:', err);
        baAdminError.textContent = 'Błąd zapisu — sprawdź konfigurację Supabase.';
        baAdminError.classList.add('visible');
      })
      .finally(function() {
        baAdminSave.textContent = 'Zapisz →';
        baAdminSave.disabled = false;
      });
  });
}

// ===== LIGHTBOX =====
var lightbox    = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== CONTACT FORM — FORMSPREE =====
function handleFormSubmit(e) {
  e.preventDefault();

  var form       = document.getElementById('contactForm');
  var btn        = document.getElementById('formSubmitBtn');
  var successEl  = document.getElementById('formSuccess');
  var errorEl    = document.getElementById('formError');

  // Walidacja
  var name  = form.querySelector('[name="name"]').value.trim();
  var phone = form.querySelector('[name="phone"]').value.trim();
  if (!name || !phone) {
    errorEl.textContent = 'Uzupełnij imię i telefon.';
    errorEl.style.display = 'block';
    successEl.style.display = 'none';
    return;
  }

  btn.textContent = 'Wysyłanie...';
  btn.disabled = true;
  errorEl.style.display = 'none';
  successEl.style.display = 'none';

  var data = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
  .then(function(response) {
    if (response.ok) {
      successEl.textContent = '✓ Zapytanie wysłane! Odezwiemy się wkrótce.';
      successEl.style.display = 'block';
      form.reset();
    } else {
      return response.json().then(function(data) {
        throw new Error(data.errors ? data.errors.map(function(e){ return e.message; }).join(', ') : 'Błąd wysyłania');
      });
    }
  })
  .catch(function(err) {
    errorEl.textContent = 'Wystąpił błąd. Zadzwoń do nas lub spróbuj później.';
    errorEl.style.display = 'block';
    console.error('Form error:', err);
  })
  .finally(function() {
    btn.textContent = 'Wyślij zapytanie →';
    btn.disabled = false;
  });
}

// ===== EXPOSE GLOBALS =====
window.toggleMenu             = toggleMenu;
window.closeMenu              = closeMenu;
window.showUploadPrompt       = showUploadPrompt;
window.hideUploadPrompt       = hideUploadPrompt;
window.confirmUploadPassword  = confirmUploadPassword;
window.hideBaAdminModal       = hideBaAdminModal;
window.handleFormSubmit       = handleFormSubmit;
window.openLightbox           = openLightbox;
window.closeLightbox          = closeLightbox;

// ===== INIT =====
loadRealizacje();
