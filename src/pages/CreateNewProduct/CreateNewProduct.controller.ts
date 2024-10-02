import { useState } from 'react';
import {CreateNewProductController, ProductFormData} from './interfaces';
import { useDisclosure, useToast } from '@chakra-ui/react';

export const useCreateNewProductController =
  (): /* <--Dependency Injections  like services hooks */
  CreateNewProductController => {
    const [formData, setFormData] = useState<ProductFormData>({
      article: '',
      name: '',
      brand: '',
      description: '',
      size: '',
      colors: [],
      quantity: 0,
      costPrice: 0,
      finalPrice: 0,
      photos: null, // Initially empty
    });

    const [brands, setBrands] = useState([
      { label: 'Nike', value: 'Nike' },
      { label: 'Adidas', value: 'Adidas' },
      { label: 'Puma', value: 'Puma' },
    ]);
    const [newBrand, setNewBrand] = useState('');
  
    const [sizes, setSizes] = useState([
      { label: 'S', value: 'S' },
      { label: 'M', value: 'M' },
      { label: 'L', value: 'L' },
      { label: 'XL', value: 'XL' },
    ]);
    const [newSize, setNewSize] = useState('');
  
    const [colors, setColors] = useState([
      { label: 'Red', value: 'Red' },
      { label: 'Blue', value: 'Blue' },
      { label: 'Black', value: 'Black' },
    ]);
    const [newColor, setNewColor] = useState('');
  
    const toast = useToast();
  
    const { isOpen: isBrandOpen, onOpen: onBrandOpen, onClose: onBrandClose } = useDisclosure();
    const { isOpen: isSizeOpen, onOpen: onSizeOpen, onClose: onSizeClose } = useDisclosure();
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
      setFormData((prev) => ({ ...prev, photos: e.target.files }));
    };
  
    const handleSelectChange = (selectedOption: any, fieldName: string) => {
      setFormData((prev) => ({ ...prev, [fieldName]: selectedOption.value }));
    };
  
    const handleColorsChange = (selectedOptions: any) => {
      setFormData((prev) => ({
        ...prev,
        colors: selectedOptions ? selectedOptions.map((option: any) => option.value) : [],
      }));
    };
  
    const addBrand = () => {
      if (newBrand && !brands.find((brand) => brand.value === newBrand)) {
        setBrands([...brands, { label: newBrand, value: newBrand }]);
        setNewBrand('');
        onBrandClose();
        toast({ title: 'Brand added successfully', status: 'success', duration: 3000, isClosable: true });
      }
    };
  
    const addSize = () => {
      if (newSize && !sizes.find((size) => size.value === newSize)) {
        setSizes([...sizes, { label: newSize, value: newSize }]);
        setNewSize('');
        onSizeClose();
        toast({ title: 'Size added successfully', status: 'success', duration: 3000, isClosable: true });
      }
    };
  
    const addColor = () => {
      if (newColor && !colors.find((color) => color.value === newColor)) {
        setColors([...colors, { label: newColor, value: newColor }]);
        setNewColor('');
        onColorClose();
        toast({ title: 'Color added successfully', status: 'success', duration: 3000, isClosable: true });
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(formData);
      toast({
        title: 'Product added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    };

    // Return state and events
    return {
      handleSubmit,
      formData,
      handleChange,
      brands,
      handleSelectChange,
      onBrandOpen,
      sizes,
      onSizeOpen,
      colors,
      handleColorsChange,
      onColorOpen,
      handleNumberChange,
      handleFileChange,
      addBrand,
      isBrandOpen,
      isSizeOpen,
      isColorOpen,
      onColorClose,
      onBrandClose,
      onSizeClose,
      newBrand,
      setNewBrand,
      newSize,
      setNewSize,
      newColor,
      setNewColor,
      addColor,
      addSize,
    };
  };
