export interface userData {
  user_id?: number;
  full_name: string;
  email: string;
  password: string;
  phone: string;
  role?: "admin" | "seller" | "buyer" | "dealer";
  status?: "active" | "inactive";
  avatar_url?: string;
  date_of_birth?: Date;
  city?: string;
  state?: string;
  pincode?: string;
  gender?: "Male" | "Female" | "Other";
  is_verified?: boolean;
  last_login?: Date;
  created_at?: Date;
  createdBy?: string;
  updatedBy?: string;
  createdOn?: Date;
  updatedOn?: Date;
}

export interface loginData {
  email: string;
  password: string;
}
