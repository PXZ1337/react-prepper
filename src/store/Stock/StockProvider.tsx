import { useReducer } from "react"
import StockContext from "./stock-context"
import IStockDTO from "../../common/dto/StockDTOs"
import { StockActionType } from "./StockAction"
import StockReducer from "./StockReducer"

interface StockProviderProps {
    stocks: IStockDTO[]
    children: any
}

const StockProvider = (props: StockProviderProps) => {
    const [stockState, dispatchStockAction] = useReducer(StockReducer, { stocks: props.stocks })

    const addStockHandler = (stock: IStockDTO) => dispatchStockAction({ type: StockActionType.ADD, payload: stock })
    const updateStockHandler = (stock: IStockDTO) => dispatchStockAction({ type: StockActionType.UPDATE, payload: stock })

    const removeStockHandler = (id: string) => dispatchStockAction({ type: StockActionType.REDUCE, payload: { id: id } })
    const getStocksByParentCategoryHandler = (parentCategoryId: number): IStockDTO[] => stockState.stocks.filter((stock: IStockDTO) => stock.parentCategoryId === parentCategoryId)
    const getStockByIdHandler = (stockId: string): IStockDTO => stockState.stocks.filter((stock: IStockDTO) => stock.id === stockId)[0]

    const contextProps = {
        stocks: stockState.stocks,
        getStocksByParentCategoryId: getStocksByParentCategoryHandler,
        getStockById: getStockByIdHandler,
        updateStock: updateStockHandler,
        addStock: addStockHandler,
        removeStock: removeStockHandler
    }

    return <StockContext.Provider value={contextProps}>
        {props.children}
    </StockContext.Provider>
}

export default StockProvider