import { useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { createStock } from "../../../api/stock"
import { IStockInputDTO } from "../../../common/dto/StockDTOs"
import { getByIdRoute, Routes } from "../../../Router"
import StockContext from "../../../store/Stock/stock-context"
import StockForm from "../StockForm"

const AddStockForm = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const stockContext = useContext(StockContext)

    const initialFormValues = {
        name: '',
        stock: 1,
        capacity: 1,
        abs: 0,
        parentCategoryId: 0,
        categoryName: '',
        categoryId: 0,
        unit: '',
        dateModified: ''
    }

    const onSubmitHandler = async (stock: IStockInputDTO) => {
        const newStock = await createStock(stock)
        stockContext.addStock(newStock)
        navigate(location.state.referer)
    }

    return <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} />
}

export default AddStockForm