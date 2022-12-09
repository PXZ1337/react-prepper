import React from "react";
import { Fragment } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import Authenticate from "../api/authenticate";
import { fetchCategories } from "../api/category";
import { ICategoryDTO } from "../common/dto/CategoryDTOs";
import CategoryList from "../components/Categories/CategoryList";
import Button, { ButtonType } from "../components/UI/Button";
import Container from "../components/UI/Container";
import Headline, { HeadlineType } from "../components/UI/Headline";
import { Routes } from "../Router";

export const loader = async () => {
    return fetchCategories()
}

const DashboardPage = () => {
    const categories = useLoaderData() as ICategoryDTO[]
    const navigate = useNavigate()

    return (
        <Fragment>
            <Container>
                <Headline type={HeadlineType.PRIMARY} caption="Inventar nach Kategorie">Dashboard</Headline>
                <Button buttonType={ButtonType.PRIMARY} onClickHandler={() => navigate(Routes.ADD_STOCK)}>
                    NEU HINZUFÜGEN
                </Button>
            </Container>


            <React.Suspense fallback={<p>loading categories ...</p>}>
                <Await
                    resolve={categories}
                    errorElement={
                        <div>Could not load categories 😬</div>
                    }
                    children={(resolvedCategories) => (
                        <CategoryList items={resolvedCategories} />
                    )}
                />
            </React.Suspense>
        </Fragment>
    );
}

export default DashboardPage