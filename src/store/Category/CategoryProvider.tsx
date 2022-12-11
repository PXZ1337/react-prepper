import { useReducer } from "react"
import { ICategoryData, ICategoryDTO, ISubCategoryDTO } from "../../common/dto/CategoryDTOs"
import CategoryContext from "./category-context"
import { CategoryActionType } from "./CategoryAction"
import CategoryReducer from "./CategoryReducer"

interface CategoryProviderProps {
    categoryData: ICategoryData
    children: any
}

const calculateCategoryTree = (categoryData: ICategoryData) => {
    let subCategoryMap = new Map<number, ISubCategoryDTO[]>()
    categoryData.subCategories.forEach((subCategory) => {
        const collection = subCategoryMap.get(subCategory.parent);
        if (!collection) {
            subCategoryMap.set(subCategory.parent, [subCategory]);
        } else {
            collection.push(subCategory);
        }
    });

    return categoryData.categories.map((category: ICategoryDTO) => {
        let subCategories: ISubCategoryDTO[] = []

        if (subCategoryMap.has(category.id)) {
            subCategories = subCategoryMap.get(category.id)!
        }


        return {
            id: category.id,
            name: category.name,
            subCategories: subCategories.map((subCategory: ISubCategoryDTO) => {
                return subCategory
            })
        }
    })
}

const CategoryProvider = (props: CategoryProviderProps) => {
    const [categoryState, dispatchCategoryAction] = useReducer(CategoryReducer, {
        categories: props.categoryData.categories,
        subCategories: props.categoryData.subCategories,
        categoryTree: calculateCategoryTree(props.categoryData)
    })

    const addCategory = (category: ICategoryDTO) => dispatchCategoryAction({ type: CategoryActionType.ADD, payload: category })
    const updateCategory = (category: ICategoryDTO) => dispatchCategoryAction({ type: CategoryActionType.UPDATE, payload: category })
    const removeCategory = (id: number) => dispatchCategoryAction({ type: CategoryActionType.DELETE, payload: { id: id } })

    const getCategoryById = (id: number): ICategoryDTO => categoryState.categories.filter((category: ICategoryDTO) => category.id === id)[0]

    const updateState = async (categoryData: ICategoryData) => {
        dispatchCategoryAction({
            type: CategoryActionType.UPDATE_STATE, payload: {
                ...categoryData,
                categoryTree: calculateCategoryTree(categoryData)
            }
        })
    }


    const contextProps = {
        categories: categoryState.categories,
        subCategories: categoryState.subCategories,
        categoryTree: categoryState.categoryTree,

        addCategory,
        updateCategory,
        removeCategory,
        getCategoryById,

        updateState
    }

    return <CategoryContext.Provider value={contextProps}>
        {props.children}
    </CategoryContext.Provider>
}

export default CategoryProvider