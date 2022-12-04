import { Link } from "react-router-dom"
import { Routes } from "../../../Router"
import classes from './AddStockButton.module.css'

const AddStockButton = () => {
    return <div className={classes['add-stock-button']}>
        <p>
            <Link to={Routes.ADD_STOCK}>ADD NEW STOCK</Link>
        </p>
    </div>
}

export default AddStockButton