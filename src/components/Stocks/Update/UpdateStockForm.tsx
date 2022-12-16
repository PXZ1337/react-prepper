
import { Fragment, useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateStock } from '../../../api/stock'
import { IStockInputDTO } from '../../../common/dto/StockDTOs'
import StockContext from '../../../store/Stock/stock-context'
import Headline, { HeadlineType } from '../../UI/Headline'
import StockForm from '../StockForm'

const UpdateStockForm = () => {
    const params: any = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const stockContext = useContext(StockContext)

    const onSubmitHandler = async (stock: IStockInputDTO) => {
        if (params.id) {
            const updatedStock = await updateStock(params.id, stock)
            stockContext.updateStock(updatedStock)
            navigate(location.state.referer)
        }
    }

    const stock = stockContext.getStockById(params.id)

    return <Fragment>
        <Headline type={HeadlineType.PRIMARY} caption={`"${stock.name}" bearbeiten`}>Aktualisieren</Headline>
        <StockForm onSubmitHandler={onSubmitHandler} initialValue={stock} />
    </Fragment>
}

export default UpdateStockForm