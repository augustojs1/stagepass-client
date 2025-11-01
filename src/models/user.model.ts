export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  is_admin: boolean;
  phone_number: string | null;
  updated_at: Date | string;
  created_at: Date | string;
}
