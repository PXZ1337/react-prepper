import { ICategoryDTO } from "../../common/dto/CategoryDTOs"
import CategoryAction, { CategoryActionType, defaultState, ICategoryState } from "./CategoryAction"

const CategoryReducer = (state: ICategoryState, action: CategoryAction): ICategoryState => {
    switch (action.type) {
        case CategoryActionType.ADD:
            const updated = state.categories.concat(action.payload)
            return {
                categories: updated,
                subCategories: state.subCategories,
                categoryTree: state.categoryTree
            }
        case CategoryActionType.UPDATE:
            const index = state.categories.findIndex((category: ICategoryDTO) => category.id === action.payload.id)
            const category: ICategoryDTO = state.categories[index]

            if (category) {
                const updatedCategories = [...state.categories]
                updatedCategories[index] = { ...action.payload }

                return {
                    categories: updatedCategories,
                    subCategories: state.subCategories,
                    categoryTree: state.categoryTree
                }
            }
            return defaultState
        case CategoryActionType.DELETE:
            const deletionIndex = state.categories.findIndex((category: ICategoryDTO) => category.id === action.payload.id)
            const categories = [...state.categories]
            categories.splice(deletionIndex, 1)

            return {
                categories,
                subCategories: state.subCategories,
                categoryTree: state.categoryTree
            }
        case CategoryActionType.UPDATE_STATE:
            return action.payload
        default:
            return defaultState
    }
}

export default CategoryReducer