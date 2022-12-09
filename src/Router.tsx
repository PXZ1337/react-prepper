import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CategoryByIdPage from "./pages/category/CategoryByIdPage";
import Dashboard, { loader as categoryLoader } from "./pages/DashboardPage";
import { loader as categoryByIdLoader } from "./pages/category/CategoryByIdPage";
import { loader as categoryTreeLoader } from "./pages/stock/StockAddPage";
import { loader as stockByIdLoader } from "./pages/stock/StockByIdPage";
import { loader as authLoader } from "./App";
import ErrorBoundery from "./pages/ErrorBoundery";
import StockAdd from "./pages/stock/StockAddPage";
import StockByIdPage from "./pages/stock/StockByIdPage";


export const Routes = {
    DASHBOARD: '/',
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
        loader: authLoader,
        errorElement: <ErrorBoundery />,
        children: [
            {
                index: true,
                loader: categoryLoader,
                element: <Dashboard />
            },
            {
                path: Routes.CATEGORY_BY_ID,
                loader: categoryByIdLoader,
                element: <CategoryByIdPage />,
            },
            {
                path: Routes.STOCK_BY_ID,
                loader: stockByIdLoader,
                element: <StockByIdPage />,
            },
            {
                path: Routes.ADD_STOCK,
                loader: categoryTreeLoader,
                element: <StockAdd />,
            },
        ]
    },
], {
    basename: "/prepper"
});

export default router