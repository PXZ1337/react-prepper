import { useReducer } from "react"
import StockContext from "./stock-context"
import IStockDTO from "../../common/dto/StockDTOs"
import { StockActionType } from "./StockAction"
import StockReducer from "./StockReducer"
import { ICategoryDTO } from "../../common/dto/CategoryDTOs"
import Unit from "../../common/Unit"
import { groupBy } from "../../common/Utils"

interface StockProviderProps {
    stocks: IStockDTO[]
    children: any
}

const StockProvider = (props: StockProviderProps) => {
    const [stockState, dispatchStockAction] = useReducer(StockReducer, { stocks: props.stocks })

    const addStock = (stock: IStockDTO) => dispatchStockAction({ type: StockActionType.ADD, payload: stock })
    const updateStock = (stock: IStockDTO) => dispatchStockAction({ type: StockActionType.UPDATE, payload: stock })
    const removeStock = (id: string) => dispatchStockAction({ type: StockActionType.REDUCE, payload: { id: id } })

    const getStocksByParentCategoryId = (parentCategoryId: number): IStockDTO[] => stockState.stocks.filter((stock: IStockDTO) => stock.parentCategoryId === parentCategoryId)
    const getStockById = (stockId: string): IStockDTO => stockState.stocks.filter((stock: IStockDTO) => stock.id === stockId)[0]
    const calculateCapacityByCategory = (category: ICategoryDTO): number => {
        let stockCapacity = 0
        const stockList = getStocksByParentCategoryId(category.id)

        switch (category.unit) {
            case Unit.items:
                const groupedStocks: object = groupBy(stockList, 'categoryId')
                stockCapacity = Object.keys(groupedStocks).length
                break
            default:
                stockCapacity = stockList.reduce((previousValue, currentValue) => previousValue + currentValue.abs, 0)
        }

        return stockCapacity
    }

    const contextProps = {
        stocks: stockState.stocks,
        addStock,
        updateStock,
        removeStock,

        getStocksByParentCategoryId,
        getStockById,
        calculateCapacityByCategory
    }

    return <StockContext.Provider value={contextProps}>
        {props.children}
    </StockContext.Provider>
}

export default StockProvider