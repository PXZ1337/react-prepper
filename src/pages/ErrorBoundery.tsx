import { Fragment } from "react";
import { useRouteError } from "react-router-dom";
import Header from "../components/Layout/Header";
import MainLayout from "../components/Layout/MainLayout";
import Container from "../components/UI/Container";
import Headline, { HeadlineType } from "../components/UI/Headline";

const ErrorBoundery = () => {
    const error: any = useRouteError();

    return (
        <Fragment>
            <Header />
            <MainLayout>
                <Container>
                    <Headline type={HeadlineType.PRIMARY} caption="sorry, an unexpected error has occurred.">
                        Oops!
                    </Headline>
                    <i>{error.statusText || error.message}</i>
                </Container>
            </MainLayout>
        </Fragment>
    );
}

export default ErrorBoundery