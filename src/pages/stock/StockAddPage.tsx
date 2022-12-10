import { Fragment } from "react"
import AddStockForm from "../../components/Stocks/Add/AddStockForm"
import Container from "../../components/UI/Container"
import Headline, { HeadlineType } from "../../components/UI/Headline"

const StockAddPage = () => {
    return <Fragment>
        <Container>
            <Headline type={HeadlineType.PRIMARY} caption="neuen Bestand hinzufügen">Erstellen</Headline>
            <AddStockForm />
        </Container>
    </Fragment>
}

export default StockAddPage