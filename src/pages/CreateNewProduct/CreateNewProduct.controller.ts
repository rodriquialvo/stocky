import { useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';
import { Category } from '../../services/categories/dtos/getCategories';
import { ProductAttribute } from '../../services/product/dtos/getProductAtributes';
import { Product } from '../../services/product/dtos/getProducts';
import { useCategorytore } from '../../store/category/slice';
import { getDefaultStatus } from '../../store/helper/statusStateFactory';
import { useProductAtributesStore } from '../../store/product-atributes/slice';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { roundUpTo100 } from '../../utils/functions';
import { initialStateProductformData } from './constants';
import { CreateNewProductController, ProductFormData } from './interfaces';
import { useNavigate } from 'react-router-dom';

export const useCreateNewProductController =
  ({ product }: { product?: Product }): /* <--Dependency Injections  like services hooks */
    CreateNewProductController => {
    const navigate = useNavigate();

    const [images, setImages] = useState<ImageListType>(product?.pictures.map((picture) => ({ data_url: picture.url })) || []);
    const { createNewProduct, clearCalculatePrices, updateProduct } = ProductAction();

    const calculatedPrices = useProductStore(state => state.calculatedPrices);
    const status = useProductStore(state => state.status)
    const setStatus = useProductStore(state => state.setStatus);
    const setUpdateProductStatus = useProductStore(state => state.setUpdateProductStatus);
    const updateProductStatus = useProductStore(state => state.updateProductStatus);

    const allColors = useProductAtributesStore(state => state.allColors);
    const sizesTypes = useProductAtributesStore(state => state.sizesTypes);
    const allBrands = useProductAtributesStore(state => state.allBrands);

    const categories = useCategorytore(state => state.categories);

    const getFullCategoryPath = (categories, id, path = []) => {
      for (const category of categories) {
        const currentPath = [...path, category];
        if (category.id === id) {
          return currentPath;
        }
        if (category.children && category.children.length > 0) {
          const result = getFullCategoryPath(category.children, id, currentPath);
          if (result) {
            return result;
          }
        }
      }
      return null;
    }

    // const isCurrentPage = location.pathname === ROUTES.NEW_PRODUCT;

    const [formData, setFormData] = useState<ProductFormData>(initialStateProductformData(product));
    const [selectedColors, setSelectedColors] = useState([]);
    const [currentCategories, setCurrentCategories] = useState<Category[]>(categories);
    const [selectedPath, setSelectedPath] = useState<Category[]>([]);
    const [categorySelected, setCategorySelected] = useState<Category | null>(null);
    const [isDisabledButtonSubmit, setIsDisabledButtonSubmit] = useState(true);
    const [showCategoriesTypesOptions, setShowCategoriesTypesOptions] = useState(false);
    const [typesSizesByIds, setTypesSizesByIds] = useState([] as ProductAttribute[]);
    const productCategory = getFullCategoryPath(categories, product?.categories[0].id);

    useEffect(() => {
      if (updateProductStatus.success) {
        setUpdateProductStatus(getDefaultStatus());
        navigate('/stock/list');
      }
    }, [updateProductStatus])

    useEffect(() => {
      if (product) {
        setSelectedPath(productCategory.slice(0, productCategory.length - 1) || []);
        setCurrentCategories(productCategory[productCategory.length - 2].children);
        setCategorySelected(productCategory[productCategory.length - 1]);
        setSelectedColors(product?.colors || []);
      }
      return () => {
        clearCalculatePrices();
      }
    }, []);

    useEffect(() => {
      if (sizesTypes.length) {
        if (categorySelected?.sizeTypes.length > 1) {
          setShowCategoriesTypesOptions(true);
        } else {
          setShowCategoriesTypesOptions(false);
          setFormData({
            ...formData,
            // sizeType: ""
          })
        }

        let sizesTypesFilters = [];
        sizesTypes.forEach(item => {
          if (categorySelected?.sizeTypes.includes(item._id)) {
            sizesTypesFilters.push(item);
          }
        })
        setTypesSizesByIds(sizesTypesFilters);
      }
    }, [categorySelected?.sizeTypes, sizesTypes])

    useEffect(() => {
      if (status.success) {
        setStatus(getDefaultStatus());
        setFormData(initialStateProductformData());
        if (product) {
          setSelectedPath(productCategory.slice(0, productCategory.length - 1) || []);
          setCurrentCategories(productCategory[productCategory.length - 2].children);
          setCategorySelected(productCategory[productCategory.length - 1]);
          setSelectedColors(product?.colors || []);
        }
      }
    }, [status.success])

    useEffect(() => {
      setFormData({
        ...formData,
        categories: [categorySelected?.id],
        colors: selectedColors,
        pictures: images,
      })
    }, [categorySelected, selectedColors, images])

    // useEffect(() => {
    //   if (isCurrentPage) {
    //     setFormData(initialStateProductformData())
    //     setImages([]);
    //   }
    // }, [isCurrentPage])

    useEffect(() => {
      setIsDisabledButtonSubmit(
        !formData.name.length ||
        !formData.code.length ||
        !formData.description.length ||
        !categorySelected ||
        !selectedColors.length ||
        (showCategoriesTypesOptions && !formData.sizeType.length) ||
        !images.length
      )
    }, [formData, categorySelected, selectedColors, images]);

    useEffect(() => {
      if (!!formData.prices.cost && !!formData.percentages.reseller && !!formData.percentages.retail) {
        let priceResellerWithoutRound = ((parseFloat(formData.prices.cost.toString()) + (parseFloat(formData.prices.cost.toString()) * parseFloat(formData.percentages.reseller.toString()) / 100)));
        setFormData({
          ...formData,
          prices: {
            ...formData.prices,
            reseller: roundUpTo100(priceResellerWithoutRound),
            retail: roundUpTo100(parseFloat(priceResellerWithoutRound.toString()) + (parseFloat(priceResellerWithoutRound.toString()) * parseFloat(formData.percentages.retail.toString()) / 100))
          }
        });
      }
    }, [formData.prices.cost, formData.prices.reseller, formData.percentages.retail, formData.percentages.reseller])
    const handleCategorySelect = (category: Category) => {
      if (category.children && category.children.length > 0) {
        setSelectedPath((prevPath) => [...prevPath, category]);
        setCurrentCategories(category.children);
      }
      setCategorySelected(category)
    };

    const handleBreadcrumbClick = (category: Category, index: number) => {
      const newPath = selectedPath.slice(0, index + 1);
      setSelectedPath(newPath);
      setCurrentCategories(newPath[index].children || []);
      setCategorySelected(category)
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

    const handleChangeBrand = (brand: string) => {
      setFormData({
        ...formData,
        attributes: {
          ...formData.attributes,
          brand
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
      if (!product) {
        createNewProduct(formData)
      } else {
        updateProduct(product.id, formData)
      }
    };

    const onPressedStartCategories = () => {
      setSelectedPath([]);
      setCurrentCategories(categories);
      setCategorySelected(null)
    }

    const onSelectAllColors = () => {
      if (selectedColors.length === allColors.length) {
        setSelectedColors([]);
        return
      }
      setSelectedColors(allColors.map(color => color.value));
    }

    const handleColorChange = (colorValue: string) => {
      setSelectedColors((prev) =>
        prev.includes(colorValue) ? prev.filter((c) => c !== colorValue) : [...prev, colorValue]
      );
    };

    const onSelectSizeType = (sizeType: string) => {
      setFormData({ ...formData, sizeType });
    }

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
      isDisabledButtonSubmit,
      calculatedPrices,
      onSelectAllColors,
      handleColorChange,
      sizesTypes: typesSizesByIds,
      onSelectSizeType,
      allBrands,
      showCategoriesTypesOptions
    };
  };
