import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Pago {
  folio: string;
  operador: string;
  cantidad?: number;
  cantidadLetra?: string;
  fechaPago?: string;
  operacionTexto?: string;
}

interface OperacionCampo {
  valor: number | null;
  operador: string;
}

@Component({
  selector: 'app-historialpagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historialpagos.component.html'
})
export class HistorialpagosComponent {

  // ====== DATOS FICTICIOS ======
  pagos: Pago[] = [
    { folio: 'F-001', operador: 'MAT001' },
    { folio: 'F-002', operador: 'MAT002' },
    { folio: 'F-003', operador: 'MAT003' }
  ];
  // (Reemplazar luego con datos reales)

  // ====== FILTROS ======
  filtroFolio: string = '';
  filtroOperador: string = '';
  fechaDesde?: string;
  fechaHasta?: string;

  // ====== MODALES ======
  mostrarModalCalculadora = false;
  mostrarModalConfirmarOperacion = false;
  mostrarModalConfirmarFecha = false;

  // ====== CALCULADORA ======
  operaciones: OperacionCampo[] = [
    { valor: null, operador: '+' },
    { valor: null, operador: '' }
  ];
  resultado: number = 0;
  resultadoLetra: string = '';
  operacionTexto: string = '';

  pagoSeleccionado: Pago | null = null;

  // =======================
  // ===== FILTROS =========
  // =======================
  pagosFiltrados(): Pago[] {
    return this.pagos.filter(p => {
      const fFolio = this.filtroFolio
        ? p.folio.toLowerCase().includes(this.filtroFolio.toLowerCase())
        : true;
      const fOp = this.filtroOperador
        ? p.operador.toLowerCase().includes(this.filtroOperador.toLowerCase())
        : true;
      const desde = this.fechaDesde ? new Date(this.fechaDesde) : null;
      const hasta = this.fechaHasta ? new Date(this.fechaHasta) : null;
      const fechaPago = p.fechaPago ? new Date(p.fechaPago) : null;

      const dentroDeRango =
        (!desde || (fechaPago && fechaPago >= desde)) &&
        (!hasta || (fechaPago && fechaPago <= hasta));

      return fFolio && fOp && dentroDeRango;
    });
  }

  limpiarFiltros() {
    this.filtroFolio = '';
    this.filtroOperador = '';
    this.fechaDesde = undefined;
    this.fechaHasta = undefined;
  }

  // =======================
  // ===== CALCULADORA =====
  // =======================
  kmInicial: number | null = null;
  kmFinal: number | null = null;
  kmResultado: number | null = null;
  factor: number | null = null;

  abrirCalculadora(pago: Pago) {
    this.pagoSeleccionado = pago;
    this.mostrarModalCalculadora = true;

    // Reiniciar valores
    this.kmInicial = null;
    this.kmFinal = null;
    this.kmResultado = null;
    this.factor = null;
    this.resultado = 0;
    this.resultadoLetra = '';
    this.operacionTexto = '';
  }
  cerrarCalculadora(){
    this.mostrarModalCalculadora=false;
    this.abrirCalculadora(this.pagoSeleccionado!);
  }

  calcularAutomatico() {
    if (this.kmInicial === null || this.kmFinal === null) {
      this.resultado = 0;
      this.resultadoLetra = '';
      this.operacionTexto = '';
      return;
    }
  
    // Calcular km recorrido
    this.kmResultado = this.kmFinal - this.kmInicial;
  
    // Determinar factor según rango
    if (this.kmResultado >= 400 && this.kmResultado <= 800) {
      this.factor = 1.50;
    } else if (this.kmResultado >= 801 && this.kmResultado <= 1200) {
      this.factor = 1.31;
    } else if (this.kmResultado >= 1201 && this.kmResultado <= 1600) {
      this.factor = 1.13;
    } else {
      this.factor = 1.00; // Por si sale de los rangos
    }
  
    // Calcular resultado y actualizar en tiempo real
    const resultado = (this.kmResultado / 400 + this.factor) * 2514;
    this.resultado = this.truncarDosDecimales(resultado);
    this.resultadoLetra = this.numeroALetras(this.resultado);
  
    // Mostrar texto exacto de la operación
    this.operacionTexto = `(${this.kmResultado} / 400 + ${this.factor}) * 2514 = ${this.resultado}`;
  }

 
  

  calcularResultado() {
    try {
      const expresion: string[] = [];

      this.operaciones.forEach((op, i) => {
        if (op.valor !== null && !isNaN(op.valor)) {
          expresion.push(op.valor.toString());
          if (op.operador && i < this.operaciones.length - 1) {
            expresion.push(op.operador);
          }
        }
      });

      if (expresion.length > 0) {
        const resultado = this.evaluarExpresion(expresion.join(' '));
        this.resultado = this.truncarDosDecimales(resultado);
        this.resultadoLetra = this.numeroALetras(this.resultado);
        this.operacionTexto = expresion.join(' ');
      } else {
        this.resultado = 0;
        this.resultadoLetra = '';
      }
    } catch {
      this.resultado = 0;
      this.resultadoLetra = '';
    }
  }

  truncarDosDecimales(num: number): number {
    return Math.floor(num * 100) / 100;
  }

