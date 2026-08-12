/**
 * RankWeave - Shared Client JavaScript
 * Handles mobile navigation toggle, modal controls, live filtering, and interactive forms across all pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (menuIcon) menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // Close X icon
      } else {
        mobileMenu.classList.add('hidden');
        if (menuIcon) menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16'); // Hamburger icon
      }
    });
  }

  // App Download Modal
  const downloadBtns = document.querySelectorAll('.trigger-download-modal');
  const downloadModal = document.getElementById('download-modal');
  const closeDownloadModalBtn = document.getElementById('close-download-modal');

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (downloadModal) {
        downloadModal.classList.remove('hidden');
        downloadModal.classList.add('flex');
      }
    });
  });

  if (closeDownloadModalBtn && downloadModal) {
    closeDownloadModalBtn.addEventListener('click', () => {
      downloadModal.classList.add('hidden');
      downloadModal.classList.remove('flex');
    });

    downloadModal.addEventListener('click', (e) => {
      if (e.target === downloadModal) {
        downloadModal.classList.add('hidden');
        downloadModal.classList.remove('flex');
      }
    });
  }

  // Listing Detail Modal Handler
  const listingModal = document.getElementById('listing-modal');
  const closeListingModalBtn = document.getElementById('close-listing-modal');

  if (closeListingModalBtn && listingModal) {
    closeListingModalBtn.addEventListener('click', () => {
      listingModal.classList.add('hidden');
      listingModal.classList.remove('flex');
    });

    listingModal.addEventListener('click', (e) => {
      if (e.target === listingModal) {
        listingModal.classList.add('hidden');
        listingModal.classList.remove('flex');
      }
    });
  }

  // Newsletter Form Handler
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`Thank you! ${input.value} has been subscribed to RankWeave updates.`);
        input.value = '';
      }
    });
  });

  // Highlight Active Link in Navigation
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html'))) {
      link.classList.add('text-blue-600', 'font-semibold');
      link.classList.remove('text-slate-600');
    }
  });
});

/**
 * Open detail modal with dynamic content for listings
 */
window.openListingDetail = function(title, category, traffic, price, rating, desc, verified) {
  const listingModal = document.getElementById('listing-modal');
  if (!listingModal) return;

  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-category').innerText = category;
  document.getElementById('modal-traffic').innerText = traffic;
  document.getElementById('modal-price').innerText = price;
  document.getElementById('modal-rating').innerText = rating + ' ★';
  document.getElementById('modal-desc').innerText = desc;
  
  const badgeEl = document.getElementById('modal-verified-badge');
  if (badgeEl) {
    if (verified) {
      badgeEl.classList.remove('hidden');
    } else {
      badgeEl.classList.add('hidden');
    }
  }

  listingModal.classList.remove('hidden');
  listingModal.classList.add('flex');
};

/**
 * Toast notification helper
 */
window.showToast = function(message) {
  let toast = document.getElementById('rw-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'rw-toast';
    toast.className = 'fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-lg shadow-xl text-sm border border-slate-700 transition-all transform translate-y-10 opacity-0 pointer-events-none flex items-center space-x-2';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>${message}</span>`;
  
  toast.classList.remove('translate-y-10', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 4000);
};
