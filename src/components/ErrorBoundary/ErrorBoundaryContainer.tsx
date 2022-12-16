import { Fragment } from 'react';
import { useRouteError } from 'react-router-dom';
import Header from '../Layout/Header';
import MainLayout from '../Layout/MainLayout';
import Container from '../UI/Container/Container';
import ErrorBoundary from './ErrorBoundary';

const ErrorBoundaryContainer = () => {
    const error: any = useRouteError();

    const caption = 'sorry, an unexpected error has occurred';
    const message = error.statusText || error.message;

    return (
        <Fragment>
            <Header />
            <MainLayout>
                <Container>
                    <ErrorBoundary caption={caption} message={message} />
                </Container>
            </MainLayout>
        </Fragment>
    );
};

export default ErrorBoundaryContainer;
