import { Fragment, Suspense } from 'react';
import { Await, defer, Outlet, useLoaderData } from 'react-router-dom';
import { fetchCategoryData } from './api/category';
import { fetchStocks } from "./api/stock";
import { ICategoryDTO, ISubCategoryDTO } from './common/dto/CategoryDTOs';
import IStockDTO from "./common/dto/StockDTOs";
import Header from './components/Layout/Header';
import MainLayout from './components/Layout/MainLayout';
import Loader from './components/UI/Loader/Loader';
import ErrorBoundery from './pages/ErrorBoundery';
import CategoryProvider from './store/Category/CategoryProvider';
import StockProvider from './store/Stock/StockProvider';

interface AppPageResponseDTO {
    categoryData: {
        categories: ICategoryDTO[],
        subCategories: ISubCategoryDTO[]
    }
    stocks: IStockDTO[]
}

export const loader = async () => {
    return defer({
        categoryData: fetchCategoryData(),
        stocks: fetchStocks()
    })
}

function App() {
    const data = useLoaderData() as AppPageResponseDTO
    return (
        <Fragment>
            <Header />
            <MainLayout>
                <Suspense fallback={<Loader>lade Inventar ...</Loader>}>
                    <Await
                        resolve={data.stocks}
                        errorElement={<ErrorBoundery />}>
                        {(stocks) => (
                            <StockProvider stocks={stocks}>
                                <Suspense fallback={<Loader>lade Kategorien ...</Loader>}>
                                    <Await
                                        resolve={data.categoryData}
                                        errorElement={<ErrorBoundery />}>
                                        {(categoryData) => (
                                            <CategoryProvider
                                                categories={categoryData.categories}
                                                subCategories={categoryData.subCategories}>
                                                <Outlet />
                                            </CategoryProvider>
                                        )}
                                    </Await>
                                </Suspense>
                            </StockProvider>
                        )}
                    </Await>
                </Suspense>
            </MainLayout>
        </Fragment >
    );
}

export default App;
