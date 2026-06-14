// ============================================
// APP.JS — Flujo principal (DOM)
// ============================================

const form       = document.getElementById('form-mov');
const lista      = document.getElementById('lista');
const saldoEl    = document.getElementById('saldo');
const ingresosEl = document.getElementById('total-ingresos');
const gastosEl   = document.getElementById('total-gastos');
const toggleBtn  = document.getElementById('toggle-dark');

const presupuesto = new Presupuesto();

// ── Toggle modo oscuro ───────────────────────
toggleBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  toggleBtn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
});

// ── Datos de ejemplo ────────────────────────
presupuesto.agregar(new Movimiento('Salario',   'ingreso', 3000,  'trabajo'));
presupuesto.agregar(new Movimiento('Cena',      'gasto',   45.50, 'comida'));
presupuesto.agregar(new Movimiento('Freelance', 'ingreso', 500,   'trabajo'));

// ── Genera el <li> con badge de categoría ───
function liHTML(m) {
  const ingreso = m.esIngreso();
  const caja    = ingreso ? 'bg-green-50 dark:bg-green-900 border-green-500'
                          : 'bg-red-50 dark:bg-red-900 border-red-500';
  const texto   = ingreso ? 'text-green-700 dark:text-green-300'
                          : 'text-red-700 dark:text-red-300';
  const signo   = ingreso ? '+' : '-';

  return `
    <li class="flex items-center justify-between p-3 border-l-4 rounded
               transition duration-200 hover:scale-105 ${caja}">
      <span class="text-gray-800 dark:text-gray-100 flex items-center gap-2 flex-wrap">
        <span class="font-medium">${m.nombre}</span>
        <span class="text-xs text-gray-500 dark:text-gray-400">(${m.tipo})</span>
        <span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300
                     px-2 py-1 rounded-full">
          ${m.categoria}
        </span>
      </span>
      <span class="font-semibold ${texto}">${signo}$${m.valor.toFixed(2)}</span>
    </li>`;
}

// ── Actualiza lista, saldo, ingresos y gastos ──
function render() {
  lista.innerHTML        = presupuesto.movimientos.map(liHTML).join('');
  saldoEl.textContent    = '$' + presupuesto.saldo().toFixed(2);
  ingresosEl.textContent = '$' + presupuesto.totalIngresos().toFixed(2);
  gastosEl.textContent   = '$' + presupuesto.totalGastos().toFixed(2);
}

// ── Escucha el formulario ────────────────────
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre    = document.getElementById('nombre').value.trim();
  const tipo      = document.getElementById('tipo').value;
  const valor     = parseFloat(document.getElementById('monto').value);
  const categoria = document.getElementById('categoria').value.trim() || 'general'; // ← NUEVO

  const agregado = presupuesto.agregar(new Movimiento(nombre, tipo, valor, categoria));
  if (agregado) {
    render();
    e.target.reset();
  }
});

// ── Carga inicial ────────────────────────────
render();