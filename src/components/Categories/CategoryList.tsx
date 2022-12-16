import { useContext } from 'react';
import { ICategoryDTO } from '../../common/dto/CategoryDTOs';
import StockContext from '../../store/Stock/stock-context';
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

    return <GridCointainer>{availableCategories}</GridCointainer>;
};

export default CategoryList;
