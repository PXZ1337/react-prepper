import { Fragment } from 'react';
import AddStockForm from '../../components/Stocks/Add/AddStockForm';
import Container from '../../components/UI/Container/Container';
import Headline, { HeadlineType } from '../../components/UI/Misc/Headline';

const StockAddPage = () => {
    return (
        <Fragment>
            <Container>
                <Headline type={HeadlineType.PRIMARY} caption="neuen Bestand hinzufügen">
                    Erstellen
                </Headline>
                <AddStockForm />
            </Container>
        </Fragment>
    );
};

export default StockAddPage;
