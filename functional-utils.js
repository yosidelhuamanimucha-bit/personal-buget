// ============================================
// FUNCTIONAL-UTILS.JS — Utilidades y estadísticas
// ============================================

const promedioIngresos = presupuesto => {
  const ingresos = presupuesto.obtenerIngresos();
  if (ingresos.length === 0) return 0;
  return presupuesto.totalIngresos() / ingresos.length;
};

const mediana = presupuesto => {
  const valores = presupuesto.movimientos.map(m => m.esIngreso() ? m.valor : -m.valor);
  if (valores.length === 0) return 0;
  const ordenados = [...valores].sort((a, b) => a - b);
  const mitad = Math.floor(ordenados.length / 2);
  return ordenados.length % 2 !== 0
    ? ordenados[mitad]
    : (ordenados[mitad - 1] + ordenados[mitad]) / 2;
};

const desviacionEstandar = presupuesto => {
  const valores = presupuesto.movimientos.map(m => m.valor);
  if (valores.length === 0) return 0;
  const promedio = valores.reduce((a, v) => a + v, 0) / valores.length;
  const varianza = valores.reduce((a, v) => a + Math.pow(v - promedio, 2), 0) / valores.length;
  return Math.sqrt(varianza);
};

const categorizarPorMonto = presupuesto => {
  const resultado = { bajo: [], medio: [], alto: [] };
  presupuesto.movimientos.forEach(m => {
    if      (m.valor < 100)  resultado.bajo.push(m);
    else if (m.valor < 1000) resultado.medio.push(m);
    else                     resultado.alto.push(m);
  });
  return resultado;
};

const buscarPrimerGastoMayor = (presupuesto, monto) =>
  presupuesto.obtenerGastos().find(m => m.valor > monto);

const enDolares = presupuesto =>
  presupuesto.movimientos.map(m => ({ ...m, valor: m.valor / 4 }));

const imprimirReporte = presupuesto => {
  console.log('\n========== RESUMEN ==========');

  presupuesto.movimientos.forEach((m, i) => {
    const emoji = m.esIngreso() ? '🟢 Ingreso' : '🔴 Gasto  ';
    console.log(`${emoji} | ${i + 1}. ${m.datosMovimiento()} — ${m.fecha}`);
  });

  const r   = presupuesto.resumen();
  const max = presupuesto.ingresoMasAlto();
  const min = presupuesto.gastoMasAlto();

  console.log('=============================');
  console.log(`📊 Total movimientos:   ${r.cantidad}`);
  console.log(`📈 Total ingresos:      $${r.ingresos.toFixed(2)}`);
  console.log(`📉 Total gastos:        $${r.gastos.toFixed(2)}`);
  console.log(`💰 Saldo final:         $${r.saldo.toFixed(2)}`);
  console.log('-----------------------------');
  console.log(`📐 Promedio ingresos:   $${promedioIngresos(presupuesto).toFixed(2)}`);
  console.log(`📏 Mediana:             $${mediana(presupuesto).toFixed(2)}`);
  console.log(`📉 Desviación estándar: $${desviacionEstandar(presupuesto).toFixed(2)}`);
  console.log('-----------------------------');
  console.log(`🏆 Ingreso más alto: ${max ? max.nombre + ' ($' + max.valor.toFixed(2) + ')' : 'Sin ingresos'}`);
  console.log(`⚠️  Gasto más alto:  ${min ? min.nombre + ' ($' + min.valor.toFixed(2) + ')' : 'Sin gastos'}`);
  console.log('=============================');

  const cats = categorizarPorMonto(presupuesto);
  console.log('📦 Categorías por monto:');
  console.log('  🔹 Bajo  (<$100): ', cats.bajo.map(m => m.nombre));
  console.log('  🔸 Medio (<$1000):', cats.medio.map(m => m.nombre));
  console.log('  🔺 Alto  (≥$1000):', cats.alto.map(m => m.nombre));
  console.log('=============================\n');
};