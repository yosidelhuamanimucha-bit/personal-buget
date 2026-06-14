// ============================================
// OOP-OBJECTS.JS — Clases
// ============================================

class Movimiento {
  constructor(nombre, tipo, valor) {
    this.nombre = nombre;
    this.tipo   = tipo;
    this.valor  = valor;
    this.fecha  = new Date().toLocaleDateString();
  }

  // ── NUEVO ──────────────────────────────────
  esValido() {
    if (!this.nombre || this.nombre.trim() === '') {
      console.log('❌ El nombre no puede estar vacío.');
      return false;
    }
    if (this.tipo !== 'ingreso' && this.tipo !== 'gasto') {
      console.log('❌ El tipo debe ser "ingreso" o "gasto".');
      return false;
    }
    if (isNaN(this.valor) || this.valor <= 0) {
      console.log('❌ El valor debe ser un número mayor a 0.');
      return false;
    }
    return true;
  }

  esIngreso() { return this.tipo === 'ingreso'; }
  esGasto()   { return this.tipo === 'gasto';   }

  datosMovimiento() {
    const signo = this.esIngreso() ? '+' : '-';
    return `${this.nombre} (${this.tipo}): ${signo}$${this.valor.toFixed(2)}`;
  }
}

class Presupuesto {
  constructor() { this.movimientos = []; }

  agregar(movimiento) {
    // ── NUEVO: valida antes de aceptar ────────
    if (!movimiento.esValido()) return false;

    const existe = this.movimientos.some(
      m => m.nombre.toLowerCase() === movimiento.nombre.toLowerCase()
    );
    if (existe) {
      console.log(`⚠️  "${movimiento.nombre}" ya existe. No se registró.`);
      return false;
    }

    this.movimientos.push(movimiento);
    console.log(`✅ "${movimiento.nombre}" registrado como ${movimiento.tipo} por $${movimiento.valor.toFixed(2)}`);

    // ── NUEVO: avisa si se superó el límite ───
    this.verificarLimites();
    return true;
  }

  eliminar(nombre) {
    this.movimientos = this.movimientos.filter(m => m.nombre !== nombre);
  }

  buscarPorNombre(texto) {
    return this.movimientos.find(
      m => m.nombre.toLowerCase().includes(texto.toLowerCase())
    );
  }

  obtenerIngresos() { return this.movimientos.filter(m => m.esIngreso()); }
  obtenerGastos()   { return this.movimientos.filter(m => m.esGasto());   }

  totalIngresos() {
    return this.obtenerIngresos().reduce((acc, m) => acc + m.valor, 0);
  }

  totalGastos() {
    return this.obtenerGastos().reduce((acc, m) => acc + m.valor, 0);
  }

  saldo() { return this.totalIngresos() - this.totalGastos(); }

  // ── NUEVO ──────────────────────────────────
  verificarLimites() {
    const ingresos = this.totalIngresos();
    const gastos   = this.totalGastos();

    if (ingresos === 0) return; // sin ingresos no hay límite que comparar

    const porcentaje = (gastos / ingresos) * 100;

    if (porcentaje >= 100) {
      console.log(`🚨 ALERTA: tus gastos ($${gastos.toFixed(2)}) superan tus ingresos ($${ingresos.toFixed(2)}).`);
    } else if (porcentaje >= 80) {
      console.log(`⚠️  ADVERTENCIA: tus gastos representan el ${porcentaje.toFixed(1)}% de tus ingresos. ¡Cuidado!`);
    }
  }

  ingresoMasAlto() {
    const ingresos = this.obtenerIngresos();
    if (ingresos.length === 0) return null;
    return ingresos.reduce((max, m) => m.valor > max.valor ? m : max);
  }

  gastoMasAlto() {
    const gastos = this.obtenerGastos();
    if (gastos.length === 0) return null;
    return gastos.reduce((max, m) => m.valor > max.valor ? m : max);
  }

  resumen() {
    return {
      cantidad: this.movimientos.length,
      ingresos: this.totalIngresos(),
      gastos:   this.totalGastos(),
      saldo:    this.saldo()
    };
  }
}