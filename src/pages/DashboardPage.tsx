import { Fragment } from "react";
import CategoryList from "../components/Categories/CategoryList";
import AddStockButton from "../components/Stocks/Add/AddStockButton";
import Container from "../components/UI/Container";

const DashboardPage = () => {
    return (
        <Fragment>
            <Container>
                <h1>Dashboard</h1>
                <p>Stocks by category</p>
                <AddStockButton />
            </Container>
            <CategoryList />
        </Fragment>
    );
}

export default DashboardPage