import Http from '../http';
import { SalesAnalytics, SalesService, Sale } from './sales.service';

export class ApiSalesService implements SalesService {
  private http: Http;
  
  constructor() {
    this.http = new Http('', 'sales');
  }

  async getSalesAnalytics(month: string): Promise<SalesAnalytics> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Extraer mes y año del string (formato: "YYYY-MM")
    const [year, monthStr] = month.split('-');
    const monthNumber = parseInt(monthStr, 10);
    const yearNumber = parseInt(year, 10);

    // Factores estacionales para cada mes
    const seasonalFactors: { [key: number]: number } = {
      1: 0.8,  // Enero
      2: 0.9,  // Febrero
      3: 1.0,  // Marzo
      4: 1.1,  // Abril
      5: 1.2,  // Mayo
      6: 1.3,  // Junio
      7: 1.4,  // Julio
      8: 1.3,  // Agosto
      9: 1.2,  // Septiembre
      10: 1.1, // Octubre
      11: 1.0, // Noviembre
      12: 1.2  // Diciembre
    };

    // Factor de crecimiento anual (2024)
    const yearFactor = yearNumber === 2024 ? 1.2 : 1.0;

    // Calcular ventas totales con factores estacionales
    const baseSales = 150000;
    const totalSales = baseSales * seasonalFactors[monthNumber] * yearFactor;

    // Generar datos de productos
    const products = [
      { name: 'Zapatillas Nike', sales: totalSales * 0.3 },
      { name: 'Camisetas Adidas', sales: totalSales * 0.25 },
      { name: 'Pantalones Puma', sales: totalSales * 0.2 },
      { name: 'Accesorios', sales: totalSales * 0.15 },
      { name: 'Otros', sales: totalSales * 0.1 }
    ];

    // Generar datos de categorías
    const categories = [
      { name: 'Calzado', sales: totalSales * 0.4 },
      { name: 'Ropa', sales: totalSales * 0.35 },
      { name: 'Accesorios', sales: totalSales * 0.15 },
      { name: 'Equipamiento', sales: totalSales * 0.1 }
    ];

    // Generar datos de ventas diarias
    const daysInMonth = new Date(yearNumber, monthNumber, 0).getDate();
    const dailySales = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dayFactor = 1 + Math.sin(day / 7) * 0.2; // Variación semanal
      return {
        date: `${year}-${monthStr.padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        sales: (totalSales / daysInMonth) * dayFactor
      };
    });

    // Generar datos de vendedores
    const sellers = [
      { name: 'Juan Pérez', sales: totalSales * 0.3, growth: 15 },
      { name: 'María García', sales: totalSales * 0.25, growth: 8 },
      { name: 'Carlos López', sales: totalSales * 0.2, growth: -5 },
      { name: 'Ana Martínez', sales: totalSales * 0.15, growth: 12 },
      { name: 'Pedro Sánchez', sales: totalSales * 0.1, growth: 3 }
    ];

    // Calcular métricas derivadas
    const averageOrderValue = totalSales / 1500;
    const totalOrders = 1500;
    const conversionRate = 0.65;

    // Calcular crecimiento basado en el mes anterior
    const previousMonth = monthNumber === 1 ? 12 : monthNumber - 1;
    const previousYear = monthNumber === 1 ? yearNumber - 1 : yearNumber;
    const previousMonthFactor = seasonalFactors[previousMonth];
    const previousSales = baseSales * previousMonthFactor * (previousYear === 2024 ? 1.2 : 1.0);
    
    const salesGrowth = ((totalSales - previousSales) / previousSales) * 100;
    const averageOrderValueGrowth = salesGrowth * 0.8; // Ligeramente menor que el crecimiento de ventas
    const totalOrdersGrowth = salesGrowth * 0.9; // Similar al crecimiento de ventas
    const conversionRateGrowth = salesGrowth * 0.5; // Menor que el crecimiento de ventas

    // Generar lista de ventas individuales
    const sales: Sale[] = Array.from({ length: 50 }, (_, i) => {
      const day = Math.floor(Math.random() * daysInMonth) + 1;
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const total = (product.sales / totalSales) * totalSales * (quantity / 3);
      const statuses: Sale['status'][] = ['completed', 'pending', 'cancelled'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: `SALE-${i + 1}`,
        date: `${year}-${monthStr.padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        customer: `Cliente ${i + 1}`,
        product: product.name,
        quantity,
        total,
        status
      };
    });

    return {
      totalSales,
      salesGrowth,
      averageOrderValue,
      averageOrderValueGrowth,
      totalOrders,
      totalOrdersGrowth,
      conversionRate,
      conversionRateGrowth,
      topProducts: products,
      categorySales: categories,
      dailySales,
      topSellers: sellers,
      sales
    };
  }
} 