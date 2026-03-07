import { pagination } from "@/config";

export {};

declare global {
  type Nullable<T> = null | T;

  type OptionItem = {
    text: string;
    value: string | number;
  };

  type Pagination<T = any> = {
    page: number;
    total: number;
    data: T[];
  };
}
