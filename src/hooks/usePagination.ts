import useRequest from "./useRequest";
import { merge, pick } from "lodash";
import type { Options, Service } from "./useRequest/type";
import { computed } from "vue";

interface PaginationType {
  pageKey: string;
  pageSizeKey: string;
  totalKey: string;
  dataKey: string;
}

export interface PaginationExtendsOption {
  pagination?: Partial<PaginationType>;
}

export interface PaginationOptions<R = any, P extends unknown[] = any>
  extends Options<R, P>, PaginationExtendsOption {}

const defaultPaginationOptions: PaginationType = {
  // reuqest keys
  pageKey: "page",
  pageSizeKey: "list_rows",
  // response keys
  totalKey: "total",
  dataKey: "data",
};

export const getPaginationOptions = (pagination?: Partial<PaginationType>) => {
  return Object.assign({}, defaultPaginationOptions, pagination);
};

function usePagination<R = any, P extends unknown[] = any>(
  service: Service<R, P>,
  options: PaginationOptions<R, P> = {},
) {
  const { pagination, ...restOptions } = options;

  const { pageKey, pageSizeKey, totalKey, dataKey } =
    getPaginationOptions(pagination);

  const finallyOptions = merge(
    {
      defaultParams: [
        {
          [pageKey]: 1,
          [pageSizeKey]: 15,
        },
      ],
    },
    restOptions,
  ) as Options<R, P>;

  const defaultParamsKeys = Object.keys(
    finallyOptions.defaultParams![0] as Record<string, any>,
  );

  const {
    data: responseData,
    loading,
    params,
    run,
    refresh,
  } = useRequest<R, P>(service, finallyOptions, {
    params: finallyOptions.defaultParams,
  });

  const paging = (
    paginationParams?: Record<string, any>,
    isKeepExtraParams = true,
  ) => {
    const [oldPaginationParams, ...restParams] = (params.value as P[]) || [];
    let newPaginationParams;
    if (isKeepExtraParams) {
      newPaginationParams = {
        ...oldPaginationParams,
        ...paginationParams,
      };
    } else {
      newPaginationParams = {
        ...pick(oldPaginationParams, defaultParamsKeys),
        ...paginationParams,
      };
    }

    const mergerParams = [newPaginationParams, ...restParams] as P;
    return run(...mergerParams);
  };

  const search = (paginationParams?: Record<string, any>) => {
    paging({ [pageKey]: 1, ...paginationParams }, false);
  };

  const reset = () => {
    search();
  };

  const changePage = (page: number, otherParams?: Record<string, any>) => {
    paging({ [pageKey]: page, ...otherParams });
  };

  const changePageSize = (
    pageSize: number,
    otherParams?: Record<string, any>,
  ) => {
    paging({ [pageSizeKey]: pageSize, [pageKey]: 1, ...otherParams });
  };

  const total = computed(() => responseData.value?.[totalKey] || 0);

  const data = computed(() => responseData.value?.[dataKey] || []);

  const currentPage = computed({
    get: () =>
      (params.value?.[0] as any)?.[pageKey] ??
      (finallyOptions.defaultParams![0] as Record<string, any>)[pageKey],
    set(val: number) {
      changePage(val);
    },
  });

  const pageSize = computed({
    get: () =>
      (params.value?.[0] as any)?.[pageSizeKey] ??
      (finallyOptions.defaultParams![0] as Record<string, any>)[pageSizeKey],
    set(val: number) {
      changePageSize(val);
    },
  });

  return {
    loading,
    data,
    currentPage,
    pageSize,
    total,
    params,
    paging,
    search,
    reset,
    refresh,
    changePage,
    changePageSize,
  };
}

export default usePagination;
