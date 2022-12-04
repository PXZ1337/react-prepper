import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CategoryByIdPage from "./pages/category/CategoryByIdPage";
import CategoryList from "./pages/category/CategoryListPage";
import Dashboard from "./pages/DashboardPage";
import ErrorBoundery from "./pages/ErrorBoundery";
import StockAdd from "./pages/stock/StockAddPage";
import StockByIdPage from "./pages/stock/StockByIdPage";

export const Routes = {
    DASHBOARD: '/',
    CATEGORY_LIST: '/categories',
    CATEGORY_BY_ID: '/category/:id',
    STOCK_BY_ID: '/stock/:id',
    ADD_STOCK: '/stock/add'
}

export const getByIdRoute = (path: string, id: string) => {
    return path.replace(':id', id)
}

const router = createBrowserRouter([
    {
        path: Routes.DASHBOARD,
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
                path: Routes.CATEGORY_BY_ID,
                element: <CategoryByIdPage />,
            },
            {
                path: Routes.STOCK_BY_ID,
                element: <StockByIdPage />,
            },
            {
                path: Routes.ADD_STOCK,
                element: <StockAdd />,
            },
        ]
    },

]);

export default router