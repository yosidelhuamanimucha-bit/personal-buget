let nombres = [];
let valores = [];
if (!nombre || (tipo !== 'ingreso' && tipo !== 'gasto') || isNaN(monto) || monto <= 0) {
  alert('Datos inválidos. Intenta de nuevo.');
} else {
  // calcular el valor con signo
    let valor;
  if(tipo==='ingreso'){
    valor = monto;
  }
  else{
    valor = -monto;
  }

  // guardar en AMBOS arrays — siempre juntos
  nombres.push(nombre);
  valores.push(valor);

  console.log('Movimiento registrado.');
  console.log('Nombres:', nombres);
  console.log('Valores:', valores);
}