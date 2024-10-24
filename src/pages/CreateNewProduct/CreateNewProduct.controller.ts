import { useEffect, useState } from 'react';
import {CreateNewProductController, ProductFormData} from './interfaces';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { ImageListType } from 'react-images-uploading';
import { ImageAction } from '../../store/image/actions';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { useImageStore } from '../../store/image/slice';

export const useCreateNewProductController =
  (): /* <--Dependency Injections  like services hooks */
  CreateNewProductController => {

    const [images, setImages] = useState<ImageListType>([]);
    const {createNewProduct} = ProductAction()
    const status = useProductStore(state => state.status)
    const location = useLocation();
    const isCurrentPage = location.pathname === ROUTES.NEW_PRODUCT;

    useEffect(() => {
      !!isCurrentPage && setImages([])
    },[isCurrentPage])


    const [formData, setFormData] = useState<ProductFormData>({
        name: "rodri",
        code: "vedetina",
        description: "Vedetina",
        categories: [
          "670604ef220d19482c921bd0"
        ],
        attributes: {
          brand: "Adidas"
        },
        pictures: [],
        prices: {
          retail: 3500,
          reseller: 2700
        }
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

    const [categories, setCategories] = useState([
      { label: 'Shoes', value: 'Shoes' },
      { label: 'Clothes', value: 'Clothes' },
      { label: 'Accessories', value: 'Accessories' },
    ])

    const [newColor, setNewColor] = useState('');
    const [newCategory, setNewCategory] = useState('');
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

    const handleCategoriesChange = (selectedOptions: any) => {
      setFormData((prev) => ({
        ...prev,
        categories: selectedOptions ? selectedOptions.map((option: any) => option.value) : [],
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

    const addCategory = () => {
      if (newCategory && !categories.find((category) => category.value === newCategory)) {
        setCategories([...categories, { label: newCategory, value: newCategory }]);
        setNewColor('');
        onColorClose();
        toast({ title: 'category added successfully', status: 'success', duration: 3000, isClosable: true });
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createNewProduct({...formData, pictures: images.map(image => image.file)})
      
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
      categories,
      handleCategoriesChange,
      isLoading: status.isFetching,
      images,
      setImages
    };
  };
