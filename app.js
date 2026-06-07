// ============================================
// GESTIÓN DE GASTOS E INGRESOS
// ============================================

// 1) Variables globales
let nombres = [];
let valores = [];

// ============================================
// 2) Funciones
// ============================================

function registrarMovimiento() {
  let nombre = prompt('Nombre del movimiento:');

  // Validación de duplicados
  if (nombres.some(n => n.toLowerCase() === nombre.toLowerCase())) {
    console.log(`⚠️ El movimiento "${nombre}" ya existe. No se registró.`);
    return;
  }

  // Preguntar tipo por separado
  let tipo = prompt('Tipo (ingreso/gasto):').toLowerCase().trim();
  while (tipo !== 'ingreso' && tipo !== 'gasto') {
    tipo = prompt('❌ Tipo inválido. Escribe "ingreso" o "gasto":').toLowerCase().trim();
  }

  let monto = parseFloat(prompt('Monto:'));

  // Si es gasto, convertir a negativo automáticamente
  let valor = tipo === 'gasto' ? -Math.abs(monto) : Math.abs(monto);

  nombres.push(nombre);
  valores.push(valor);
  console.log(`✅ "${nombre}" registrado como ${tipo} por $${Math.abs(valor)}`);
}

// --------------------------------------------

function calcularSaldo() {
  let saldo = 0;
  for (let i = 0; i < valores.length; i++) {
    saldo += valores[i];
  }
  return saldo;
}

// --------------------------------------------

function mostrarResumen() {
  let totalIngresos = 0;
  let totalGastos = 0;

  let ingresoMasAlto = { nombre: '', valor: -Infinity };
  let gastoMasBajo = { nombre: '', valor: Infinity };

  console.log('\n========== RESUMEN ==========');

  for (let i = 0; i < nombres.length; i++) {
    if (valores[i] > 0) {
      totalIngresos += valores[i];
      console.log(`🟢 Ingreso | ${nombres[i]}: $${valores[i]}`);
      if (valores[i] > ingresoMasAlto.valor) {
        ingresoMasAlto = { nombre: nombres[i], valor: valores[i] };
      }
    } else if (valores[i] < 0) {
      totalGastos += valores[i];
      console.log(`🔴 Gasto   | ${nombres[i]}: $${Math.abs(valores[i])}`);
      if (valores[i] < gastoMasBajo.valor) {
        gastoMasBajo = { nombre: nombres[i], valor: valores[i] };
      }
    }
  }

  console.log('=============================');
  console.log(`📊 Total de movimientos: ${nombres.length}`);
  console.log(`📈 Total Ingresos: $${totalIngresos}`);
  console.log(`📉 Total Gastos:   $${Math.abs(totalGastos)}`);
  console.log(`💰 Saldo Final:    $${calcularSaldo()}`);
  console.log('=============================');

  if (ingresoMasAlto.valor !== -Infinity) {
    console.log(`🏆 Ingreso más alto: ${ingresoMasAlto.nombre} ($${ingresoMasAlto.valor})`);
  } else {
    console.log('🏆 Ingreso más alto: No hay ingresos registrados');
  }

  if (gastoMasBajo.valor !== Infinity) {
    console.log(`⚠️  Gasto más bajo:  ${gastoMasBajo.nombre} ($${Math.abs(gastoMasBajo.valor)})`);
  } else {
    console.log('⚠️  Gasto más bajo:  No hay gastos registrados');
  }

  console.log('=============================');
}

// ============================================
// 3) Flujo de ejecución
// ============================================

let continuar = 'si';
while (continuar === 'si') {
  registrarMovimiento();
  continuar = prompt('¿Registrar otro movimiento? (si/no):').toLowerCase().trim();
}
mostrarResumen();