import IStock from "../../common/Stock"
import AvailableStocks from "./AvailableStocks"
import StockItem from "./StockItem"
import classes from './StockList.module.css'

const StockList = () => {
    const availableStocks = AvailableStocks().map((stock: IStock) => {
        return <StockItem
            key={stock.id}
            item={stock} />
    })
    return <div className={classes['stock-list']}>
        {availableStocks}
    </div>
}

export default StockList