import React from 'react';
import { ICategoryData, ICategoryDTO } from '../../common/dto/CategoryDTOs';
import Unit from '../../common/Unit';
import { categoryIterableTypeHelp, categoryTreeTypeHelp, CategoryUpdateEventData, subCategoryIterableTypeHelp } from './CategoryAction';

const CategoryContext = React.createContext({
    categories: categoryIterableTypeHelp,
    subCategories: subCategoryIterableTypeHelp,
    categoryTree: categoryTreeTypeHelp,

    updateCategory: (eventData: CategoryUpdateEventData) => {},

    getCategoryById: (id: number): ICategoryDTO => {
        return {
            id: 0,
            name: 'string',
            unit: Unit.G,
            goal: 0,
        };
    },
    updateState: (categoryData: ICategoryData) => {},
    filterTreeByCategory: (categoryId: number) => {
        return categoryTreeTypeHelp;
    },
});

export default CategoryContext;
