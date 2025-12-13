export interface Brands {
  name: string;
  logo_url?: string;
}

export interface UpdateBrands {
  brand_id: number;
  name?: string;
  logo_url?: string;
}
