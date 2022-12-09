import IStockDTO from "../../common/dto/StockDTOs";

export const stockIterableTypeHelp: IStockDTO[] = []
export const defaultStockState = {
    stocks: stockIterableTypeHelp
}

export enum StockActionType {
    ADD, UPDATE, REDUCE
}

export interface IStockState {
    stocks: IStockDTO[]
}

interface StockAction {
    type: StockActionType;
    payload: any;
}

export default StockAction