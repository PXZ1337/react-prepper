import { Fragment, Suspense } from "react";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { fetchCategories } from "../api/category";
import { ICategoryDTO } from "../common/dto/CategoryDTOs";
import CategoryList from "../components/Categories/CategoryList";
import Button, { ButtonType } from "../components/UI/Button";
import Container from "../components/UI/Container";
import Headline, { HeadlineType } from "../components/UI/Headline";
import Loader from "../components/UI/Loader/Loader";
import { Routes } from "../Router";
import ErrorBoundery from "./ErrorBoundery";

interface DashboardPageResponseDTO {
    categories: ICategoryDTO[]
}

export const loader = async () => {
    return defer({ categories: fetchCategories() })
}

const DashboardPage = () => {
    const data = useLoaderData() as DashboardPageResponseDTO
    const navigate = useNavigate()

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
                    resolve={data.categories}
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