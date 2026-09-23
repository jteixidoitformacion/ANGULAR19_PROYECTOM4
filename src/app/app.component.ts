import { Component, computed, signal } from '@angular/core';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

type Exercise = {
  number: string;
  label: string;
  title: string;
  description: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly title = 'Laboratorio Angular 19';

  readonly exercises: Exercise[] = [
    {
      number: '01',
      label: 'Rutas standalone',
      title: 'El mapa de la aplicación',
      description: 'Construye un árbol de rutas ligero con provideRouter y un punto de montaje RouterOutlet.'
    },
    {
      number: '02',
      label: 'Parámetros de ruta',
      title: 'Datos que viajan en la URL',
      description: 'Vincula segmentos dinámicos a las entradas de un componente sin acoplarlo a ActivatedRoute.'
    },
    {
      number: '03',
      label: 'Lazy loading',
      title: 'Carga justo lo necesario',
      description: 'Observa cómo loadComponent divide el código y activa cada vista bajo demanda.'
    },
    {
      number: '04',
      label: 'Functional guards',
      title: 'Acceso bajo control',
      description: 'Protege una ruta con una función, inject() y una redirección segura mediante UrlTree.'
    },
    {
      number: '05',
      label: 'Navegación programática',
      title: 'Navegar con intención',
      description: 'Compone filtros, query params y estado transitorio desde el servicio Router.'
    },
    {
      number: '06',
      label: 'Reto integrador',
      title: 'Catálogo profesional',
      description: 'Pon en práctica rutas, sesión y datos dinámicos en un catálogo de productos.'
    }
  ];

  readonly activeExercise = signal(0);
  readonly category = signal('infraestructura');
  readonly brand = signal('nimbus');
  readonly routePreview = computed(() => `/productos/${this.category()}/${this.brand()}`);
  readonly lazyLoaded = signal(false);
  readonly sessionActive = signal(false);
  readonly queryOrder = signal('desc');
  readonly navigationNotice = signal('');
  readonly selectedProduct = signal<Product | null>(null);
  readonly products = signal<Product[]>([
    { id: 'p01', name: 'Servidor Edge Orion', price: 1200, category: 'Infraestructura' },
    { id: 'p02', name: 'Switch gestionable Flux', price: 340, category: 'Redes' },
    { id: 'p03', name: 'Terminal IoT Field', price: 150, category: 'Dispositivos' }
  ]);

  selectExercise(index: number): void {
    this.activeExercise.set(index);
    this.navigationNotice.set('');
  }

  loadReports(): void {
    this.lazyLoaded.set(true);
  }

  toggleSession(): void {
    this.sessionActive.update((active) => !active);
  }

  runNavigation(): void {
    this.navigationNotice.set(`Navegación resuelta: /productos?orden=${this.queryOrder()}&limite=20`);
  }

  selectProduct(product: Product): void {
    this.selectedProduct.set(product);
  }

  addProduct(name: string, priceValue: string): void {
    const price = Number(priceValue);
    if (!name.trim() || !Number.isFinite(price) || price <= 0) {
      return;
    }

    const product: Product = {
      id: `p${String(this.products().length + 1).padStart(2, '0')}`,
      name: name.trim(),
      price,
      category: 'Nuevo registro'
    };
    this.products.update((items) => [...items, product]);
    this.selectedProduct.set(product);
    this.navigationNotice.set('Producto registrado. El estado transitorio confirma la operación.');
  }
}
