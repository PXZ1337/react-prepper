import { SyntheticEvent } from 'react'
import { MdOutlineExposureNeg1, MdOutlineExposurePlus1 } from "react-icons/md"
import { Link } from 'react-router-dom'
import IStockDTO from '../../common/dto/StockDTOs'
import { formatUnit } from '../../common/Format'
import useAnimate from '../../hooks/use-animate'
import { getByIdRoute, Routes } from '../../Router'
import classes from './StockItem.module.css'


interface StockItemProps {
    item: IStockDTO
    increaseStockHandler: (stockItem: IStockDTO) => void
    reduceStockHandler: (stockItem: IStockDTO) => void
}

const StockItem = (props: StockItemProps) => {
    const { animate, setAnimate } = useAnimate(props.item)

    const reduceClickHandler = (event: SyntheticEvent) => {
        event.preventDefault()
        setAnimate(true)
        props.reduceStockHandler(props.item)
    }

    const increaseClickHandler = (event: SyntheticEvent) => {
        event.preventDefault()
        setAnimate(true)
        props.increaseStockHandler(props.item)
    }

    return <div className={`${classes['stock-item']} color6`}>
        <div onClick={reduceClickHandler} className={`${classes.reduce} color1`}><MdOutlineExposureNeg1 /></div>
        <Link className="font-dark" to={getByIdRoute(Routes.STOCK_BY_ID, props.item.id)}>
            <span className={classes.id}>{props.item.id}</span>
            <div className={classes.data}>
                <span className={classes.category}>{props.item.categoryName}</span>
                <h3>{props.item.name}</h3>
                <span>
                    Menge: <span className={`${classes.amount} ${animate ? 'bump' : ''}`}><b>{props.item.stock} x {formatUnit(props.item.capacity, props.item.unit)}</b></span>
                </span>
                <span>
                    Gesamt: <span className={`${classes.amount} ${animate ? 'bump' : ''}`}><b>{formatUnit(props.item.abs, props.item.unit)}</b></span>
                </span>
            </div>
            <div className={classes.meta}>
                <span>Ablaufdatum: {new Date(props.item.durable).toLocaleDateString()}</span>
                <span>Zuletzt aktualisiert {new Date(props.item.dateModified).toLocaleDateString()}</span>
            </div>
        </Link>
        <div onClick={increaseClickHandler} className={`${classes.increase} color4`}><MdOutlineExposurePlus1 /></div>
    </div>
}

export default StockItem