import React from 'react'
import { ICategoryDTO } from '../../common/dto/CategoryDTOs'
import IStockDTO from '../../common/dto/StockDTOs'
import { stockIterableTypeHelp } from './StockAction'

const StockContext = React.createContext({
    stocks: stockIterableTypeHelp,
    addStock: (stock: IStockDTO) => { },
    updateStock: (stock: IStockDTO) => { },
    removeStock: (id: string) => { },

    getStocksByParentCategoryId: (parentCategoryId: number): IStockDTO[] => { return [] },
    getStockById: (stockId: string): IStockDTO => {
        return {
            id: 'string',
            name: 'string',
            stock: 0,
            capacity: 0,
            abs: 0,
            parentCategoryId: 0,
            categoryName: 'string',
            categoryId: 0,
            unit: 'string',
            dateModified: 'string',
            durable: 'string',
        }
    },
    calculateCapacityByCategory: (category: ICategoryDTO): number => 0,
    updateState: (stocks: IStockDTO[]) => { }
})

export default StockContext