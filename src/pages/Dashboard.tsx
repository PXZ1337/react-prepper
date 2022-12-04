import { Fragment } from "react";
import CategoryList from "../components/Categories/CategoryList";

const Dashboard = () => {
    return (
        <Fragment>
            <h1>Dashboard</h1>
            <p>Stocks by category</p>

            <CategoryList />
        </Fragment>
    );
}

export default Dashboard