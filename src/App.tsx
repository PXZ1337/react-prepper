import { Fragment, Suspense } from 'react';
import { Await, defer, Outlet, useLoaderData } from 'react-router-dom';
import { fetchStocks } from "./api/stock";
import IStockDTO from "./common/dto/StockDTOs";
import Header from './components/Layout/Header';
import MainLayout from './components/Layout/MainLayout';
import Loader from './components/UI/Loader/Loader';
import ErrorBoundery from './pages/ErrorBoundery';
import StockProvider from './store/Stock/StockProvider';

interface AppPageResponseDTO {
    stocks: IStockDTO[]
}

export const loader = async () => {
    return defer({ stocks: fetchStocks() })
}

function App() {
    const data = useLoaderData() as AppPageResponseDTO
    return (
        <Fragment>
            <Header />
            <MainLayout>
                <Suspense fallback={<Loader>lade app ...</Loader>}>
                    <Await
                        resolve={data.stocks}
                        errorElement={<ErrorBoundery />}>
                        {(stocks) => (
                            <StockProvider stocks={stocks}>
                                <Outlet />
                            </StockProvider>
                        )}
                    </Await>
                </Suspense>
            </MainLayout>
        </Fragment>
    );
}

export default App;
