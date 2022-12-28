import { Fragment, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createStock } from '../../../api/stock';
import { IStockInputDTO } from '../../../common/dto/StockDTOs';
import CategoryContext from '../../../store/Category/category-context';
import StockContext from '../../../store/Stock/stock-context';
import Headline, { HeadlineType } from '../../UI/Misc/Headline';
import StockForm from '../StockForm';

const AddStockForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const stockContext = useContext(StockContext);
    const categoryContext = useContext(CategoryContext);

    const categoryTree =
        location.state && location.state.categoryId != null
            ? categoryContext.filterTreeByCategory(location.state.categoryId)
            : categoryContext.categoryTree;

    const initialFormValues = {
        name: '',
        stock: 1,
        capacity: 1,
        abs: 0,
        parentCategoryId: 0,
        categoryName: '',
        categoryId: '0',
        unit: '',
        dateModified: '',
    };

    const onSubmitHandler = async (stock: IStockInputDTO) => {
        const newStock = await createStock(stock);
        stockContext.addStock(newStock);
        navigate(location.state.referer);
    };

    return (
        <Fragment>
            <Headline type={HeadlineType.PRIMARY} caption="neuen Bestand hinzufügen">
                Erstellen
            </Headline>
            <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} categoryTree={categoryTree} create={true} />
        </Fragment>
    );
};

export default AddStockForm;
