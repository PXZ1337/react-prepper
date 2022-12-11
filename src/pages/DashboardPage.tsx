import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CategoryList from "../components/Categories/CategoryList";
import Button, { ButtonType } from "../components/UI/Button";
import Container from "../components/UI/Container";
import Headline, { HeadlineType } from "../components/UI/Headline";
import { Routes } from "../Router";
import CategoryContext from "../store/Category/category-context";

const DashboardPage = () => {
    const navigate = useNavigate()
    const context = useContext(CategoryContext)

    return (
        <Fragment>
            <Container>
                <Headline type={HeadlineType.PRIMARY} caption="Inventar nach Kategorie">Dashboard</Headline>
                <Button buttonType={ButtonType.PRIMARY} onClickHandler={() => navigate(Routes.ADD_STOCK)}>
                    NEU HINZUFÜGEN
                </Button>
            </Container>
            <CategoryList items={context.categories} />
        </Fragment>
    );
}

export default DashboardPage