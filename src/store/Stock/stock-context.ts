import React from 'react'
import IStockDTO from '../../common/dto/StockDTOs'
import { stockIterableTypeHelp } from './StockAction'

const StockContext = React.createContext({
    stocks: stockIterableTypeHelp,
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
    updateStock: (stock: IStockDTO) => { },
    addStock: (stock: IStockDTO) => { },
    removeStock: (id: string) => { }
})

export default StockContext