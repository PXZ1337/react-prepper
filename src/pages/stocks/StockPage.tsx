import { useContext } from 'react';
import IStockDTO from '../../common/dto/StockDTOs';
import StockList from '../../components/Stocks/StockList';
import Container from '../../components/UI/Container';
import Headline, { HeadlineType } from '../../components/UI/Headline';
import StockContext from '../../store/Stock/stock-context';

const StockPage = () => {
    const stockContext = useContext(StockContext);

    let stocksWithDurableDate = stockContext.stocks.filter((stock: IStockDTO) => {
        return !!stock.durable;
    });
    stocksWithDurableDate = stocksWithDurableDate.sort((a: IStockDTO, b: IStockDTO) => (new Date(a.durable!) > new Date(b.durable!) ? 1 : -1));

    return (
        <Container>
            <Headline type={HeadlineType.PRIMARY} caption="Gefiltert und sortiert nach Ablaufdatum">
                Inventar ({stocksWithDurableDate.length})
            </Headline>
            <StockList items={stocksWithDurableDate} />
        </Container>
    );
};

export default StockPage;
