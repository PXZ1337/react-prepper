import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { createStock } from "../../../api/stock"
import { IStockInputDTO } from "../../../common/dto/StockDTOs"
import { getByIdRoute, Routes } from "../../../Router"
import StockContext from "../../../store/Stock/stock-context"
import StockForm from "../StockForm"

const AddStockForm = () => {
    const navigte = useNavigate()

    const stockContext = useContext(StockContext)

    const now = new Date()
    const future = new Date(`${now.getFullYear() + 1}-${now.getMonth() + 1}-01`)

    const initialFormValues = {
        name: '',
        stock: 1,
        capacity: 1,
        abs: 0,
        parentCategoryId: 0,
        categoryName: '',
        categoryId: 0,
        unit: '',
        dateModified: '',
        durable: future.toISOString().substring(0, 10)
    }

    const onSubmitHandler = async (stock: IStockInputDTO) => {
        const newStock = await createStock(stock)
        stockContext.addStock(newStock)
        navigte(getByIdRoute(Routes.CATEGORY_BY_ID, stock.parentCategoryId.toString()))
    }

    return <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} />
}

export default AddStockForm