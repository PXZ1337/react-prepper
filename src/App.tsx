import { Suspense } from 'react';
import { Await, defer, Outlet, useLoaderData } from 'react-router-dom';
import { fetchCategoryData } from './api/category';
import { fetchStocks } from './api/stock';
import { ICategoryData } from './common/dto/CategoryDTOs';
import IStockDTO from './common/dto/StockDTOs';
import AppContextContainer from './components/AppContextRefresh/AppContextRefreshContainer';
import ErrorBoundaryContainer from './components/ErrorBoundary/ErrorBoundaryContainer';
import Header from './components/Layout/Header';
import MainLayout from './components/Layout/MainLayout';
import Navigation from './components/Navigation/Navigation';
import Loader from './components/UI/Loader/Loader';
import CategoryProvider from './store/Category/CategoryProvider';
import MenuProvider from './store/Menu/MenuProvider';
import StockProvider from './store/Stock/StockProvider';

interface AppPageResponseDTO {
    categoryData: ICategoryData;
    stocks: IStockDTO[];
}

export const loader = async () => {
    return defer({
        categoryData: fetchCategoryData(),
        stocks: fetchStocks(),
    });
};

function App() {
    const data = useLoaderData() as AppPageResponseDTO;

    return (
        <MenuProvider>
            <Header />
            <Navigation />
            <MainLayout>
                <Suspense fallback={<Loader>lade Inventar ...</Loader>}>
                    <Await resolve={data.stocks} errorElement={<ErrorBoundaryContainer />}>
                        {(stocks) => (
                            <StockProvider stocks={stocks}>
                                <Suspense fallback={<Loader>lade Kategorien ...</Loader>}>
                                    <Await resolve={data.categoryData} errorElement={<ErrorBoundaryContainer />}>
                                        {(categoryData) => (
                                            <CategoryProvider categoryData={categoryData}>
                                                <AppContextContainer>
                                                    <Outlet />
                                                </AppContextContainer>
                                            </CategoryProvider>
                                        )}
                                    </Await>
                                </Suspense>
                            </StockProvider>
                        )}
                    </Await>
                </Suspense>
            </MainLayout>
        </MenuProvider>
    );
}

export default App;
