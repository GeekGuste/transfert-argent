export interface User {
  id?: number;
  key?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: number;
  birthdate?: Date;
  profile_picture?: string;
  privileges?: [];
  roles?: [];
}
