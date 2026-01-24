export type ProductOptionType = "select" | "radio" | "checkbox";

export interface OptionValue {
  id: number;
  label: string;
  value: number;
  discount?: number;
  productOptionId: number;
}

export interface ProductOption {
  id: number;
  name: string;
  type: ProductOptionType | string; // ✅ compatible with backend
  productId: number;
  optionValues: OptionValue[];
}

export interface ProductImage {
  id: number;
  thumbnails: string[];
  previews: string[];
  productId: number;
}

export interface TagImage {
  id?: number;
  url?: string;
  altText?: string;
  productId?: number;
}

export interface AdditionalDescription {
  id: number;
  name: string;
  value: string;
  productId: number;
}

export interface Category {
  name: string;
  slug: string;
}

export interface FAQ {
  question: string;
  answer: string;
  id: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  reviews: number;
  price: number;
  discountedPrice?: string;
  categoryId: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  imgs: ProductImage | null;
  tagImage: TagImage[];
  additionalDescriptions: AdditionalDescription[];
  productOptions: ProductOption[];
  category?: Category;
  faq?: FAQ[];
}
