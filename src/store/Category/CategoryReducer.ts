import { ICategoryDTO } from '../../common/dto/CategoryDTOs';
import { calculateCategoryTree } from '../../common/Utils';
import CategoryAction, { CategoryActionType, CategoryUpdateEventData, defaultState, ICategoryState } from './CategoryAction';

const CategoryReducer = (state: ICategoryState, action: CategoryAction): ICategoryState => {
    switch (action.type) {
        case CategoryActionType.UPDATE:
            const {
                categoryData,
                addedSubCategories: subCategoriesToBeAdded,
                updatedSubCategories: subCategoriesToBeUpdated,
                deletedSubCategories: subCategoriesToBeDeleted,
            }: CategoryUpdateEventData = action.payload;

            const index = state.categories.findIndex((category: ICategoryDTO) => category.id === categoryData.id);
            const category: ICategoryDTO = state.categories[index];

            if (category) {
                // Update parent category
                const updatedCategories = [...state.categories];
                updatedCategories[index] = { ...categoryData };

                // Add new created sub categories
                const updatedSubCategories = [...state.subCategories].concat(subCategoriesToBeAdded);

                // Update existing sub categories
                if (subCategoriesToBeUpdated.length > 0) {
                    subCategoriesToBeUpdated.forEach((toBeUpdated) => {
                        const index = updatedSubCategories.findIndex((existingSubCategory) => existingSubCategory.id === toBeUpdated.id);
                        if (index === -1) {
                            throw Error(
                                `Inconsistent subCategory-Context. There should be an existing subCategory with the id: ${toBeUpdated.id}`
                            );
                        }

                        updatedSubCategories[index] = toBeUpdated;
                    });
                }

                // Delete existing sub categories
                if (subCategoriesToBeDeleted.length > 0) {
                    subCategoriesToBeDeleted.forEach((subCategoryId: string) => {
                        const index = updatedSubCategories.findIndex((existingSubCategory) => existingSubCategory.id === subCategoryId);
                        if (index === -1) {
                            throw Error(
                                `Inconsistent subCategory-Context. There should be an existing subCategory with the id: ${subCategoryId}`
                            );
                        }

                        updatedSubCategories.splice(index, 1);
                    });
                }

                return {
                    categories: updatedCategories,
                    subCategories: updatedSubCategories,
                    categoryTree: calculateCategoryTree({
                        categories: updatedCategories,
                        subCategories: updatedSubCategories,
                    }),
                };
            }
            return defaultState;
        case CategoryActionType.UPDATE_STATE:
            return action.payload;
        default:
            return defaultState;
    }
};

export default CategoryReducer;
