// ============================================
// APP.JS — Flujo principal
// ============================================

function registrarMovimiento(presupuesto) {
  const nombre = prompt('Nombre del movimiento:');
  if (!nombre) return;

  let tipo = prompt('Tipo (ingreso / gasto):').toLowerCase().trim();
  while (tipo !== 'ingreso' && tipo !== 'gasto') {
    tipo = prompt('❌ Tipo inválido. Escribe "ingreso" o "gasto":').toLowerCase().trim();
  }

  const monto = parseFloat(prompt('Monto:'));
  if (isNaN(monto) || monto <= 0) {
    console.log('❌ Monto inválido. No se registró.');
    return;
  }

  presupuesto.agregar(new Movimiento(nombre, tipo, monto));
}

// ── Inicio ──────────────────────────────────
const miPresupuesto = new Presupuesto();

let continuar = 'si';
while (continuar === 'si') {
  registrarMovimiento(miPresupuesto);
  continuar = prompt('¿Registrar otro? (si/no):').toLowerCase().trim();
}

imprimirReporte(miPresupuesto);