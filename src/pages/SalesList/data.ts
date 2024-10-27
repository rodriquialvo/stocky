export const sales = [
    {
      id: 1,
      code: 'V001',
      user: 'usuario1',
      creationDate: '2024-10-02',
      total: 500,
      status: 'Pendiente',
      weekCode: '2024-40',
      products: [
        { id: 'P001', name: 'Producto A', price: 200 },
        { id: 'P002', name: 'Producto B', price: 300 },
      ],
    },
    {
      id: 2,
      code: 'V002',
      user: 'usuario2',
      creationDate: '2024-10-03',
      total: 800,
      status: 'Aprobada',
      weekCode: '2024-40',
      products: [
        { id: 'P003', name: 'Producto C', price: 500 },
        { id: 'P004', name: 'Producto D', price: 300 },
      ],
    },
    {
      id: 3,
      code: 'V003',
      user: 'usuario3',
      creationDate: '2024-10-09',
      total: 1000,
      status: 'Rechazada',
      weekCode: '2024-41',
      products: [
        { id: 'P005', name: 'Producto E', price: 400 },
        { id: 'P006', name: 'Producto F', price: 600 },
      ],
    },
    {
      id: 4,
      code: 'V004',
      user: 'usuario4',
      creationDate: '2024-10-10',
      total: 450,
      status: 'Pendiente',
      weekCode: '2024-41',
      products: [
        { id: 'P007', name: 'Producto G', price: 150 },
        { id: 'P008', name: 'Producto H', price: 300 },
      ],
    },
    // generate 6 more sales
    ...Array.from({ length: 6 }).map((_, index) => ({
      id: index + 5,
      code: `V00${index + 5}`,
      user: `usuario${index + 5}`,
      creationDate: '2024-10-01',
      total: 1000,
      status: 'Pendiente',
      weekCode: '2024-40',
      products: [
        { id: `P00${index + 5}`, name: `Producto ${index + 5}`, price: 1000 },
      ],
    })),
  ];
  