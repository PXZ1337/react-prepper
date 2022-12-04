import IStock from '../../common/Stock'
import Button from '../UI/Button'
import classes from './StockItem.module.css'
import StockList from './StockList'

interface StockItemProps {
    item: IStock
}
const StockItem = (props: StockItemProps) => {
    return <div className={classes['stock-item']}>
        <div className={classes.category}>{props.item.category}</div>
        <div>
            <h3>{props.item.name} ({props.item.abs} {props.item.unit})</h3>
        </div>
        <div>
            <p>Menge: {props.item.stock}x{props.item.capacity} {props.item.unit}</p>
        </div>
        <div className={classes.meta}>
            <span>Last updated {props.item.dateModified.toLocaleString()}</span><br />
            <span>Durable: {props.item.durable.toLocaleString()}</span>
        </div>
        <div className={classes.actions}>
            <Button onClickHandler={() => { }}>Edit</Button>
            <Button onClickHandler={() => { }}>+</Button>
            <Button onClickHandler={() => { }}>-</Button>
        </div>
    </div>
}

export default StockItem