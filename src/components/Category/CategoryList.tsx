import { useContext } from 'react';
import { ICategoryDTO } from '../../common/dto/CategoryDTOs';
import StockContext from '../../store/Stock/stock-context';
import Container from '../UI/Container/Container';
import GridCointainer from '../UI/Container/GridContainer';
import CategoryGridItem from './CategoryGridItem';

interface CategoryListProps {
    items: ICategoryDTO[];
}

const CategoryList = (props: CategoryListProps) => {
    const context = useContext(StockContext);
    const availableCategories = props.items.map((category: ICategoryDTO) => {
        return (
            <CategoryGridItem
                key={category.id}
                id={category.id}
                name={category.name}
                stock={context.calculateCapacityByCategory(category)}
                goal={category.goal}
                unit={category.unit}
            />
        );
    });

    if (availableCategories.length === 0) {
        return <Container>Keine Kategorien gefunden!</Container>;
    }

    return (
        <Container>
            <GridCointainer>{[availableCategories]}</GridCointainer>
        </Container>
    );
};

export default CategoryList;
