import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import React, { FC, useState } from 'react';
import { AddProductProps } from './interfaces';

interface ProductFormData {
  articulo: string;
  nombre: string;
  marca: string;
  descripcion: string;
  talle: string;
  colores: string[];
  cantidad: number;
  precioCosto: number;
  precioFinal: number;
  fotos: FileList | null; // Agregado para las fotos
}

const AddProduct: FC<AddProductProps> = (props) => {
  const [formData, setFormData] = useState<ProductFormData>({
    articulo: '',
    nombre: '',
    marca: '',
    descripcion: '',
    talle: '',
    colores: [],
    cantidad: 0,
    precioCosto: 0,
    precioFinal: 0,
    fotos: null, // Inicialmente vacío
  });

  const [articulos, setArticulos] = useState([
    { label: 'Artículo 1', value: 'Articulo1' },
    { label: 'Artículo 2', value: 'Articulo2' },
    { label: 'Artículo 3', value: 'Articulo3' },
  ]);

  const [marcas, setMarcas] = useState([
    { label: 'Nike', value: 'Nike' },
    { label: 'Adidas', value: 'Adidas' },
    { label: 'Puma', value: 'Puma' },
  ]);
  const [nuevaMarca, setNuevaMarca] = useState('');

  const [talles, setTalles] = useState([
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
  ]);
  const [nuevoTalle, setNuevoTalle] = useState('');

  const [colores, setColores] = useState([
    { label: 'Rojo', value: 'Rojo' },
    { label: 'Azul', value: 'Azul' },
    { label: 'Negro', value: 'Negro' },
  ]);
  const [nuevoColor, setNuevoColor] = useState('');

  const toast = useToast();

  const { isOpen: isMarcaOpen, onOpen: onMarcaOpen, onClose: onMarcaClose } = useDisclosure();
  const { isOpen: isTalleOpen, onOpen: onTalleOpen, onClose: onTalleClose } = useDisclosure();
  const { isOpen: isColorOpen, onOpen: onColorOpen, onClose: onColorClose } = useDisclosure();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, fotos: e.target.files }));
  };

  const handleSelectChange = (selectedOption: any, fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: selectedOption.value }));
  };

  const handleColoresChange = (selectedOptions: any) => {
    setFormData((prev) => ({
      ...prev,
      colores: selectedOptions ? selectedOptions.map((option: any) => option.value) : [],
    }));
  };

  const agregarMarca = () => {
    if (nuevaMarca && !marcas.find((marca) => marca.value === nuevaMarca)) {
      setMarcas([...marcas, { label: nuevaMarca, value: nuevaMarca }]);
      setNuevaMarca('');
      onMarcaClose();
      toast({ title: 'Marca añadida correctamente', status: 'success', duration: 3000, isClosable: true });
    }
  };

  const agregarTalle = () => {
    if (nuevoTalle && !talles.find((talle) => talle.value === nuevoTalle)) {
      setTalles([...talles, { label: nuevoTalle, value: nuevoTalle }]);
      setNuevoTalle('');
      onTalleClose();
      toast({ title: 'Talle añadido correctamente', status: 'success', duration: 3000, isClosable: true });
    }
  };

  const agregarColor = () => {
    if (nuevoColor && !colores.find((color) => color.value === nuevoColor)) {
      setColores([...colores, { label: nuevoColor, value: nuevoColor }]);
      setNuevoColor('');
      onColorClose();
      toast({ title: 'Color añadido correctamente', status: 'success', duration: 3000, isClosable: true });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    toast({
      title: 'Producto añadido correctamente',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      as="form"
      onSubmit={handleSubmit}
    >
      <Box fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        Añadir Nuevo Producto
      </Box>

      {/* Campo de Artículo */}
      <FormControl mb={4}>
        <FormLabel htmlFor="articulo">Artículo</FormLabel>
        <Select
          options={articulos}
          onChange={(option) => handleSelectChange(option, 'articulo')}
          placeholder="Selecciona un artículo"
          isSearchable
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="nombre">Nombre</FormLabel>
        <Input
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="marca">Marca</FormLabel>
        <Select
          options={marcas}
          onChange={(option) => handleSelectChange(option, 'marca')}
          placeholder="Selecciona una marca"
          isSearchable
        />
        <Button mt={2} size="sm" onClick={onMarcaOpen}>
          Agregar Nueva Marca
        </Button>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="descripcion">Descripción</FormLabel>
        <Textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="talle">Talle</FormLabel>
        <Select
          options={talles}
          onChange={(option) => handleSelectChange(option, 'talle')}
          placeholder="Selecciona un talle"
          isSearchable
        />
        <Button mt={2} size="sm" onClick={onTalleOpen}>
          Agregar Nuevo Talle
        </Button>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="colores">Colores</FormLabel>
        <Select
          isMulti
          options={colores}
          onChange={handleColoresChange}
          placeholder="Selecciona colores"
          isSearchable
        />
        <Button mt={2} size="sm" onClick={onColorOpen}>
          Agregar Nuevo Color
        </Button>
      </FormControl>

      {/* Campo de Cantidad */}
      <FormControl mb={4}>
        <FormLabel htmlFor="cantidad">Cantidad</FormLabel>
        <Input
          type="number"
          id="cantidad"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleNumberChange}
          required
          min={0}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="precioCosto">Precio de Costo</FormLabel>
        <Input
          type="number"
          id="precioCosto"
          name="precioCosto"
          value={formData.precioCosto}
          onChange={handleNumberChange}
          required
          min={0}
          step="0.01"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="precioFinal">Precio Final</FormLabel>
        <Input
          type="number"
          id="precioFinal"
          name="precioFinal"
          value={formData.precioFinal}
          onChange={handleNumberChange}
          required
          min={0}
          step="0.01"
        />
      </FormControl>

      {/* Campo para subir fotos */}
      <FormControl mb={4}>
        <FormLabel htmlFor="fotos">Subir Fotos</FormLabel>
        <Input
          type="file"
          id="fotos"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </FormControl>

      <Button type="submit" colorScheme="blue" width="full" mt={4}>
        Añadir Producto
      </Button>

      {/* Modals */}
      {/* Modal para agregar nueva marca */}
      <Modal isOpen={isMarcaOpen} onClose={onMarcaClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nueva Marca</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Nueva Marca"
              value={nuevaMarca}
              onChange={(e) => setNuevaMarca(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={agregarMarca}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal para agregar nuevo talle */}
      <Modal isOpen={isTalleOpen} onClose={onTalleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nuevo Talle</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Nuevo Talle"
              value={nuevoTalle}
              onChange={(e) => setNuevoTalle(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={agregarTalle}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal para agregar nuevo color */}
      <Modal isOpen={isColorOpen} onClose={onColorClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nuevo Color</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Nuevo Color"
              value={nuevoColor}
              onChange={(e) => setNuevoColor(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={agregarColor}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddProduct;
