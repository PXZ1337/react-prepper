
import { Fragment, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { updateStock } from '../../../api/stock'
import { ICategoryTree } from '../../../common/dto/CategoryDTOs'
import { IStockInputDTO } from '../../../common/dto/StockDTOs'
import { getByIdRoute, Routes } from '../../../Router'
import StockContext from '../../../store/Stock/stock-context'
import Headline, { HeadlineType } from '../../UI/Headline'
import StockForm from '../StockForm'

interface AddStockFormProps {
    categoryTree: ICategoryTree[]
}

const UpdateStockForm = (props: AddStockFormProps) => {
    const params: any = useParams()
    const navigate = useNavigate()
    const context = useContext(StockContext)

    const onSubmitHandler = async (stock: IStockInputDTO) => {
        if (params.id) {
            const updatedStock = await updateStock(params.id, stock)
            context.updateStock(updatedStock)
            navigate(getByIdRoute(Routes.CATEGORY_BY_ID, stock.parentCategoryId.toString()))
        }
    }

    const stock = context.getStockById(params.id)

    return <Fragment>
        <Headline type={HeadlineType.PRIMARY} caption={`"${stock.name}" bearbeiten`}>Aktualisieren</Headline>
        <StockForm onSubmitHandler={onSubmitHandler} categoryTree={props.categoryTree} stock={stock} />
    </Fragment>
}

export default UpdateStockForm