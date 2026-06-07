let nombres = [];
let valores = [];

// ============================================
// 1) Funciones principales
// ============================================

function registrarMovimiento() {
  const nombre = prompt('Nombre del movimiento:');

  // Validación de duplicados
  if (nombres.some(n => n.toLowerCase() === nombre.toLowerCase())) {
    console.log(`⚠️ El movimiento "${nombre}" ya existe. No se registró.`);
    return;
  }

  // Validar tipo
  let tipo = prompt('Tipo (ingreso/gasto):').toLowerCase().trim();
  while (tipo !== 'ingreso' && tipo !== 'gasto') {
    tipo = prompt('❌ Tipo inválido. Escribe "ingreso" o "gasto":').toLowerCase().trim();
  }

  // Validar monto
  const monto = parseFloat(prompt('Monto:'));
  if (isNaN(monto) || monto <= 0) {
    console.log('❌ Monto inválido. No se registró.');
    return;
  }

  // Guardar como positivo o negativo según tipo
  const valor = tipo === 'gasto' ? -Math.abs(monto) : Math.abs(monto);
  nombres.push(nombre);
  valores.push(valor);
  console.log(`✅ "${nombre}" registrado como ${tipo} por $${monto.toFixed(2)}`);
}

// --------------------------------------------

function calcularSaldo() {
  return valores.reduce((acumulador, valor) => acumulador + valor, 0);
}

// --------------------------------------------

function mostrarResumen() {
  const ingresos = obtenerIngresos(valores);
  const gastos   = obtenerGastos(valores);

  let totalIngresos = ingresos.reduce((a, v) => a + v, 0);
  let totalGastos   = gastos.reduce((a, v) => a + v, 0);

  let ingresoMasAlto = { nombre: '', valor: -Infinity };
  let gastoMasBajo   = { nombre: '', valor: Infinity };

  console.log('\n========== RESUMEN ==========');

  nombres.forEach((nombre, i) => {
    if (valores[i] > 0) {
      console.log(`🟢 Ingreso | ${nombre}: $${valores[i].toFixed(2)}`);
      if (valores[i] > ingresoMasAlto.valor) {
        ingresoMasAlto = { nombre, valor: valores[i] };
      }
    } else if (valores[i] < 0) {
      console.log(`🔴 Gasto   | ${nombre}: $${Math.abs(valores[i]).toFixed(2)}`);
      if (valores[i] < gastoMasBajo.valor) {
        gastoMasBajo = { nombre, valor: valores[i] };
      }
    }
  });

  console.log('=============================');
  console.log(`📊 Total de movimientos: ${nombres.length}`);
  console.log(`📈 Total Ingresos: $${totalIngresos.toFixed(2)}`);
  console.log(`📉 Total Gastos:   $${Math.abs(totalGastos).toFixed(2)}`);
  console.log(`💰 Saldo Final:    $${calcularSaldo().toFixed(2)}`);
  console.log('=============================');

  if (ingresoMasAlto.valor !== -Infinity) {
    console.log(`🏆 Ingreso más alto: ${ingresoMasAlto.nombre} ($${ingresoMasAlto.valor.toFixed(2)})`);
  } else {
    console.log('🏆 Ingreso más alto: No hay ingresos registrados');
  }

  if (gastoMasBajo.valor !== Infinity) {
    console.log(`⚠️  Gasto más bajo:  ${gastoMasBajo.nombre} ($${Math.abs(gastoMasBajo.valor).toFixed(2)})`);
  } else {
    console.log('⚠️  Gasto más bajo:  No hay gastos registrados');
  }

  console.log('=============================');
  console.log('📋 Ingresos:', obtenerIngresos(valores));
  console.log('📋 Gastos:', obtenerGastos(valores));
  console.log('📋 Montos sin signo:', montosAbsolutos(valores));
  console.log('📋 Primer gasto > $40:', buscarPrimerGastoMayor(valores, 40));
  console.log('=============================');
}

// ============================================
// 2) Flujo de ejecución
// ============================================

let continuar = 'si';
while (continuar === 'si') {
  registrarMovimiento();
  continuar = prompt('¿Registrar otro movimiento? (si/no):').toLowerCase().trim();
}
mostrarResumen();