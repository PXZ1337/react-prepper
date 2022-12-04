import { formatPercent, formatRange } from '../../common/Format'
import GridItem from '../UI/GridItem'
import classes from './CategoryGridItem.module.css'

interface CategoryGridItemProps {
    name: string
    stock: number
    goal: number
    unit: string
}

const CategoryGridItem = (props: CategoryGridItemProps) => {
    const reached = props.stock / props.goal * 100

    let itemClass = classes.critical

    if (reached >= 75) {
        itemClass = classes.reached
    } else if (reached >= 30) {
        itemClass = classes.warning
    }

    return <GridItem classNames={[itemClass]} className={itemClass}>
        <div className={classes.stock}>{formatRange(props.stock, props.goal, props.unit)}</div>
        <div className={classes.goal}>{formatPercent(reached)}</div>
        <div className={classes.category}>{props.name}</div>
    </GridItem>
}

export default CategoryGridItem