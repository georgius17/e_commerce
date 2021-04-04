import * as React from "react";
import { AuthenticatedLayout } from "Components/Layout/AuthenticatedLayout";
import { useResource, Resources } from "Translations/Resources";
import { getProductsAsync } from "State/Products/ProductsReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "State/Store";
import { ProductsTable } from "Components/Products/ProductsTable";
import { getCategoriesAsync } from "State/Categories/CategoriesReducer";

const ProductsManagePage: React.FunctionComponent = _ => {
  const { t } = useResource();
  const dispatch = useDispatch();

  const { isLoading, products } = useSelector((e: RootStateType) => e.products);
  const { categories } = useSelector((e: RootStateType) => e.categories);

  React.useEffect(() => {
    dispatch(getProductsAsync.request());
    if (categories.length == 0) {
      dispatch(getCategoriesAsync.request());
    }
  }, [dispatch]);

  return (
    <AuthenticatedLayout title={t(Resources.Products.Title)}>
      {!isLoading && <ProductsTable products={products} categories={categories} />}
    </AuthenticatedLayout>
  );
};

export { ProductsManagePage };
