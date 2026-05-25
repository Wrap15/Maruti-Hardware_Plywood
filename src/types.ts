/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface ProductItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  imageUrl: string;
  specifications?: string[];
  isFeatured?: boolean;
}

export interface BrandCategory {
  name: string;
  subcategories: string[];
}

export interface Brand {
  name: string;
  logoText: string;
  description: string;
  imageUrl: string;
  websiteUrl?: string;
  categories?: BrandCategory[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isProject?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  date: string;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  categoryInterested: string;
}
