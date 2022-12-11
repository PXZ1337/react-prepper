import { createBrowserRouter } from "react-router-dom";
import App, { loader as appDataLoader } from "./App";
import ErrorBoundaryContainer from "./components/ErrorBoundary/ErrorBoundaryContainer";
import CategoryByIdPage from "./pages/category/CategoryByIdPage";
import Dashboard from "./pages/DashboardPage";
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
        loader: appDataLoader,
        errorElement: <ErrorBoundaryContainer />,
        children: [
            {
                index: true,
                element: <Dashboard />
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
            }
        ]
    }
], {
    basename: "/prepper"
});

export default router