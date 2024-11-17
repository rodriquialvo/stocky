import { useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';
import { useLocation } from 'react-router-dom';
import { mapColors } from '../../constants/maps';
import { ROUTES } from '../../constants/Routes';
import { Category } from '../../services/categories/dtos/getCategories';
import { CategoryAction } from '../../store/category/actions';
import { useCategorytore } from '../../store/category/slice';
import { ProductAtributesAction } from '../../store/product-atributes/actions';
import { useProductAtributesStore } from '../../store/product-atributes/slice';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { CreateNewProductController, ProductFormData } from './interfaces';

export const useCreateNewProductController =
  (): /* <--Dependency Injections  like services hooks */
    CreateNewProductController => {

    const [images, setImages] = useState<ImageListType>([]);
    const { createNewProduct, getCalculatePrices, clearCalculatePrices } = ProductAction();
    const calculatedPrices = useProductStore(state => state.calculatedPrices);
    const status = useProductStore(state => state.status)
    const location = useLocation();
    const isCurrentPage = location.pathname === ROUTES.NEW_PRODUCT;
    const { getCategories } = CategoryAction();
    const categories = useCategorytore(state => state.categories);

    const [formData, setFormData] = useState<ProductFormData>({
      name: "",
      code: "",
      description: "",
      categories: [
        ""
      ],
      attributes: {
        brand: ""
      },
      pictures: [],
      prices: {
        cost: 0,
        retail: 0,
        reseller: 0
      },
      percentages: {
        retail: 0,
        reseller: 0
      },
      colors: [],
      sizes: []
    });

    const [currentCategories, setCurrentCategories] = useState<Category[]>(categories);
    const [selectedPath, setSelectedPath] = useState<Category[]>([]);
    const [categorySelected, setCategorySelected] = useState<string | null>(null);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const { getSizes } = ProductAtributesAction();
    const sizes = useProductAtributesStore(state => state.sizes);
    const [isDisabledButtonSubmit, setIsDisabledButtonSubmit] = useState(true);

    useEffect(() => {
      return () => {
        clearCalculatePrices();
      }
    }, [])

    useEffect(() => {
      if (isCurrentPage) {
        setFormData({
          ...formData,
          name: "",
          code: "",
          description: "",
          categories: [
            ""
          ],
          attributes: {
            brand: ""
          },
          pictures: [],
          prices: {
            cost: 0,
            retail: 0,
            reseller: 0
          },
          colors: [],
          sizes: []
        })
        setImages([]);
        getCategories();
        // getSizes()
      }
    }, [isCurrentPage])

    useEffect(() => {
      setIsDisabledButtonSubmit(
        !formData.name ||
        !formData.code ||
        !formData.description ||
        !categorySelected ||
        !selectedColors.length ||
        !selectedSizes.length ||
        !images.length

      )
      
    }, [formData, categorySelected, selectedColors, selectedSizes,images]) 

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
      createNewProduct({
        ...formData,
        pictures: images.map(image => image.file),
        categories: [categorySelected],
        colors: selectedColors,
        sizes: selectedSizes
      })

    };

    const onPressedStartCategories = () => {
      setSelectedPath([]);
      setCurrentCategories(categories);
      setCategorySelected('')
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
      colors: Object.entries(mapColors).map(([value, label]) => ({ label, value })),
      sizesOptions: sizes.map(size => ({ label: size.value, value: size.value })),
      selectedSizes,
      setSelectedSizes,
      isDisabledButtonSubmit,
      calculatedPrices
    };
  };
