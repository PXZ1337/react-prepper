import { Fragment, useContext, useEffect, useState } from 'react';
import { ICategoryTreeNode, ISubCategoryDTO } from '../../../common/dto/CategoryDTOs';
import NotEmpty from '../../../common/validation/NotEmpty';
import StockContext from '../../../store/Stock/stock-context';
import ButtonCard from '../../UI/Card/ButtonCard';
import GridCointainer from '../../UI/Container/GridContainer';
import Button, { ButtonType } from '../../UI/Control/Button';
import SubCategoryInput from './SubCategoryInput';

interface SubCategoryFormProps {
    parentCategoryId: number;
    subCategories: ICategoryTreeNode[];
    onAddedHandler: (added: ISubCategoryDTO) => void;
    onUpdatedHandler: (updated: ISubCategoryDTO) => void;
    onDeletedHandler: (categoryId: string, tempCategory: boolean) => void;
    onFormStateChanged: (isValid: boolean) => void;
}

const SubCategoryForm = (props: SubCategoryFormProps) => {
    const { parentCategoryId, subCategories, onAddedHandler, onUpdatedHandler, onDeletedHandler, onFormStateChanged } = props;

    const stockContext = useContext(StockContext);

    const subCategoryListData = subCategories.map((treeNode: ICategoryTreeNode) => {
        return {
            id: treeNode.id,
            name: treeNode.name,
            parent: parentCategoryId,
        };
    });

    const [subCategoryList, setSubCategoryList] = useState(subCategoryListData);

    useEffect(() => {
        const emptyFound = subCategoryList.findIndex((category: ISubCategoryDTO) => !NotEmpty(category.name));
        const formState = !!(emptyFound === -1);

        onFormStateChanged(formState);
    }, [subCategoryList, onFormStateChanged]);

    const onCategoryAddedHandler = () => {
        const lastId = subCategoryList[subCategoryList.length - 1].id;
        const tempId = lastId.startsWith('temp_', 0) ? `temp_${+lastId.split('_')[1] + 1}` : 'temp_1';

        setSubCategoryList((prevState) => [...prevState, { id: tempId, name: '', parent: parentCategoryId }]);
    };

    const onCategoryUpdatedHandler = (categoryId: string, value: string) => {
        const index = subCategoryList.findIndex((category: ISubCategoryDTO) => category.id === categoryId);

        if (index !== -1) {
            const categories = [...subCategoryList];
            const category = categories[index];
            categories[index] = { ...categories[index], name: value };

            setSubCategoryList(categories);

            if (!category.id.startsWith('temp_', 0)) {
                onUpdatedHandler({ id: categoryId, name: value, parent: parentCategoryId });
            } else {
                onAddedHandler({ id: categoryId, name: value, parent: parentCategoryId });
            }
        }
    };

    const onCategoryRemovedHandler = (categoryId: string) => {
        const index = subCategoryList.findIndex((category: ISubCategoryDTO) => category.id === categoryId);
        const categories = [...subCategoryList];

        if (index !== -1) {
            categories.splice(index, 1);
            setSubCategoryList(categories);
        }

        onDeletedHandler(categoryId, categoryId.startsWith('temp_', 0));
    };

    return (
        <Fragment>
            <GridCointainer>
                {subCategoryList.map((category: ISubCategoryDTO) => {
                    return (
                        <SubCategoryInput
                            key={category.id}
                            id={category.id}
                            initialValue={category.name}
                            placeholder="Kategorie-Name"
                            stockCount={stockContext.getStocksBySubCategoryId(category.id).length}
                            onChangedHandler={onCategoryUpdatedHandler}
                            onRemovedHandler={onCategoryRemovedHandler}
                        />
                    );
                })}
            </GridCointainer>
            <ButtonCard>
                <Button onClickHandler={onCategoryAddedHandler} buttonType={ButtonType.PRIMARY}>
                    Kategorie hinzufügen
                </Button>
            </ButtonCard>
        </Fragment>
    );
};

export default SubCategoryForm;
