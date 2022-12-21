import { ICategoryDTO, ICategoryTree } from '../common/dto/CategoryDTOs';
import IStockDTO from '../common/dto/StockDTOs';
import Unit from '../common/Unit';

export const createStockDTO = (
    id: string,
    name: string,
    stock: number = 1,
    capacity: number = 1,
    abs: number = 1,
    parentCategoryId: number = 0,
    categoryName: string = 'Test-Category',
    categoryId: number = 0,
    unit: string = Unit.G,
    dateModified: string = new Date().toISOString(),
    durable?: string
): IStockDTO => {
    return {
        id,
        name,
        stock,
        capacity,
        abs,
        parentCategoryId,
        categoryName,
        categoryId,
        unit,
        dateModified,
        durable,
    };
};

export const createCategoryDTO = (id: number, name: string, unit: Unit, goal: number): ICategoryDTO => {
    return {
        id,
        name,
        unit,
        goal,
    };
};

export const createCategoryTreeDTO = (): ICategoryTree => {
    return {
        id: 1,
        name: 'Root-Category',
        unit: Unit.G,
        subCategories: [
            {
                id: 1,
                name: 'Sub-Category_1',
            },
            {
                id: 2,
                name: 'Sub-Category_2',
            },
            {
                id: 3,
                name: 'Sub-Category_3',
            },
            {
                id: 4,
                name: 'Sub-Category_4',
            },
        ],
    };
};
