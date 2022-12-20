import { ICategoryDTO } from '../common/dto/CategoryDTOs';
import IStockDTO from '../common/dto/StockDTOs';
import Unit from '../common/Unit';

export const createStockDTO = (
    id: string,
    name: string,
    stock: number,
    capacity: number,
    abs: number,
    parentCategoryId: number,
    categoryName: string,
    categoryId: number,
    unit: string,
    dateModified: string,
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
