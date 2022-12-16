import { Fragment, useContext } from 'react';
import { fetchCategoryData } from '../../api/category';
import { fetchStocks } from '../../api/stock';
import useHttp from '../../hooks/use-http';
import CategoryContext from '../../store/Category/category-context';
import MenuContext from '../../store/Menu/menu-context';
import StockContext from '../../store/Stock/stock-context';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Container from '../UI/Container/Container';
import Loader from '../UI/Loader/Loader';
import AppContextRefreshButton from './AppContextRefreshButton';

interface AppContextContainerProps {
    children: any;
}

const AppContextRefreshContainer = (props: AppContextContainerProps) => {
    const stockContext = useContext(StockContext);
    const categoryContext = useContext(CategoryContext);
    const menuContext = useContext(MenuContext);

    const { isLoading, error, sendRequest: reloadAppContext } = useHttp();

    const appRefreshHandler = async () => {
        menuContext.setIsVisible(false);
        if (!isLoading) {
            reloadAppContext(async () => {
                const stocks = await fetchStocks();
                const categoryData = await fetchCategoryData();

                stockContext.updateState(stocks);
                categoryContext.updateState(categoryData);
            });
        }
    };

    let content = props.children;

    if (isLoading) {
        content = <Loader>aktualisiere daten...</Loader>;
    }

    if (!isLoading && error !== '') {
        content = (
            <Container>
                <ErrorBoundary caption="An error occured" message={error} />
            </Container>
        );
    }

    return (
        <Fragment>
            <AppContextRefreshButton onAppRefreshHandler={appRefreshHandler} />
            {content}
        </Fragment>
    );
};

export default AppContextRefreshContainer;
