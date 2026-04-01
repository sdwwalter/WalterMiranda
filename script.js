'use strict';

/* ============================================================
   Walter Miranda — script.js
   Manages: hamburger nav, property filters, modal
   ============================================================ */

/* ===== HAMBURGER / NAV OVERLAY ===== */
(function initNav() {
  const hamburger   = document.getElementById('hamburger');
  const navOverlay  = document.getElementById('nav-overlay');
  if (!hamburger || !navOverlay) return;

  function openNav() {
    hamburger.classList.add('active');
    navOverlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    hamburger.classList.remove('active');
    navOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('active') ? closeNav() : openNav();
  });

  // Close when clicking the overlay backdrop
  navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) closeNav();
  });

  // Close when a nav link is clicked
  navOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('active')) closeNav();
  });
})();


/* ===== PROPERTIES DATA ===== */
const PROPERTIES = [
  {
    id: 1,
    title: 'Apartamento Alto Padrão – Gleba Palhano',
    city: 'Londrina',
    bedrooms: 3,
    price: 480000,
    area: 98,
    type: 'Apartamento',
    description: 'Apartamento moderno com vista privilegiada, varanda gourmet e 2 vagas cobertas. Acabamento refinado, próximo a shoppings, parques e serviços. Pronto para morar.',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  },
  {
    id: 2,
    title: 'Casa em Condomínio Fechado – Portal das Colinas',
    city: 'Londrina',
    bedrooms: 4,
    price: 920000,
    area: 240,
    type: 'Casa',
    description: 'Casa espaçosa em condomínio de alto padrão com piscina privativa, churrasqueira, jardim paisagístico e segurança 24h. Lazer completo para toda a família.',
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
  },
  {
    id: 3,
    title: 'Apartamento 2 Quartos – Centro',
    city: 'Londrina',
    bedrooms: 2,
    price: 195000,
    area: 62,
    type: 'Apartamento',
    description: 'Excelente localização no coração de Londrina. Infraestrutura consolidada, ideal para moradia ou investimento. Financiamento facilitado.',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
  },
  {
    id: 4,
    title: 'Studio Planejado – Bela Suíça',
    city: 'Londrina',
    bedrooms: 1,
    price: 148000,
    area: 38,
    type: 'Studio',
    description: 'Studio totalmente mobiliado, decorado com muito gosto. Próximo à UEL e ao centro. Perfeito para solteiros, casais ou investidores.',
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
  },
  {
    id: 5,
    title: 'Casa Térrea com Quintal – Warta',
    city: 'Londrina',
    bedrooms: 3,
    price: 320000,
    area: 145,
    type: 'Casa',
    description: 'Casa térrea bem distribuída, quintal generoso e garagem coberta para 2 veículos. Bairro tranquilo, valorizado e com excelente qualidade de vida.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id: 6,
    title: 'Apartamento 2 Quartos – Cambé',
    city: 'Cambé',
    bedrooms: 2,
    price: 175000,
    area: 55,
    type: 'Apartamento',
    description: 'Ótima opção com acesso fácil ao centro e a Londrina. Lazer coletivo, vaga garantida e condomínio acessível. Financiável pela Caixa.',
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
  },
  {
    id: 7,
    title: 'Sobrado 3 Suítes – Astorga',
    city: 'Astorga',
    bedrooms: 3,
    price: 285000,
    area: 130,
    type: 'Sobrado',
    description: 'Sobrado moderno com 3 suítes, varanda e área de lazer. Acabamento diferenciado em bairro residencial nobre de Astorga.',
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
  },
];


