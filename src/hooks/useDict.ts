import { getDictOptionsApi } from "@/api/dict";
import { ref } from "vue";

type Result<T extends string> = Partial<Record<T, OptionItem[]>>;

function useDict<T extends string>(key: T | T[]) {
  const keys = Array.isArray(key) ? key.join(",") : key;

  const dictLoading = ref(true);
  const dict = ref<Result<T>>();

  getDictOptionsApi({
    keys,
  })
    .then((res) => {
      dict.value = res || {};
    })
    .finally(() => {
      dictLoading.value = false;
    });

  return {
    dict,
    dictLoading,
  };
}

export default useDict;
