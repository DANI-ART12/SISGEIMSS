import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Módulo necesario para ngModel

// --- INTERFACES ---
interface GastoItem {
  noFactura: string;
  proveedor: string;
  fecha: string;
  importe: number;
}

interface GastoSinComprobanteItem {
  concepto: string;
  fecha: string;
  importe: number;
  justificacion: string;
}

@Component({
  selector: 'app-gastos',
  imports: [CommonModule, CurrencyPipe, FormsModule], 
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent {

  // 1. Datos Generales (Encabezado)
  datosComision = {
    folio: '',
    servidorPublico: '',
    matricula: '',
    tc: '',
    destino: '',
    fechaInicio: '', 
    fechaFin: '', 
    mes: '', 
    anio: '',
    totalDias: 0,
    transporte: '',
    fechaEmision: '',
  };

  // 2. Desglose de Gastos Comprobados (HOSPEDAJE, ALIMENTACION, TRANSPORTE, OTROS)
  desgloseGastos = {
    hospedaje: {
      subtotal: 0,
      items: [{ noFactura: '', proveedor: '', fecha: '', importe: 0 } as GastoItem],
      filasVacias: 2
    },
    alimentacion: {
      subtotal: 0,
      items: [
        { noFactura: '', proveedor: '', fecha: '', importe: 0 } as GastoItem,
        { noFactura: '', proveedor: '', fecha: '', importe: 0 } as GastoItem,
        { noFactura: '', proveedor: '', fecha: '', importe: 0 } as GastoItem,
        { noFactura: '', proveedor: '', fecha: '', importe: 0 } as GastoItem,
      ],
      filasVacias: 2
    },
    transporte: {
      subtotal: 0,
      items: [{ noFactura: '', proveedor: '', fecha: '', importe: 0 } as GastoItem],
      filasVacias: 2
    },
    otros: {
      subtotal: 0,
      items: [],
      filasVacias: 3
    }
  };
  
  // 3. Gastos de Vehículo (PEAJE, GASOLINA) - NUEVO
  gastosVehiculo = {
    peaje: {
      subtotal: 0,
      items: [{ noFactura: '', proveedor: 'Peaje', fecha: '', importe: 0 } as GastoItem],
    },
    gasolina: {
      subtotal: 0,
      items: [{ noFactura: '', proveedor: 'Gasolinera', fecha: '', importe: 0 } as GastoItem],
    },
  };

  // 4. Gastos Sin Comprobante
  gastosSinComprobante = {
    total: 0,
    items: [
      { concepto: '', fecha: '', importe: 0, justificacion: '' } as GastoSinComprobanteItem,
      { concepto: '', fecha: '', importe: 0, justificacion: '' } as GastoSinComprobanteItem,
      { concepto: '', fecha: '', importe: 0, justificacion: '' } as GastoSinComprobanteItem,
    ],
    filasVacias: 2
  };

 // 5. Variables para el Control del Modal
   isModalOpen: boolean = false;
   // Usamos un tipo unión para que currentGasto pueda ser cualquiera de las dos interfaces
   currentGasto: GastoItem | GastoSinComprobanteItem = { noFactura: '', proveedor: '', fecha: '', importe: 0 } as GastoItem; 
   currentType: 'comprobado' | 'sinComprobante' | 'vehiculo' = 'comprobado';
   currentCategory: string = 'hospedaje'; 
   isEditing: boolean = false;
   itemIndex: number = -1; 
 
 // --- MÉTODOS DEL MODAL Y GESTIÓN DE GASTOS ---
 
   /**
    * Abre el modal para agregar un NUEVO gasto comprobado (Hospedaje, Peaje, Gasolina, etc.).
    */
   openModalToAdd(category: string, type: 'comprobado' | 'vehiculo'): void {
     this.currentType = type;
     this.currentCategory = category;
     
     // Inicializar el gasto con valores base
     let defaultGasto: GastoItem = { noFactura: '', proveedor: '', fecha: '', importe: 0 };
     
     // Ajustar valores específicos según la categoría/tipo
     if (type === 'comprobado') {
         // No se necesita ajustar, los valores base son correctos
     } else if (category === 'peaje') {
         defaultGasto.noFactura = 'N/A';
         defaultGasto.proveedor = 'Peaje';
     } else if (category === 'gasolina') {
         defaultGasto.proveedor = 'Gasolinera'; // NoFactura se deja en '' para poder ingresarlo
     }
 
     // Asigna el objeto completo al tipo unión. Esto es más seguro que usar 'Partial<GastoItem>'.
     this.currentGasto = defaultGasto; 
     
     this.isEditing = false;
     this.itemIndex = -1;
     this.isModalOpen = true;
   }
 
   /**
    * Abre el modal para Gastos SIN Comprobante.
    */
   openModalToAddSinComprobante(): void {
     this.currentType = 'sinComprobante';
     // Inicializamos el objeto completo GastoSinComprobanteItem y lo asignamos
     this.currentGasto = { concepto: '', fecha: '', importe: 0, justificacion: '' } as GastoSinComprobanteItem; 
     this.isEditing = false;
     this.itemIndex = -1;
     this.isModalOpen = true;
   }
 
   // Cierra el modal
   closeModal(): void {
     this.isModalOpen = false;
   }

  // Guarda el gasto (agregando uno nuevo o actualizando uno existente)
  // ... (dentro de la clase GastosComponent)

// Guarda el gasto (agregando uno nuevo o actualizando uno existente)
// ... (dentro de la clase GastosComponent)

saveGasto(): void {
    
  // 1. Manejo de Gastos SIN Comprobante
  if (this.currentType === 'sinComprobante') {
      const gastoSC = this.currentGasto as GastoSinComprobanteItem;
      gastoSC.importe = Number(gastoSC.importe); 
      
      // Agregar y recalcular GSC
      this.gastosSinComprobante.items.push({ ...gastoSC }); 
      this.recalculateTotalSinComprobante();

  } else { 
      // Lógica para Gastos Comprobados y Vehículo
      const gastoC = this.currentGasto as GastoItem;
      gastoC.importe = Number(gastoC.importe);
      
      // Declaramos 'items' aquí para que su scope sea todo el 'else' y sea de tipo GastoItem[]
      let items: GastoItem[] = [];

      // 2. Manejo de Gastos Comprobados Principales
      if (this.currentType === 'comprobado') {
          
          const categoryKey: keyof typeof this.desgloseGastos = this.currentCategory as keyof typeof this.desgloseGastos;
          items = this.desgloseGastos[categoryKey].items; // Asigna el array correcto
          
          // 3. Manejo de Gastos de Vehículo
      } else if (this.currentType === 'vehiculo') {
          
          const categoryKey: keyof typeof this.gastosVehiculo = this.currentCategory as keyof typeof this.gastosVehiculo;
          items = this.gastosVehiculo[categoryKey].items; // Asigna el array correcto
      }

      // 4. Agregar el gasto y Recalcular (fuera del if/else anidado)
      
      // Usamos una verificación para evitar 'push' si 'items' está vacío por error de lógica
      if (items.length > 0 || (this.currentType === 'comprobado' || this.currentType === 'vehiculo')) {
           items.push({ ...gastoC });
      }
     
      // Recalcular los totales después de la adición
      if (this.currentType === 'comprobado') {
           this.recalculateSubtotal(this.currentCategory as keyof typeof this.desgloseGastos);
      } else if (this.currentType === 'vehiculo') {
           this.recalculateVehiculoSubtotal(this.currentCategory as keyof typeof this.gastosVehiculo);
      }
  }
  
  this.closeModal();
}

  // Recalcula el subtotal de las categorías principales (Hospedaje, Alimentación, etc.)
  recalculateSubtotal(category: keyof typeof this.desgloseGastos): void {
    this.desgloseGastos[category].subtotal = this.desgloseGastos[category].items.reduce(
      (acc, item) => acc + item.importe, 0
    );
  }
  
  // Recalcula el subtotal de las categorías de vehículo
  recalculateVehiculoSubtotal(category: keyof typeof this.gastosVehiculo): void {
    this.gastosVehiculo[category].subtotal = this.gastosVehiculo[category].items.reduce(
      (acc, item) => acc + item.importe, 0
    );
  }

  // Recalcula el total de Gastos Sin Comprobante
  recalculateTotalSinComprobante(): void {
    this.gastosSinComprobante.total = this.gastosSinComprobante.items.reduce(
      (acc, item) => acc + item.importe, 0
    );
  }
  
  // --- GETTERS ---
  get totalGastoComprobado(): number {
    const principal = this.desgloseGastos.hospedaje.subtotal + 
                      this.desgloseGastos.alimentacion.subtotal + 
                      this.desgloseGastos.transporte.subtotal + 
                      this.desgloseGastos.otros.subtotal;
    
    const vehiculo = this.gastosVehiculo.peaje.subtotal + this.gastosVehiculo.gasolina.subtotal;
    
    return principal + vehiculo; // Ahora incluye peaje y gasolina
  }

  get totalGeneral(): number {
    return this.totalGastoComprobado + this.gastosSinComprobante.total;
  }

  get currentGastoComprobado(): GastoItem {
    return this.currentGasto as GastoItem;
  }

  get currentGastoSinComprobante(): GastoSinComprobanteItem {
    return this.currentGasto as GastoSinComprobanteItem;
  }

  // Helper para generar arrays de números
  generarArray(n: number): number[] {
    return Array(n).fill(0).map((x, i) => i);
  }
}