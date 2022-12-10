import { Fragment, Suspense, useContext } from "react";
import { Await, useNavigate } from "react-router-dom";
import CategoryList from "../components/Categories/CategoryList";
import Button, { ButtonType } from "../components/UI/Button";
import Container from "../components/UI/Container";
import Headline, { HeadlineType } from "../components/UI/Headline";
import Loader from "../components/UI/Loader/Loader";
import { Routes } from "../Router";
import CategoryContext from "../store/Category/category-context";
import ErrorBoundery from "./ErrorBoundery";

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
            <Suspense fallback={<Loader>lade Kategorien ...</Loader>}>
                <Await
                    resolve={context.categories}
                    errorElement={<ErrorBoundery />}
                    children={(categories) => (
                        <CategoryList items={categories} />
                    )}
                />
            </Suspense>
        </Fragment>
    );
}

export default DashboardPage