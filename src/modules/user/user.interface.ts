export type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone: number;
};
export type ILoginUser = {
  email: string;
  password: string;
};
export type ILoginUserResponse = {
  accessToken: string;
};
