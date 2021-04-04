import { Result, CategoryDTO } from "../../Api/Api";
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions";

export type CategoriesState = {
  categories: CategoryDTO[];
  isLoading: boolean;
  errorCode: string | null;
};

export const getCategoriesAsync = createAsyncAction(
  "@categories/GET_CATEGORIES_REQUEST",
  "@categories/GET_CATEGORIES_SUCCESS",
  "@categories/GET_CATEGORIES_FAILURE",
)<void, CategoryDTO[], Error>();

export type CategoryAction = ActionType<typeof getCategoriesAsync>;

export const categoriesReducer = createReducer<CategoriesState, CategoryAction>(
  {
    categories: [],
    isLoading: false,
    errorCode: null,
  },
)
  .handleAction(getCategoriesAsync.success, (state, action) => {
    let newCategories: {categoryID: any, name: any}[] = [];
    for (let key in action.payload) {
      if (action.payload[key] !== null) {
        let newCategory = {
          categoryID: key,
          name: action.payload[key]
        }
        newCategories.push(newCategory);
      }
    }
    return {
      ...state,
      categories: newCategories,
      errorCode: null,
      isLoading: false,
    };
  })
  .handleAction(getCategoriesAsync.request, state => {
    return { ...state, isLoading: true };
  })
  .handleAction(getCategoriesAsync.failure, (state, action) => {
    return {
      ...state,
      errorCode: action.payload.message,
      isLoading: false,
    };
  });
