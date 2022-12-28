import Unit from '../Unit';

export interface ICategoryDTO {
    id: number;
    name: string;
    unit: Unit;
    goal: number;
}

export interface ICategoryInputDTO {
    name: string;
    unit: Unit;
    goal: number;
}

export interface ISubCategoryDTO {
    id: string;
    name: string;
    parent: number;
}

export interface ISubCategoryCreateDTO {
    name: string;
    parent: number;
}

export interface ICategoryTree {
    id: number;
    name: string;
    unit: Unit;
    subCategories: ICategoryTreeNode[];
}

export interface ICategoryTreeNode {
    id: string;
    name: string;
}

export interface ICategoryData {
    categories: ICategoryDTO[];
    subCategories: ISubCategoryDTO[];
}
