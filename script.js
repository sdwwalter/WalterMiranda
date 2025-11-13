<!-- =====================
     FILE: script.js
     ===================== -->
// Dados de exemplo: substitua por dados reais quando disponível
const properties = [
  {
    id: 'p1',
    title: 'Residencial Jardim das Palmeiras',
    city: 'Londrina',
    bedrooms: 2,
    price: 180000,
    excerpt: 'Apartamentos de 2 quartos com sacada, salão de festas e área verde. Entrada facilitada.',
    image: 'https://raw.githubusercontent.com/sdwwalter/WalterMiranda/refs/heads/main/1756656007713.jpg',
    more: 'Localizado próximo ao centro, transporte e escolas. Condições especiais para Minha Casa Minha Vida.'
  },
  {
    id: 'p2',
    title: 'Ascencia Torre Dourada',
    city: 'Londrina',
    bedrooms: 3,
    price: 480000,
    excerpt: 'Alto padrão, 3 suítes, varanda gourmet e vista panorâmica. Financiamento com a construtora.',
    image: 'https://raw.githubusercontent.com/sdwwalter/WalterMiranda/refs/heads/main/image.jpg',
    more: 'Empreendimento com infraestrutura completa: piscina, academia, salão de festas e segurança 24h.'
  },
  {
    id: 'p3',
    title: 'Minha Casa - Bairro Novo',
    city: 'Cambé',
    bedrooms: 2,
    price: 195000,
    excerpt: 'Opção econômica com boa localização para famílias. Programa habitacional disponível.',
    image: 'https://raw.githubusercontent.com/sdwwalter/WalterMiranda/refs/heads/main/1756656007713.jpg',
    more: 'Unidades com acabamento padrão, área de lazer e bom acesso a transporte público.'
  }
];

// Renderiza os cards
function renderProperties(list) {
  const container = document.getElementById('properties');
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = '<p style="color:var(--text-secondary)">Nenhum imóvel encontrado para os filtros selecionados.</p>';
    return;
  }
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'property-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" class="property-image">
      <h3 class="property-title">${p.title}</h3>
      <p class="property-desc">${p.excerpt}</p>
      <div class="property-specs">
        <span><i class="fas fa-map-marker-alt"></i> ${p.city}</span>
        <span><i class="fas fa-bed"></i> ${p.bedrooms} quartos</span>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div class="property-price">R$ ${p.price.toLocaleString('pt-BR')}</div>
        <div class="property-actions">
          <button class="link-button" onclick="openModal('${p.id}')"><i class="fas fa-info-circle"></i> Detalhes</button>
          <a class="link-button whatsapp" target="_blank" rel="noopener" href="https://wa.me/5543988616329?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20im%C3%B3vel%20${encodeURIComponent(p.title)}%20(ID:%20${p.id})"> <i class="fab fa-whatsapp"></i> Falar</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function populateFilters() {
  const citySet = new Set(properties.map(p => p.city));
  const citySelect = document.getElementById('filter-city');
  citySet.forEach(c => {
    const opt = document.createElement('option'); opt.value = c; opt.textContent = c; citySelect.appendChild(opt);
  });
}

function applyFilters() {
  const city = document.getElementById('filter-city').value;
  const bedrooms = document.getElementById('filter-bedrooms').value;
  const price = document.getElementById('filter-price').value;

  let filtered = properties.slice();
  if (city) filtered = filtered.filter(p => p.city === city);
  if (bedrooms) filtered = filtered.filter(p => {
    if (bedrooms === '4') return p.bedrooms >= 4;
    return p.bedrooms === Number(bedrooms);
  });
  if (price) {
    const [min, max] = price.split('-').map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }
  renderProperties(filtered);
}

function resetFilters() {
  document.getElementById('filter-city').value = '';
  document.getElementById('filter-bedrooms').value = '';
  document.getElementById('filter-price').value = '';
  renderProperties(properties);
}

function openModal(id) {
  const p = properties.find(x => x.id === id);
  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <img src="${p.image}" alt="${p.title}">
    <h2 style="margin-top:10px">${p.title}</h2>
    <p style="color:var(--text-secondary)">${p.more}</p>
    <ul style="text-align:left; margin-top:12px; color:var(--text-secondary)">
      <li><strong>Cidade:</strong> ${p.city}</li>
      <li><strong>Quartos:</strong> ${p.bedrooms}</li>
      <li><strong>Preço:</strong> R$ ${p.price.toLocaleString('pt-BR')}</li>
    </ul>
    <div style="margin-top:12px; display:flex; gap:10px;">
      <a class="link-button whatsapp" target="_blank" rel="noopener" href="https://wa.me/5543988616329?text=Ol%C3%A1%2C%20quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20${encodeURIComponent(p.title)}%20(ID:%20${p.id})"><i class="fab fa-whatsapp"></i> Falar pelo WhatsApp</a>
      <a class="link-button" href="mailto:walter.comproposito@gmail.com?subject=Interesse%20no%20im%C3%B3vel%20${encodeURIComponent(p.title)}">Enviar e-mail</a>
    </div>
  `;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

// Eventos
window.addEventListener('DOMContentLoaded', () => {
  populateFilters();
  renderProperties(properties);

  document.getElementById('filter-city').addEventListener('change', applyFilters);
  document.getElementById('filter-bedrooms').addEventListener('change', applyFilters);
  document.getElementById('filter-price').addEventListener('change', applyFilters);
  document.getElementById('btn-reset').addEventListener('click', resetFilters);

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });
});
