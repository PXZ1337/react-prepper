import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { formatPercent, formatRange } from '../../common/Format'
import { getByIdRoute, Routes } from '../../Router'
import GridItem from '../UI/GridItem'
import classes from './CategoryGridItem.module.css'

interface CategoryGridItemProps {
    id: string
    name: string
    stock: number
    goal: number
    unit: string
}

const CategoryGridItem = (props: CategoryGridItemProps) => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = useParams();

    const reached = props.stock / props.goal * 100

    let itemClass = classes.critical

    if (reached >= 75) {
        itemClass = classes.reached
    } else if (reached >= 30) {
        itemClass = classes.warning
    }

    const onClickHandler = (categoryId: string) => {
        const destinationPath = getByIdRoute(Routes.CATEGORY_BY_ID, categoryId)
        // Prevent re navigation by clicking at the GridItem link on category_id page
        if (location.pathname !== destinationPath) navigate(destinationPath, { state: { categoryId } })
    }

    return <GridItem onClickHandler={onClickHandler.bind(null, props.id)} classNames={[itemClass]}>
        <div className={classes.stock}>{formatRange(props.stock, props.goal, props.unit)}</div>
        <div className={classes.goal}>{formatPercent(reached)}</div>
        <div className={classes.category}>{props.name}</div>
    </GridItem>
}

export default CategoryGridItem