/* ===== IMOVEIS PAGE ===== */
(function initImoveis() {
  const grid        = document.getElementById('properties');
  if (!grid) return;

  const filterCity      = document.getElementById('filter-city');
  const filterBedrooms  = document.getElementById('filter-bedrooms');
  const filterPrice     = document.getElementById('filter-price');
  const btnReset        = document.getElementById('btn-reset');

  // Populate city dropdown dynamically
  const cities = [...new Set(PROPERTIES.map(p => p.city))].sort();
  cities.forEach(city => {
    const opt = document.createElement('option');
    opt.value       = city;
    opt.textContent = city;
    filterCity.appendChild(opt);
  });

  function formatBRL(val) {
    return val.toLocaleString('pt-BR', {
      style: 'currency', currency: 'BRL', maximumFractionDigits: 0,
    });
  }

  function applyFilters() {
    const city = filterCity.value;
    const beds = filterBedrooms.value;
    const priceRange = filterPrice.value;

    let [pMin, pMax] = [0, Infinity];
    if (priceRange) {
      const parts = priceRange.split('-').map(Number);
      pMin = parts[0];
      pMax = parts[1] || Infinity;
    }

    return PROPERTIES.filter(p => {
      if (city && p.city !== city) return false;
      if (beds) {
        const b = parseInt(beds, 10);
        if (beds === '4' ? p.bedrooms < 4 : p.bedrooms !== b) return false;
      }
      if (priceRange && (p.price < pMin || p.price > pMax)) return false;
      return true;
    });
  }

  function renderGrid() {
    const filtered = applyFilters();
    grid.innerHTML = '';

    if (!filtered.length) {
      grid.innerHTML = '<p class="no-results"><i class="fas fa-search" style="color:var(--gold);margin-right:8px"></i>Nenhum imóvel encontrado com esses filtros.</p>';
      return;
    }

    filtered.forEach((p, i) => {
      const card = document.createElement('article');
      card.className = 'property-card';
      card.style.animationDelay = `${0.28 + i * 0.07}s`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Ver detalhes: ${p.title}`);
      card.innerHTML = `
        <img src="${p.img}" alt="${p.title}" loading="lazy">
        <div class="property-info">
          <p class="property-title">${p.title}</p>
          <p class="property-price">${formatBRL(p.price)}</p>
          <div class="property-meta">
            <span><i class="fas fa-bed"></i>${p.bedrooms} quarto${p.bedrooms !== 1 ? 's' : ''}</span>
            <span><i class="fas fa-ruler-combined"></i>${p.area} m²</span>
            <span><i class="fas fa-map-marker-alt"></i>${p.city}</span>
          </div>
        </div>
      `;
      card.addEventListener('click', () => openModal(p));
      card.addEventListener('keydown', e => e.key === 'Enter' && openModal(p));
      grid.appendChild(card);
    });
  }

  [filterCity, filterBedrooms, filterPrice].forEach(el => {
    el.addEventListener('change', renderGrid);
  });
  btnReset.addEventListener('click', () => {
    filterCity.value     = '';
    filterBedrooms.value = '';
    filterPrice.value    = '';
    renderGrid();
  });

  renderGrid();


  /* ===== MODAL ===== */
  const modal      = document.getElementById('modal');
  const modalBody  = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  function openModal(p) {
    const waText = encodeURIComponent(`Olá Walter, tenho interesse no imóvel: ${p.title} (${p.city})`);
    modalBody.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="modal-details">
        <h2>${p.title}</h2>
        <p class="modal-price">${formatBRL(p.price)}</p>
        <div class="modal-meta">
          <span><i class="fas fa-bed"></i>${p.bedrooms} quarto${p.bedrooms !== 1 ? 's' : ''}</span>
          <span><i class="fas fa-ruler-combined"></i>${p.area} m²</span>
          <span><i class="fas fa-map-marker-alt"></i>${p.city}</span>
          <span><i class="fas fa-home"></i>${p.type}</span>
        </div>
        <p class="modal-desc">${p.description}</p>
        <a href="https://wa.me/5543988616329?text=${waText}"
           target="_blank" rel="noopener" class="modal-cta">
          <i class="fab fa-whatsapp"></i> Tenho Interesse — Falar no WhatsApp
        </a>
      </div>
    `;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
})();
