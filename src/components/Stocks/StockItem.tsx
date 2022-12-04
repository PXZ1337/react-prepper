import { Link } from 'react-router-dom'
import IStock from '../../common/Stock'
import { getByIdRoute, Routes } from '../../Router'
import Button from '../UI/Button'
import classes from './StockItem.module.css'

interface StockItemProps {
    item: IStock
}
const StockItem = (props: StockItemProps) => {
    return <div className={classes['stock-item']}>
        <Link to={getByIdRoute(Routes.STOCK_BY_ID, props.item.id)}>
            <div>
                <span className={classes.category}>{props.item.category}</span>
                <h3>{props.item.name} ({props.item.abs} {props.item.unit})</h3>
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
        </Link>
    </div>
}

export default StockItem