interface IStockDTO {
    id: string;
    name: string;
    stock: number;
    capacity: number;
    abs: number;
    parentCategoryId: number;
    categoryName: string;
    categoryId: string;
    unit: string;
    dateModified: string;
    durable?: string;
}

export interface IStockInputDTO {
    name: string;
    stock: number;
    capacity: number;
    abs: number;
    parentCategoryId: number;
    categoryName: string;
    categoryId: string;
    unit: string;
    dateModified: string;
    durable?: string;
}

export const mapToStockInputDTO = (stockDTO: IStockDTO): IStockInputDTO => {
    return {
        name: stockDTO.name,
        capacity: stockDTO.capacity,
        stock: stockDTO.stock,
        abs: stockDTO.abs,
        parentCategoryId: stockDTO.parentCategoryId,
        categoryName: stockDTO.categoryName,
        categoryId: stockDTO.categoryId,
        unit: stockDTO.unit,
        dateModified: stockDTO.dateModified,
        durable: stockDTO.durable,
    };
};

export default IStockDTO;
