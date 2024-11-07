import { useEffect, useState } from 'react';
import { CreateNewProductController, ProductFormData } from './interfaces';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { ImageListType } from 'react-images-uploading';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { CategoryAction } from '../../store/category/actions';
import { useCategorytore } from '../../store/category/slice';
import { Category } from '../../services/categories/dtos/getCategories';
import { ProductAtributesAction } from '../../store/product-atributes/actions';
import { mapColors } from '../../constants/maps';
import { useProductAtributesStore } from '../../store/product-atributes/slice';

export const useCreateNewProductController =
  (): /* <--Dependency Injections  like services hooks */
    CreateNewProductController => {

    const [images, setImages] = useState<ImageListType>([]);
    const { createNewProduct } = ProductAction()
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
            retail: 0,
            reseller: 0
          },
          colors: [],
          sizes: []
        })
        setImages([]);
        getCategories();
        getSizes()
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

    const handleChangePriceResseller = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData({
        ...formData,
        prices: {
          ...formData.prices,
          reseller: parseFloat(value)
        }
      });
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
      handleChangePriceResseller,
      selectedColors,
      setSelectedColors,
      colors: Object.entries(mapColors).map(([value, label]) => ({ label, value })),
      sizesOptions: sizes.map(size => ({ label: size.value, value: size.value })),
      selectedSizes,
      setSelectedSizes,
      isDisabledButtonSubmit
    };
  };
