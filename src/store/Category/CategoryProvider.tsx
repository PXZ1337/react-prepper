import { useReducer } from "react"
import { ICategoryDTO, ISubCategoryDTO } from "../../common/dto/CategoryDTOs"
import CategoryContext from "./category-context"
import { CategoryActionType } from "./CategoryAction"
import CategoryReducer from "./CategoryReducer"

interface CategoryProviderProps {
    categories: ICategoryDTO[]
    subCategories: ISubCategoryDTO[]
    children: any
}

const calculateCategoryTree = (props: CategoryProviderProps) => {
    let subCategoryMap = new Map<number, ISubCategoryDTO[]>()
    props.subCategories.forEach((subCategory) => {
        const collection = subCategoryMap.get(subCategory.parent);
        if (!collection) {
            subCategoryMap.set(subCategory.parent, [subCategory]);
        } else {
            collection.push(subCategory);
        }
    });

    return props.categories.map((category: ICategoryDTO) => {
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
        categories: props.categories,
        subCategories: props.subCategories,
        categoryTree: calculateCategoryTree(props)
    })

    const addCategory = (category: ICategoryDTO) => dispatchCategoryAction({ type: CategoryActionType.ADD, payload: category })
    const updateCategory = (category: ICategoryDTO) => dispatchCategoryAction({ type: CategoryActionType.UPDATE, payload: category })
    const removeCategory = (id: number) => dispatchCategoryAction({ type: CategoryActionType.DELETE, payload: { id: id } })

    const getCategoryById = (id: number): ICategoryDTO => categoryState.categories.filter((category: ICategoryDTO) => category.id === id)[0]

    const contextProps = {
        categories: categoryState.categories,
        subCategories: categoryState.subCategories,
        categoryTree: categoryState.categoryTree,

        addCategory,
        updateCategory,
        removeCategory,
        getCategoryById
    }

    return <CategoryContext.Provider value={contextProps}>
        {props.children}
    </CategoryContext.Provider>
}

export default CategoryProvider