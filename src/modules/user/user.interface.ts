export type IUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
  address?: string;
  profileImage?: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};
