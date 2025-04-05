import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useProductAtributesStore } from './slice';
import { useAPIProductAtributesService } from '../../services/product-atributes/product-atributes.service';

export const ProductAtributesAction = () => {
  const setStatus = useProductAtributesStore(state => state.setStatus);
  const setSizes = useProductAtributesStore(state => state.setSizes);
  const setSizesTypes = useProductAtributesStore(state => state.setSizesTypes);
  const productAtributesService = useAPIProductAtributesService();
  const allSizesAndTypes = useProductAtributesStore(state => state.allSizesAndTypes);
  const setAllSizesAndTypes = useProductAtributesStore(state => state.setAllSizesAndTypes);
  const setAllColors = useProductAtributesStore(state => state.setAllcolors);
  const setAlBrands = useProductAtributesStore(state => state.setAlBrands);
  const getSizes = async (subtype?: string) => {
    setStatus(getStartStatus());
    try {
      if (!!allSizesAndTypes.length) {
        if (!!subtype) {
          setSizes(allSizesAndTypes.filter(item => item.type === "size" && item.subtype === subtype))
        }
      } else {
        const data = await productAtributesService.getProductAtributes({ type: "size", subtype });
        if (!data.productAttributes) {
          setStatus(getErrorStatus('No response'));
          return;
        }
        if(!!subtype) {
          setSizes(data.productAttributes);
        } else {
          setAllSizesAndTypes(data.productAttributes)
        }
      }
      setStatus(getSuccessStatus());
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const getSizesTypes = async () => {
    setStatus(getStartStatus());
    try {
      const data = await productAtributesService.getProductAtributesSubTypes({ type: "size" });
      if (!data.productAttributeSubtypes) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setSizesTypes(data.productAttributeSubtypes);
      setStatus(getSuccessStatus());
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };


  const getAllColors = async () => {
    console.log("getAllColors")
    setStatus(getStartStatus());
    try {
      const data = await productAtributesService.getProductAtributes({ type: "color" });
      if (!data.productAttributes) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setAllColors(data.productAttributes);
      setStatus(getSuccessStatus());
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const getAllBrands = async () => {
    setStatus(getStartStatus());
    try {
      const data = await productAtributesService.getProductAtributes({ type: "brand" });
      if (!data.productAttributes) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setAlBrands(data.productAttributes);
      setStatus(getSuccessStatus());
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  return {
    getSizes,
    getSizesTypes,
    getAllColors,
    getAllBrands,
  };
};
