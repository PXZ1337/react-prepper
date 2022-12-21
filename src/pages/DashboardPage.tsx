import { Fragment, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CategoryList from '../components/Category/CategoryList';
import Container from '../components/UI/Container/Container';
import Button, { ButtonType } from '../components/UI/Control/Button';
import Headline, { HeadlineType } from '../components/UI/Misc/Headline';
import { Routes } from '../Router';
import CategoryContext from '../store/Category/category-context';

const DashboardPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const context = useContext(CategoryContext);

    return (
        <Fragment>
            <Container>
                <Headline type={HeadlineType.PRIMARY} caption="Inventar nach Kategorie">
                    Dashboard
                </Headline>
                <Button buttonType={ButtonType.PRIMARY} onClickHandler={() => navigate(Routes.ADD_STOCK, { state: { referer: location.pathname } })}>
                    NEU HINZUFÜGEN
                </Button>
            </Container>
            <CategoryList items={context.categories} />
        </Fragment>
    );
};

export default DashboardPage;
