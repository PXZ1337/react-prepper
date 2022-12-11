import Unit from "../Unit"

export interface ICategoryDTO {
    id: number
    name: string
    unit: Unit
    goal: number
}

export interface ISubCategoryDTO {
    id: number,
    name: string
    parent: number
}

export interface ICategoryTree {
    id: number
    name: string
    subCategories: ICategoryTreeNode[]
}

export interface ICategoryTreeNode {
    id: number,
    name: string,
}

export interface ICategoryData {
    categories: ICategoryDTO[],
    subCategories: ISubCategoryDTO[]
}