import { computed, ref } from "vue";
import usePagination, { getPaginationOptions } from "./usePagination";
import type { Options, Service } from "./useRequest/type";
import type {
  PaginationExtendsOption,
  PaginationOptions,
} from "./usePagination";
import { onReachBottom } from "@dcloudio/uni-app";

export interface LoadMoreOptions<R = any, P extends unknown[] = any>
  extends Options<R, P>, PaginationExtendsOption {}

function useLoadMore<R = any, P extends unknown[] = any>(
  service: Service<R, P>,
  options: PaginationOptions<R, P> = {},
) {
  const { pageKey, pageSizeKey, totalKey, dataKey } = getPaginationOptions(
    options.pagination,
  );

  const isLastPage = ref(false);

  const data = ref<Record<string, any>[]>([]);

  let flag = false;
  const finallyOptions = {
    ...options,
    onBefore: (args) => {
      isLastPage.value = false;
      const page = args[0]?.[pageKey];
      if (page === 1) {
        flag = false;
        data.value = [];
      }
    },
    onSuccess: (res, args) => {
      const page = args[0]?.[pageKey];
      const pageSize = args[0]?.[pageSizeKey];
      const resData = res?.[dataKey];
      page === 1 ? (data.value = resData) : data.value.push(...resData);
      isLastPage.value = pageSize * page >= res?.[totalKey];
      flag = true;
    },
  };

  const {
    loading,
    currentPage,
    params,
    paging: _paging,
  } = usePagination(service, finallyOptions);

  const paging = (
    paginationParams?: Record<string, any>,
    isKeepExtraParams = true,
  ) => {
    const oldParams = (params.value as P[]) || [];
    return _paging(paginationParams, isKeepExtraParams).catch(() => {
      params.value = oldParams as P;
    });
  };

  const changePage = (page: number, otherParams?: Record<string, any>) => {
    paging({ [pageKey]: page, ...otherParams });
  };

  const search = (paginationParams?: Record<string, any>) => {
    paging({ [pageKey]: 1, ...paginationParams }, false);
  };

  const reset = () => {
    search();
  };

  const next = () => {
    if (isLastPage.value || loading.value) {
      return;
    }
    changePage(flag ? currentPage.value + 1 : 1);
  };

  const loadMoreStatus = computed(() => {
    if (loading.value) {
      return "loading";
    }
    if (isLastPage.value) {
      return "nomore";
    }
    return "more";
  });

  onReachBottom(() => {
    next();
  });

  return {
    loading,
    data,
    loadMoreStatus,
    search,
    reset,
  };
}

export default useLoadMore;
