export interface ModalDataProps {
    colors: any[];
    sizes: any[];
    mainCategories: any[];
    subCategories: any[];
    allProducts: any[];
}

export interface ProductProps {
    name: string,
    productDetails: IndividualProductProps[],
    mainCategoryKey: string,
    subCategoryKey: string,
    description: string,
    isKokoAvailable: boolean,
}

interface IndividualProductProps {
    colorKey: string,
    urls: UrlProps[],
    sizes: SizesProps[],
    price: number,
}
interface UrlProps {
    url: string
    isCover: boolean
}
interface SizesProps {
    size: string,
    qty: number
}
export interface ColorProps {
    key: string,
    name: string,
    hex: string,
} 