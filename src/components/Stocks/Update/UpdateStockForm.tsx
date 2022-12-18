import { Fragment, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateStock } from '../../../api/stock';
import { IStockInputDTO } from '../../../common/dto/StockDTOs';
import CategoryContext from '../../../store/Category/category-context';
import StockContext from '../../../store/Stock/stock-context';
import Headline, { HeadlineType } from '../../UI/Misc/Headline';
import StockForm from '../StockForm';

const UpdateStockForm = () => {
    const params: any = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const stockContext = useContext(StockContext);
    const categoryContext = useContext(CategoryContext);

    const stock = stockContext.getStockById(params.id);
    const categoryTree = categoryContext.filterTreeByCategory(stock.parentCategoryId);

    const onSubmitHandler = async (stock: IStockInputDTO) => {
        if (params.id) {
            const updatedStock = await updateStock(params.id, stock);
            stockContext.updateStock(updatedStock);
            navigate(location.state.referer);
        }
    };

    return (
        <Fragment>
            <Headline type={HeadlineType.PRIMARY} caption={`"${stock.name}" bearbeiten`}>
                Aktualisieren
            </Headline>
            <StockForm onSubmitHandler={onSubmitHandler} initialValue={stock} categoryTree={categoryTree} />
        </Fragment>
    );
};

export default UpdateStockForm;
