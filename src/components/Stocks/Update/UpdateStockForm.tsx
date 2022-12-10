
import { Fragment, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateStock } from '../../../api/stock'
import { IStockInputDTO } from '../../../common/dto/StockDTOs'
import { getByIdRoute, Routes } from '../../../Router'
import StockContext from '../../../store/Stock/stock-context'
import Headline, { HeadlineType } from '../../UI/Headline'
import StockForm from '../StockForm'

const UpdateStockForm = () => {
    const params: any = useParams()
    const navigate = useNavigate()

    const stockContext = useContext(StockContext)

    const onSubmitHandler = async (stock: IStockInputDTO) => {
        if (params.id) {
            const updatedStock = await updateStock(params.id, stock)
            stockContext.updateStock(updatedStock)
            navigate(getByIdRoute(Routes.CATEGORY_BY_ID, stock.parentCategoryId.toString()))
        }
    }

    const stock = stockContext.getStockById(params.id)

    return <Fragment>
        <Headline type={HeadlineType.PRIMARY} caption={`"${stock.name}" bearbeiten`}>Aktualisieren</Headline>
        <StockForm onSubmitHandler={onSubmitHandler} initialValue={stock} />
    </Fragment>
}

export default UpdateStockForm