  /*evaluarExpresion(expresion: string): number {
    // Evaluación con jerarquía de operaciones correcta (sin eval)
    const tokens = expresion.split(' ').filter(t => t.trim() !== '');
    const valores: number[] = [];
    const operadores: string[] = [];
  
    const aplicarOperacion = () => {
      const b = valores.pop()!;
      const a = valores.pop()!;
      const op = operadores.pop()!;
      switch (op) {
        case '+': valores.push(a + b); break;
        case '-': valores.push(a - b); break;
        case '*': valores.push(a * b); break;
        case '/': valores.push(b !== 0 ? a / b : 0); break;
      }
    };
  
    const prioridad = (op: string): number => {
      if (op === '+' || op === '-') return 1;
      if (op === '*' || op === '/') return 2;
      return 0;
    };
  
    for (const token of tokens) {
      if (!isNaN(Number(token))) {
        valores.push(Number(token));
      } else if (['+', '-', '*', '/'].includes(token)) {
        // Mientras el último operador tenga igual o mayor prioridad, aplícalo antes
        while (
          operadores.length &&
          prioridad(operadores[operadores.length - 1]) >= prioridad(token)
        ) {
          aplicarOperacion();
        }
        operadores.push(token);
      }
    }
  
    while (operadores.length > 0) {
      aplicarOperacion();
    }
  
    return valores.length > 0 ? valores[0] : 0;
  }*/
    evaluarExpresion(expresion: string): number {
      const tokens = expresion.split(' ').filter(t => t.trim() !== '');
      const valores: number[] = [];
      const operadores: string[] = [];
    
      const prioridad = (op: string): number => {
        if (op === '+' || op === '-') return 1;
        if (op === '*' || op === '/') return 2;
        return 0;
      };
    
      const aplicarOperacion = () => {
        const b = valores.pop()!;
        const a = valores.pop()!;
        const op = operadores.pop()!;
        switch (op) {
          case '+': valores.push(a + b); break;
          case '-': valores.push(a - b); break;
          case '*': valores.push(a * b); break;
          case '/': valores.push(b !== 0 ? a / b : 0); break;
        }
      };
    
      for (const token of tokens) {
        if (!isNaN(Number(token))) {
          valores.push(Number(token));
        } else if (['+', '-', '*', '/'].includes(token)) {
          while (operadores.length && prioridad(operadores[operadores.length - 1]) >= prioridad(token)) {
            aplicarOperacion();
          }
          operadores.push(token);
        }
      }
    
      while (operadores.length > 0) {
        aplicarOperacion();
      }
    
      return valores.length > 0 ? valores[0] : 0;
    }
    
    


  prioridad(op: string): number {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
  }

  confirmarOperacion() {
    this.mostrarModalCalculadora = false;
    this.mostrarModalConfirmarOperacion = true;
  }

  cancelarConfirmacion() {
    this.mostrarModalConfirmarOperacion = false;
    this.mostrarModalCalculadora = true;
  }

  guardarOperacion() {
    if (this.pagoSeleccionado) {
      this.pagoSeleccionado.cantidad = this.resultado;
      this.pagoSeleccionado.cantidadLetra = this.resultadoLetra;
      (this.pagoSeleccionado as any).operacionTexto = this.operacionTexto;
    }
    this.mostrarModalConfirmarOperacion = false;
  }

  // =======================
  // ===== FECHA DE PAGO ===
  // =======================
  confirmarFecha(pago: Pago) {
    this.pagoSeleccionado = pago;
    this.mostrarModalConfirmarFecha = true;
  }

  guardarFecha() {
    this.mostrarModalConfirmarFecha = false;
  }

  cancelarFecha() {
    if (this.pagoSeleccionado) {
      this.pagoSeleccionado.fechaPago = undefined;
    }
    this.mostrarModalConfirmarFecha = false;
  }

  // =======================
  // ===== UTILIDADES ======
  // =======================
  copiarTexto(texto: string) {
    navigator.clipboard.writeText(texto);
  }

  

  numeroALetras(num: number): string {
    const partes = num.toFixed(2).split('.');
    const entero = parseInt(partes[0]);
    const centavos = partes[1];
    return `${this.convertirNumero(entero)} pesos ${centavos}/100 M.N.`;
  }
  
  convertirNumero(n: number): string {
    const unidades = [
      '', 'uno', 'dos', 'tres', 'cuatro', 'cinco',
      'seis', 'siete', 'ocho', 'nueve', 'diez',
      'once', 'doce', 'trece', 'catorce', 'quince',
      'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'
    ];
    const decenas = [
      '', '', 'veinte', 'treinta', 'cuarenta',
      'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'
    ];
    const centenas = [
      '', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos',
      'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'
    ];
  
    if (n === 0) return 'cero';
    if (n === 100) return 'cien';
    if (n < 20) return unidades[n];
    if (n < 100)
      return `${decenas[Math.floor(n / 10)]}${n % 10 ? ' y ' + unidades[n % 10] : ''}`;
    if (n < 1000)
      return `${centenas[Math.floor(n / 100)]} ${this.convertirNumero(n % 100)}`.trim();
  
    if (n < 1000000) {
      const miles = Math.floor(n / 1000);
      const resto = n % 1000;
      const milesTexto = miles === 1 ? 'mil' : `${this.convertirNumero(miles)} mil`;
      return `${milesTexto} ${this.convertirNumero(resto)}`.trim();
    }
  
    if (n < 1000000000) {
      const millones = Math.floor(n / 1000000);
      const resto = n % 1000000;
      const millonesTexto = millones === 1 ? 'un millón' : `${this.convertirNumero(millones)} millones`;
      return `${millonesTexto} ${this.convertirNumero(resto)}`.trim();
    }
  
    return n.toString();
  }
  

  actualizarEnTiempoReal() {
    this.calcularResultado();
  }
  




}
