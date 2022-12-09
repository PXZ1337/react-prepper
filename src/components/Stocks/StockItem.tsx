import { Link } from 'react-router-dom'
import { formatUnit } from '../../common/Format'
import IStockDTO from '../../common/dto/StockDTOs'
import { getByIdRoute, Routes } from '../../Router'
import classes from './StockItem.module.css'

interface StockItemProps {
    item: IStockDTO
}
const StockItem = (props: StockItemProps) => {
    return <div className={`${classes['stock-item']} color6`}>
        <Link className="font-dark" to={getByIdRoute(Routes.STOCK_BY_ID, props.item.id)}>
            <span className={classes.id}>{props.item.id}</span>
            <div className={classes.data}>
                <span className={classes.category}>{props.item.categoryName}</span>
                <h3>{props.item.name}</h3>
                <span>Menge: {props.item.stock} x {formatUnit(props.item.capacity, props.item.unit)}, Gesamt: {formatUnit(props.item.abs, props.item.unit)}</span>
            </div>
            <div className={classes.meta}>
                <span>Ablaufdatum: {new Date(props.item.durable).toLocaleDateString()}</span>
                <span>Zuletzt aktualisiert {new Date(props.item.dateModified).toLocaleDateString()}</span>
            </div>
        </Link>
    </div>
}

export default StockItem