import { Outlet, useLoaderData } from 'react-router-dom';
import Authenticate from './api/authenticate';
import { fetchStocks } from "./api/stock";
import IStockDTO from "./common/dto/StockDTOs";
import Header from './components/Layout/Header';
import MainLayout from './components/Layout/MainLayout';
import StockProvider from './store/Stock/StockProvider';

export const loader = async () => {
  await Authenticate()

  return fetchStocks()
}

function App() {
  const data = useLoaderData() as IStockDTO[]

  return (
    <StockProvider stocks={data}>
      <Header />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </StockProvider>
  );
}

export default App;
