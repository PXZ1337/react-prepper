import { SyntheticEvent } from 'react';
import { MdOutlineExposureNeg1, MdOutlineExposurePlus1 } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import IStockDTO from '../../common/dto/StockDTOs';
import { formatUnit } from '../../common/Format';
import { calculateExpirationInDays } from '../../common/Utils';
import useAnimate from '../../hooks/use-animate';
import { getByIdRoute, Routes } from '../../Router';
import classes from './StockItem.module.css';

interface StockItemProps {
    item: IStockDTO;
    increaseStockHandler: (stockItem: IStockDTO) => void;
    reduceStockHandler: (stockItem: IStockDTO) => void;
}

const StockItem = (props: StockItemProps) => {
    const location = useLocation();
    const { animate, setAnimate } = useAnimate(props.item);

    let expirationInDays;

    if (props.item.durable) {
        expirationInDays = calculateExpirationInDays(new Date(props.item.durable));
    }

    const reduceClickHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        setAnimate(true);
        props.reduceStockHandler(props.item);
    };

    const increaseClickHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        setAnimate(true);
        props.increaseStockHandler(props.item);
    };

    return (
        <div className={`${classes['stock-item']} color6`}>
            <div data-testid="reduce" onClick={reduceClickHandler} className={`${classes.reduce} color1`}>
                <MdOutlineExposureNeg1 />
            </div>
            <Link className="font-dark" to={getByIdRoute(Routes.STOCK_BY_ID, props.item.id)} state={{ referer: location.pathname }}>
                <span className={classes.id}>{props.item.id}</span>
                <div className={classes.data}>
                    <span className={classes.category}>{props.item.categoryName}</span>
                    <h3>{props.item.name}</h3>
                    <span>
                        Menge:{' '}
                        <span className={`${classes.amount} ${animate ? 'bump' : ''}`}>
                            <b>
                                {props.item.stock} x {formatUnit(props.item.capacity, props.item.unit)}
                            </b>
                        </span>
                    </span>
                    <span>
                        Gesamt:{' '}
                        <span className={`${classes.amount} ${animate ? 'bump' : ''}`}>
                            <b>{formatUnit(props.item.abs, props.item.unit)}</b>
                        </span>
                    </span>
                </div>
                <div className={classes.meta}>
                    {props.item.durable && expirationInDays && (
                        <span>
                            <span>
                                Läuft ab in: <b className={expirationInDays < 30 ? 'font-color1' : ''}>{expirationInDays} Tage(n)</b>
                            </span>
                            Ablaufdatum: <b>{new Date(props.item.durable).toLocaleDateString()}</b>
                        </span>
                    )}
                    <span>
                        Aktualisiert: <b>{new Date(props.item.dateModified).toLocaleDateString()}</b>
                    </span>
                </div>
            </Link>
            <div data-testid="increase" onClick={increaseClickHandler} className={`${classes.increase} color4`}>
                <MdOutlineExposurePlus1 />
            </div>
        </div>
    );
};

export default StockItem;
