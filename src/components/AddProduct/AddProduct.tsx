import { Box, Text } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { AddProductProps } from './interfaces';

interface ProductFormData {
  nombre: string;
  categoria: string;
  subCategoria: string;
  talle: string;
  color: string;
  cantidad: number;
  precioCosto: number;
  precioFinal: number;
  codigoArticulo: string;
}
//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AddProduct: FC<AddProductProps> = props => {

  const [formData, setFormData] = useState<ProductFormData>({
    nombre: '',
    categoria: '',
    subCategoria: '',
    talle: '',
    color: '',
    cantidad: 0,
    precioCosto: 0,
    precioFinal: 0,
    codigoArticulo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos del producto
    console.log(formData);
    alert('Producto añadido correctamente'); // Reemplazar con tu lógica de notificación preferida
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Añadir Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Selecciona una categoría</option>
            <option value="ropa">Ropa</option>
            <option value="calzado">Calzado</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>

        <div>
          <label htmlFor="subCategoria" className="block text-sm font-medium text-gray-700">Sub Categoría</label>
          <input
            type="text"
            id="subCategoria"
            name="subCategoria"
            value={formData.subCategoria}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="talle" className="block text-sm font-medium text-gray-700">Talle</label>
          <input
            type="text"
            id="talle"
            name="talle"
            value={formData.talle}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleNumberChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="precioCosto" className="block text-sm font-medium text-gray-700">Precio de Costo</label>
          <input
            type="number"
            id="precioCosto"
            name="precioCosto"
            value={formData.precioCosto}
            onChange={handleNumberChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="precioFinal" className="block text-sm font-medium text-gray-700">Precio Final</label>
          <input
            type="number"
            id="precioFinal"
            name="precioFinal"
            value={formData.precioFinal}
            onChange={handleNumberChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="codigoArticulo" className="block text-sm font-medium text-gray-700">Código de Artículo</label>
          <input
            type="text"
            id="codigoArticulo"
            name="codigoArticulo"
            value={formData.codigoArticulo}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Añadir Producto
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
