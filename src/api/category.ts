import config from "../common/config"
import { ICategoryDTO, ISubCategoryDTO } from "../common/dto/CategoryDTOs"
import fetchRequest from "../common/Request"

export const fetchCategories = async (): Promise<ICategoryDTO[]> => {
    let categories: ICategoryDTO[] = await fetchRequest(`${config.backendBaseUrl}/categories.json`, (category: object, id: number) => {
        return {
            id,
            ...category
        }
    })

    // Remove root element
    categories.splice(0, 1)

    return categories
}

export const getCategoryById = async (id: number): Promise<ICategoryDTO> => {
    const category = await fetchRequest(`${config.backendBaseUrl}/categories/${id}.json`)

    // Remove root element
    if (!category || id === 0) {
        throw Error(`Category with id: "${id}" not found!`)
    }

    return {
        id,
        ...category
    }
}

export const fetchSubCategories = async (): Promise<ISubCategoryDTO[]> => {
    return fetchRequest(`${config.backendBaseUrl}/sub_categories.json`, (category: object, id: number) => {
        return {
            id,
            ...category
        }
    })
}


export const fetchCategoryTree = async () => {
    const categories: ICategoryDTO[] = await fetchCategories()
    const subCategories: ISubCategoryDTO[] = await fetchSubCategories()

    let subCategoryMap = new Map<number, ISubCategoryDTO[]>()
    subCategories.forEach((subCategory) => {
        const collection = subCategoryMap.get(subCategory.parent);
        if (!collection) {
            subCategoryMap.set(subCategory.parent, [subCategory]);
        } else {
            collection.push(subCategory);
        }
    });

    const tree = categories.map((category: ICategoryDTO) => {
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

    return tree
}
