// ============================================================
// CONFIGURAÇÃO: edite aqui e vale para o site inteiro
// ============================================================
const WHATSAPP_NUMERO = '5545999131832'; // 55 + DDD + número, só dígitos
const ENDERECO = 'Av. Felipe Wandscheer, 2669 – Maracanã, Foz do Iguaçu – PR, 85852-352';
const MSG_PADRAO = 'Olá! Gostaria de agendar um atendimento na Frontier.';

const waLink = (texto) => 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(texto);

document.querySelectorAll('.js-whatsapp').forEach(el => {
  el.href = waLink(MSG_PADRAO); el.target = '_blank'; el.rel = 'noopener';
});
document.querySelectorAll('.js-endereco').forEach(el => { el.textContent = ENDERECO; });
document.querySelectorAll('.js-mapa').forEach(el => {
  el.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ENDERECO);
});
const mapa = document.getElementById('mapa');
if (mapa) mapa.src = 'https://www.google.com/maps?q=' + encodeURIComponent(ENDERECO) + '&output=embed';

// Menu mobile (acessível, fecha com Esc)
const toggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
function setMenu(aberto) {
  menu.classList.toggle('open', aberto);
  toggle.setAttribute('aria-expanded', String(aberto));
  toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  toggle.textContent = aberto ? '✕' : '☰';
}
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); toggle.focus(); }
});

document.getElementById('ano').textContent = new Date().getFullYear();

// Formulário de agendamento -> WhatsApp (só na página de contato)
const form = document.getElementById('contactForm');
if (form) {
  const campoData = document.getElementById('data');
  const hoje = new Date();
  campoData.min = hoje.getFullYear() + '-' + String(hoje.getMonth() + 1).padStart(2, '0') + '-' + String(hoje.getDate()).padStart(2, '0');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const tel = document.getElementById('telefone').value.trim();
    const periodo = document.getElementById('periodo').value;
    const msg = document.getElementById('mensagem').value.trim();
    const [a, m, d] = campoData.value.split('-');
    const linhas = [
      'Olá! Gostaria de agendar um atendimento.',
      'Nome: ' + nome,
      'Data preferida: ' + d + '/' + m + '/' + a,
      'Período: ' + periodo,
      'Meu WhatsApp: ' + tel
    ];
    if (msg) linhas.push('Mensagem: ' + msg);
    window.open(waLink(linhas.join('\n')), '_blank', 'noopener');
  });
}
