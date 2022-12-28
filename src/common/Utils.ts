import { ICategoryData, ISubCategoryDTO, ICategoryDTO } from './dto/CategoryDTOs';

export const groupBy = (list: any[], col: string): object => {
    if (list.length === 0) return list;

    return list.reduce((grouped, stock) => {
        !grouped[stock[col]] ? (grouped[stock[col]] = [stock]) : grouped[stock[col]].push(stock);
        return grouped;
    }, {});
};

export const extractMessageFromError = (e: any): string => {
    let message = 'unknown';

    if (typeof e === 'string') {
        message = e;
    } else if (e instanceof Error) {
        message = e.message;
    }

    return message;
};

export const sleep = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

export const calculateExpirationInDays = (durableDate: Date): number => {
    return Math.round((durableDate.valueOf() - new Date().valueOf()) / (1000 * 60 * 60 * 24));
};

export const calculateCategoryTree = (categoryData: ICategoryData) => {
    let subCategoryMap = new Map<number, ISubCategoryDTO[]>();
    categoryData.subCategories.forEach((subCategory) => {
        const collection = subCategoryMap.get(subCategory.parent);
        if (!collection) {
            subCategoryMap.set(subCategory.parent, [subCategory]);
        } else {
            collection.push(subCategory);
        }
    });

    return categoryData.categories.map((category: ICategoryDTO) => {
        let subCategories: ISubCategoryDTO[] = [];

        if (subCategoryMap.has(category.id)) {
            subCategories = subCategoryMap.get(category.id)!;
        }

        return {
            id: category.id,
            name: category.name,
            unit: category.unit,
            subCategories: subCategories.map((subCategory: ISubCategoryDTO) => {
                return subCategory;
            }),
        };
    });
};
