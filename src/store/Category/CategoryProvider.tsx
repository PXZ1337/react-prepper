import { useReducer } from 'react';
import { ICategoryData, ICategoryDTO, ICategoryTree } from '../../common/dto/CategoryDTOs';
import { calculateCategoryTree } from '../../common/Utils';
import CategoryContext from './category-context';
import { CategoryActionType, CategoryUpdateEventData } from './CategoryAction';
import CategoryReducer from './CategoryReducer';

interface CategoryProviderProps {
    categoryData: ICategoryData;
    children: any;
}

const CategoryProvider = (props: CategoryProviderProps) => {
    const [categoryState, dispatchCategoryAction] = useReducer(CategoryReducer, {
        categories: props.categoryData.categories,
        subCategories: props.categoryData.subCategories,
        categoryTree: calculateCategoryTree(props.categoryData),
    });

    // Categories
    const updateCategory = (eventData: CategoryUpdateEventData) =>
        dispatchCategoryAction({
            type: CategoryActionType.UPDATE,
            payload: eventData,
        });

    const getCategoryById = (id: number): ICategoryDTO =>
        categoryState.categories.filter((category: ICategoryDTO) => category.id === id)[0];

    const updateState = async (categoryData: ICategoryData) => {
        dispatchCategoryAction({
            type: CategoryActionType.UPDATE_STATE,
            payload: {
                ...categoryData,
                categoryTree: calculateCategoryTree(categoryData),
            },
        });
    };

    // CategoryTree
    const filterTreeByCategory = (categoryId: number) =>
        categoryState.categoryTree.filter((categoryTree: ICategoryTree) => categoryTree.id === categoryId);

    const contextProps = {
        categories: categoryState.categories,
        subCategories: categoryState.subCategories,
        categoryTree: categoryState.categoryTree,

        updateCategory,

        getCategoryById,
        updateState,

        filterTreeByCategory,
    };

    return <CategoryContext.Provider value={contextProps}>{props.children}</CategoryContext.Provider>;
};

export default CategoryProvider;
