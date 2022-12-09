import IStockDTO from "../../common/dto/StockDTOs"
import StockAction, { defaultStockState, IStockState, StockActionType } from "./StockAction"

const StockReducer = (state: IStockState, action: StockAction): IStockState => {
    switch (action.type) {
        case StockActionType.ADD:
            const updated = state.stocks.concat(action.payload)
            return {
                stocks: updated
            }
        case StockActionType.UPDATE:
            const index = state.stocks.findIndex((stock: IStockDTO) => stock.id === action.payload.id)
            const stock: IStockDTO = state.stocks[index]

            if (stock) {
                const updatedStocks = [...state.stocks]
                updatedStocks[index] = { ...action.payload }

                return {
                    stocks: updatedStocks,
                }
            } else {
                return StockReducer(state, { type: StockActionType.ADD, payload: action.payload })
            }

        case StockActionType.REDUCE:
            const reduceI = state.stocks.findIndex((stock: IStockDTO) => stock.id === action.payload.id)
            const reduceStock: IStockDTO = state.stocks[reduceI]
            let updatedStocks = [...state.stocks]

            if (reduceStock) {
                if (reduceStock.stock > 1) {
                    const updatedStock = {
                        ...reduceStock,
                        stock: reduceStock.stock - 1
                    }
                    updatedStocks[reduceI] = updatedStock
                } else {
                    updatedStocks.splice(reduceI, 1)
                }
            }
            return {
                stocks: updatedStocks
            }
        default:
            return defaultStockState
    }
}

export default StockReducer