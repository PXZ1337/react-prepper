import { Link } from "react-router-dom"
import { Routes } from "../../../Router"
import classes from './AddStockButton.module.css'

const AddStockButton = () => {
    return <div className={classes['add-stock-button']}>
        <Link to={Routes.ADD_STOCK}>ADD NEW STOCK</Link>
    </div>
}

export default AddStockButton