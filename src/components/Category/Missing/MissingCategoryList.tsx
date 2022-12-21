import { Fragment } from 'react';
import { ICategoryTree, ICategoryTreeNode } from '../../../common/dto/CategoryDTOs';
import IStockDTO from '../../../common/dto/StockDTOs';
import { groupBy } from '../../../common/Utils';
import Headline, { HeadlineType } from '../../UI/Misc/Headline';
import Text from '../../UI/Misc/Text';
import classes from './MissingCategoryList.module.css';

interface MissingCategoryListProps {
    categoryTree: ICategoryTree;
    stocks: IStockDTO[];
}

const MissingCategoryList = (props: MissingCategoryListProps) => {
    let missingCategorySentence = '% wurde(n) noch nicht erfasst.';

    const categoryStockMap = groupBy(props.stocks, 'categoryId');
    const missingCategories = props.categoryTree.subCategories
        .filter((category: ICategoryTreeNode) => !categoryStockMap.hasOwnProperty(category.id))
        .map((category: ICategoryTreeNode) => category.name);

    const missingCategoryCount = missingCategories.length;

    if (missingCategories.length === 0) {
        return <Fragment></Fragment>;
    } else if (missingCategories.length < 2) {
        missingCategorySentence = missingCategorySentence.replace('%', missingCategories.join(' und '));
    } else {
        const lastElement = missingCategories.splice(missingCategories.length - 1, 1);
        missingCategorySentence = missingCategorySentence.replace('%', `${missingCategories.join(', ')} und ${lastElement}`);
    }

    return (
        <div className={classes['missing-category-container']}>
            <Headline
                type={HeadlineType.SECONDARY}
                caption={`${missingCategoryCount} von ${props.categoryTree.subCategories.length} Produkt-Kategorien fehlen`}
            >
                Achtung!
            </Headline>
            <Text>{missingCategorySentence}</Text>
        </div>
    );
};

export default MissingCategoryList;
