import { useContext } from 'react';
import { deleteStock, updateStock } from '../../api/stock';
import IStockDTO, { mapToStockInputDTO } from '../../common/dto/StockDTOs';
import useHttp from '../../hooks/use-http';
import StockContext from '../../store/Stock/stock-context';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Container from '../UI/Container/Container';
import StockItem from './StockItem';
import classes from './StockList.module.css';

interface StockListProps {
    items: IStockDTO[];
}

const StockList = (props: StockListProps) => {
    const stockContext = useContext(StockContext);

    const { isLoading: increaseLoading, error: increaseError, sendRequest: increaseStock } = useHttp();
    const { isLoading: reduceLoading, error: reduceError, sendRequest: reduceStock } = useHttp();
    const isLoading = increaseLoading && reduceLoading;

    const reduceStockHandler = async (stockItem: IStockDTO) => {
        if (!reduceLoading) {
            reduceStock(async () => {
                const updatedStock = stockItem.stock - 1;
                if (updatedStock < 1) {
                    if (window.confirm('Achtung! Wollen Sie den Eintrag wirklich löschen?')) {
                        await deleteStock(stockItem.id);
                        stockContext.removeStock(stockItem.id);
                    }

                    return;
                }

                stockItem.stock = updatedStock;
                stockItem.abs = updatedStock * stockItem.capacity;

                const stockDTO = await updateStock(stockItem.id, mapToStockInputDTO(stockItem));
                stockContext.updateStock(stockDTO);
            });
        }
    };

    const increaseStockHandler = async (stockItem: IStockDTO) => {
        if (!increaseLoading) {
            increaseStock(async () => {
                const updatedStock = stockItem.stock + 1;
                stockItem.stock = updatedStock;
                stockItem.abs = updatedStock * stockItem.capacity;

                const stockDTO = await updateStock(stockItem.id, mapToStockInputDTO(stockItem));
                stockContext.updateStock(stockDTO);
            });
        }
    };

    if (!isLoading && (increaseError !== '' || reduceError !== '')) {
        return (
            <Container>
                <ErrorBoundary caption="An error occured" message={increaseError || reduceError} />
            </Container>
        );
    }

    if (props.items.length === 0) {
        return <p>Kein Inventar gefunden!</p>;
    }

    const availableStocks = props.items.map((stock: IStockDTO) => {
        return <StockItem key={stock.id} item={stock} increaseStockHandler={increaseStockHandler} reduceStockHandler={reduceStockHandler} />;
    });
    return <div className={classes['stock-list']}>{availableStocks}</div>;
};

export default StockList;
