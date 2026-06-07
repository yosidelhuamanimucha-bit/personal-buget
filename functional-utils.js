// ============================================
// GESTIÓN DE GASTOS E INGRESOS — UTILIDADES FUNCIONALES
// ============================================

// 1) Utilidades básicas
// ============================================

const obtenerIngresos        = valores => valores.filter(valor => valor > 0);
const obtenerGastos          = valores => valores.filter(valor => valor < 0);
const montosAbsolutos        = valores => valores.map(valor => Math.abs(valor));
const enDolares              = valores => valores.map(valor => valor / 4);
const buscarPrimerGastoMayor = (valores, monto) => valores.find(valor => valor < -monto);

// ============================================
// 2) Cálculos con reduce
// ============================================

const totalIngresos = valores =>
  obtenerIngresos(valores).reduce((acumulador, valor) => acumulador + valor, 0);

const totalGastos = valores =>
  obtenerGastos(valores).reduce((acumulador, valor) => acumulador + valor, 0);

const promedioIngresos = valores => {
  const ingresos = obtenerIngresos(valores);
  if (ingresos.length === 0) return 0;
  return totalIngresos(valores) / ingresos.length;
};

// ============================================
// 3) Generador de reporte
// ============================================

const generarValoresReporte = valores => [
  valores.length,
  totalIngresos(valores),
  totalGastos(valores),
  calcularSaldo(valores)
];

const imprimirReporte = (nombres, valores) => {
  console.log('\n--- Resumen Final ---');

  valores.forEach((valor, indice) => {
    const tipo = valor > 0 ? 'ingreso' : 'gasto';
    console.log(`  ${indice + 1}. ${nombres[indice]} (${tipo}): $${Math.abs(valor).toFixed(2)}`);
  });

  const reporte = generarValoresReporte(valores);
  console.log('--------------------');
  console.log('Total movimientos: ' + reporte[0]);
  console.log('Total ingresos:    $' + reporte[1].toFixed(2));
  console.log('Total gastos:      $' + Math.abs(reporte[2]).toFixed(2));
  console.log('Saldo:             $' + reporte[3].toFixed(2));
  console.log('Promedio ingresos: $' + promedioIngresos(valores).toFixed(2));
  console.log('--------------------');
};

// ============================================
// 4) Estadísticas
// ============================================

const categorizarPorMonto = valores => {
  const resultado = { bajo: [], medio: [], alto: [] };

  valores.forEach(valor => {
    const monto = Math.abs(valor);
    if (monto < 100)       resultado.bajo.push(valor);
    else if (monto < 1000) resultado.medio.push(valor);
    else                   resultado.alto.push(valor);
  });

  return resultado;
};

const mediana = valores => {
  if (valores.length === 0) return 0;

  const ordenados = [...valores].sort((a, b) => a - b);
  const mitad = Math.floor(ordenados.length / 2);

  return ordenados.length % 2 !== 0
    ? ordenados[mitad]
    : (ordenados[mitad - 1] + ordenados[mitad]) / 2;
};

const desviacionEstandar = valores => {
  if (valores.length === 0) return 0;

  const promedio = valores.reduce((a, v) => a + v, 0) / valores.length;
  const varianza = valores.reduce((a, v) => a + Math.pow(v - promedio, 2), 0) / valores.length;

  return Math.sqrt(varianza);
};