import {
    GiBattery75,
    GiFireplace,
    GiFruitBowl,
    GiFruitTree,
    GiGymBag,
    GiMeat,
    GiMedicines,
    GiMilkCarton,
    GiOilDrum,
    GiPotato,
    GiSittingDog,
    GiVirus,
    GiWaterBottle,
} from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatPercent, formatUnit } from '../../common/Format';
import { getByIdRoute, Routes } from '../../Router';
import GridItem from '../UI/Container/Item/GridItem';
import classes from './CategoryGridItem.module.css';

interface CategoryGridItemProps {
    id: number;
    name: string;
    stock: number;
    goal: number;
    unit: string;
}

const CategoryGridItem = (props: CategoryGridItemProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    let reached = (props.stock / props.goal) * 100;
    let itemClass = 'color1';
    let key = props.id;

    if (reached >= 75) {
        itemClass = 'color4';
    } else if (reached >= 30) {
        itemClass = 'color3';
    }

    const icons = [
        <GiMeat />,
        <GiWaterBottle />,
        <GiPotato />,
        <GiFruitTree />,
        <GiFruitBowl />,
        <GiMilkCarton />,
        <GiMeat />,
        <GiOilDrum />,
        <GiMedicines />,
        <GiVirus />,
        <GiBattery75 />,
        <GiSittingDog />,
        <GiFireplace />,
        <GiGymBag />,
    ];

    const onClickHandler = (categoryId: string) => {
        const destinationPath = getByIdRoute(Routes.CATEGORY_BY_ID, categoryId);
        // Prevent re navigation by clicking at the GridItem link on category_id page
        if (location.pathname !== destinationPath) navigate(destinationPath, { state: { categoryId } });
    };

    return (
        <GridItem onClickHandler={onClickHandler.bind(null, props.id.toString())} classNames={[classes['category-grid-item'], itemClass]}>
            <div className={classes.stock}>
                {formatUnit(props.stock, props.unit, false)} / {formatUnit(props.goal, props.unit)}
            </div>
            <div className={classes.goal}>{formatPercent(reached)}</div>
            <div className={classes.category}>{props.name}</div>
            <div className={classes.icon}>{icons[key]}</div>
        </GridItem>
    );
};

export default CategoryGridItem;
