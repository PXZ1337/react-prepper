import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CategoryList from "./pages/category/CategoryList";
import Dashboard from "./pages/Dashboard";
import ErrorBoundery from "./pages/ErrorBoundery";
import StockAdd from "./pages/stock/StockAdd";
import StockList from "./pages/stock/StockList";

export const Routes = {
    CATEGORY_LIST: '/categories',
    STOCK_LIST: '/stocks',
    ADD_STOCK: '/stocks/add'
}


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorBoundery />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: Routes.CATEGORY_LIST,
                element: <CategoryList />,
            },
            {
                path: Routes.STOCK_LIST,
                element: <StockList />,
            },
            {
                path: Routes.ADD_STOCK,
                element: <StockAdd />,
            },
        ]
    },

]);

export default router