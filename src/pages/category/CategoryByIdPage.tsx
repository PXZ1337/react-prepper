import { Fragment, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CategoryGridItem from '../../components/Categories/CategoryGridItem';
import StockList from '../../components/Stocks/StockList';
import ButtonCard from '../../components/UI/Card/ButtonCard';
import ContentCard from '../../components/UI/Card/ContentCard';
import Container from '../../components/UI/Container/Container';
import Button, { ButtonType } from '../../components/UI/Control/Button';
import Headline, { HeadlineType } from '../../components/UI/Misc/Headline';
import { Routes } from '../../Router';
import CategoryContext from '../../store/Category/category-context';
import StockContext from '../../store/Stock/stock-context';

const CategoryByIdPage = () => {
    const navigate = useNavigate();
    const params: any = useParams();
    const location = useLocation();

    const stockContext = useContext(StockContext);
    const categoryContext = useContext(CategoryContext);

    const category = categoryContext.getCategoryById(+params.id);
    const filtered = stockContext.getStocksByParentCategoryId(category.id);

    return (
        <Fragment>
            <Container>
                <Headline type={HeadlineType.PRIMARY}>{category.name}</Headline>
                <CategoryGridItem
                    id={category.id}
                    name={category.name}
                    stock={stockContext.calculateCapacityByCategory(category)}
                    goal={category.goal}
                    unit={category.unit}
                />

                <ButtonCard>
                    <Button
                        buttonType={ButtonType.BACK}
                        onClickHandler={() => {
                            navigate(Routes.DASHBOARD);
                        }}
                    >
                        ZURÜCK
                    </Button>
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        onClickHandler={() => navigate(Routes.ADD_STOCK, { state: { referer: location.pathname, categoryId: category.id } })}
                    >
                        NEU HINZUFÜGEN
                    </Button>
                </ButtonCard>

                <ContentCard>
                    <Headline type={HeadlineType.PRIMARY}>Inventar ({filtered.length})</Headline>
                    <StockList items={filtered} />
                </ContentCard>
            </Container>
        </Fragment>
    );
};

export default CategoryByIdPage;
