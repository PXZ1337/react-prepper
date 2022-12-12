import IStockDTO from "../../common/dto/StockDTOs"
import StockItem from "./StockItem"
import classes from './StockList.module.css'

interface StockListProps {
    items: IStockDTO[]
    increaseStockHandler: (stockItem: IStockDTO) => void
    reduceStockHandler: (stockItem: IStockDTO) => void
}

const StockList = (props: StockListProps) => {
    const availableStocks = props.items.map((stock: IStockDTO) => {
        return <StockItem
            key={stock.id}
            item={stock}
            increaseStockHandler={props.increaseStockHandler}
            reduceStockHandler={props.reduceStockHandler}
        />
    })
    return <div className={classes['stock-list']}>
        {availableStocks}
    </div>
}

export default StockList