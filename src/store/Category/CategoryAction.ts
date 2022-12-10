import { ICategoryDTO, ICategoryTree, ISubCategoryDTO } from "../../common/dto/CategoryDTOs";

export const categoryIterableTypeHelp: ICategoryDTO[] = []
export const subCategoryIterableTypeHelp: ISubCategoryDTO[] = []
export const categoryTreeTypeHelp: ICategoryTree[] = [{
    id: 0,
    name: 'string',
    subCategories: subCategoryIterableTypeHelp
}]

export const defaultState = {
    categories: categoryIterableTypeHelp,
    subCategories: subCategoryIterableTypeHelp,
    categoryTree: categoryTreeTypeHelp
}

export enum CategoryActionType {
    ADD, UPDATE, DELETE, CALCULATE_TREE
}

export interface ICategoryState {
    categories: ICategoryDTO[]
    subCategories: ISubCategoryDTO[],
    categoryTree: ICategoryTree[]
}

interface CategoryAction {
    type: CategoryActionType;
    payload: any;
}

export default CategoryAction