import { Fragment } from 'react';
import UpdateStockForm from '../../components/Stocks/Update/UpdateStockForm';
import Container from '../../components/UI/Container/Container';

const StockByIdPage = () => {
    return (
        <Fragment>
            <Container>
                <UpdateStockForm />
            </Container>
        </Fragment>
    );
};

export default StockByIdPage;
