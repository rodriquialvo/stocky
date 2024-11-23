import { useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { Category } from '../../services/categories/dtos/getCategories';
import { useCategorytore } from '../../store/category/slice';
import { useProductAtributesStore } from '../../store/product-atributes/slice';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { CreateNewProductController, ProductFormData } from './interfaces';
import { initialStateProductformData } from './constants';
import { getDefaultStatus, getStartStatus } from '../../store/helper/statusStateFactory';
import toast from 'react-hot-toast';

export const useCreateNewProductController =
  (): /* <--Dependency Injections  like services hooks */
    CreateNewProductController => {

    const [images, setImages] = useState<ImageListType>([]);
    const { createNewProduct, clearCalculatePrices } = ProductAction();
    const calculatedPrices = useProductStore(state => state.calculatedPrices);
    const status = useProductStore(state => state.status)
    const setStatus = useProductStore(state => state.setStatus)

    const location = useLocation();
    const isCurrentPage = location.pathname === ROUTES.NEW_PRODUCT;
    const categories = useCategorytore(state => state.categories);

    const [formData, setFormData] = useState<ProductFormData>(initialStateProductformData);

    const [currentCategories, setCurrentCategories] = useState<Category[]>(categories);
    const [selectedPath, setSelectedPath] = useState<Category[]>([]);
    const [categorySelected, setCategorySelected] = useState<string | null>(null);
    const [selectedColors, setSelectedColors] = useState([]);
    const sizes = useProductAtributesStore(state => state.sizes);
    const allColors = useProductAtributesStore(state => state.allColors);
    const [isDisabledButtonSubmit, setIsDisabledButtonSubmit] = useState(true);
    const sizesTypes = useProductAtributesStore(state => state.sizesTypes);

    useEffect(() => {
      return () => {
        clearCalculatePrices();
      }
    }, []);

    useEffect(() => {
      if(status.success) {
        setStatus(getDefaultStatus());
        setFormData(initialStateProductformData)
      }
    }, [status.success])

    useEffect(() => {
      setFormData({
        ...formData,
        categories: [categorySelected],
        colors: selectedColors,
        pictures: images.map(image => image?.file),
      })
    },[categorySelected, selectedColors, images])

    useEffect(() => {
      if (isCurrentPage) {
        setFormData(initialStateProductformData)
        setImages([]);
      }
    }, [isCurrentPage])

    useEffect(() => {
      setIsDisabledButtonSubmit(
        !formData.name.length ||
        !formData.code.length ||
        !formData.description.length ||
        !categorySelected ||
        !selectedColors.length ||
        !formData.sizeType.length ||
        !images.length
      )
      
    }, [formData, categorySelected, selectedColors, images]) 

    const handleCategorySelect = (category: Category) => {
      if (category.children && category.children.length > 0) {
        setSelectedPath((prevPath) => [...prevPath, category]);
        setCurrentCategories(category.children);
      }
      setCategorySelected(category.id)
    };

    const handleBreadcrumbClick = (category: Category, index: number) => {
      const newPath = selectedPath.slice(0, index + 1);
      setSelectedPath(newPath);
      setCurrentCategories(newPath[index].children || []);
      setCategorySelected(category.id)
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData({
        ...formData,
        code: value
      })
    }

    const handleChangeBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData({
        ...formData,
        attributes: {
          ...formData.attributes,
          brand: value
        }
      })
    }

    const handleChangePriceRetail = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData({
        ...formData,
        prices: {
          ...formData.prices,
          retail: parseFloat(value)
        }
      });
    };

    const handleChangeCostPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData({
        ...formData,
        prices: {
          ...formData.prices,
          cost: parseFloat(value)
        }
      });
    };

    const handleChangePercentageReseller = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const data = {
        ...formData,
        percentages: {
          ...formData.percentages,
          reseller: parseFloat(value)
        }
      }
      if (parseFloat(value) > 0 && formData.percentages.retail > 0) {
        const { reseller, retail } = calcaulatePrices(parseFloat(value), 'reseller');
        data.prices.reseller = reseller;
        data.prices.retail = retail;
      }
      setFormData(data);
    };

    const handleChangePercentageRetail = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const data = {
        ...formData,
        percentages: {
          ...formData.percentages,
          retail: parseFloat(value)
        }
      }
      if (parseFloat(value) > 0 && formData.percentages.reseller > 0) {
        const { retail, reseller } = calcaulatePrices(parseFloat(value), 'retail');
        data.prices.retail = retail;
        data.prices.reseller = reseller;
      }
      setFormData(data);
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

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createNewProduct(formData)

    };

    const onPressedStartCategories = () => {
      setSelectedPath([]);
      setCurrentCategories(categories);
      setCategorySelected('')
    }

    const onSelectAllColors = () => {
      if(selectedColors.length === allColors.length) {
        setSelectedColors([]);
        return
      }
      setSelectedColors(allColors.map(color => color.value));
    }

    const calcaulatePrices = (value: number, caller: string) => {
      let reseller = 0;
      let retail = 0;
      if (value > 0) {
        if (caller === 'reseller') {
          reseller = formData.prices.cost + (formData.prices.cost * value / 100);
          retail = formData.prices.cost + (formData.prices.cost * formData.percentages.retail / 100);
        } else {
          reseller = formData.prices.cost + (formData.prices.cost * formData.percentages.reseller / 100);
          retail = formData.prices.cost + (formData.prices.cost * value / 100);
        }
      }
      return { reseller, retail };
    }

    const handleColorChange = (colorValue: string) => {
      setSelectedColors((prev) =>
        prev.includes(colorValue) ? prev.filter((c) => c !== colorValue) : [...prev, colorValue]
      );
    };

    const onSelectSizeType = (sizeType: string) => {
      setFormData({...formData, sizeType});
    }
    // Return state and events
    return {
      handleSubmit,
      formData,
      handleChange,
      handleSelectChange,
      handleColorsChange,
      handleFileChange,
      handleCategoriesChange,
      isLoading: status.isFetching,
      images,
      setImages,
      handleChangeBrand,
      handleChangeCode,
      categories,
      onPressedStartCategories,
      selectedPath,
      categorySelected,
      handleBreadcrumbClick,
      currentCategories,
      handleCategorySelect,
      handleChangePriceRetail,
      handleChangeCostPrice,
      handleChangePercentageReseller,
      handleChangePercentageRetail,
      selectedColors,
      setSelectedColors,
      colors: allColors.map(({ label, value }) => ({ label, value })),
      sizesOptions: sizes.map(size => ({ label: size.value, value: size.value })),
      isDisabledButtonSubmit,
      calculatedPrices,
      onSelectAllColors,
      handleColorChange,
      sizesTypes,
      onSelectSizeType,
    };
  };
