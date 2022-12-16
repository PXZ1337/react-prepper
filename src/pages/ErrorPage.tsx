import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Header from '../components/Layout/Header';
import MainLayout from '../components/Layout/MainLayout';
import Container from '../components/UI/Container/Container';

const ErrorPage = () => {
    const location = useLocation();

    let errorMessage = 'unknown error';
    if (location.state && location.state.error) {
        errorMessage = location.state.error;
    }

    return (
        <Fragment>
            <Header />
            <MainLayout>
                <Container>
                    <ErrorBoundary caption="sorry, an unexpected error has occurred" message={errorMessage} />
                </Container>
            </MainLayout>
        </Fragment>
    );
};

export default ErrorPage;
