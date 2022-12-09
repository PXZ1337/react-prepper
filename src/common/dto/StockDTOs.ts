interface IStockDTO {
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
    durable: string,
}

export interface IStockInputDTO {
    name: string,
    stock: number,
    capacity: number,
    abs: number,
    parentCategoryId: number,
    categoryName: string
    categoryId: number,
    unit: string,
    dateModified: string,
    durable: string,
}


export default IStockDTO