import config from "../common/config"
import { ICategoryDTO, ISubCategoryDTO } from "../common/dto/CategoryDTOs"
import fetchRequest from "../common/Request"

export const fetchCategoryData = async () => {
    const categories: ICategoryDTO[] = await fetchCategories()
    const subCategories: ISubCategoryDTO[] = await fetchSubCategories()

    return {
        categories,
        subCategories
    }
}

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

export const fetchSubCategories = async (): Promise<ISubCategoryDTO[]> => {
    return fetchRequest(`${config.backendBaseUrl}/sub_categories.json`, (category: object, id: number) => {
        return {
            id,
            ...category
        }
    })
}