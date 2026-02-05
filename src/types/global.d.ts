import { pagination } from "@/config";

export {};

declare global {
  type Nullable<T> = null | T;

  type OptionItem = {
    label: string;
    value: string | number;
  };
}
