import config from '../common/config';
import { ICategoryDTO, ICategoryInputDTO, ISubCategoryCreateDTO, ISubCategoryDTO } from '../common/dto/CategoryDTOs';
import fetchRequest, { addRequest } from '../common/Request';

export const updateCategory = async (id: string, category: ICategoryInputDTO): Promise<ICategoryDTO> => {
    const data = await addRequest(`${config.backendBaseUrl}/categories.json`, {
        method: 'PATCH',
        body: JSON.stringify({
            [id]: category,
        }),
    });

    if (!data[id]) {
        throw Error(`Error while updating category "${category.name}"`);
    }

    return {
        id: +id,
        ...data[id],
    };
};

export const createSubCategory = async (category: ISubCategoryCreateDTO): Promise<ISubCategoryDTO> => {
    const data = await addRequest(`${config.backendBaseUrl}/sub_categories.json`, {
        method: 'POST',
        body: JSON.stringify(category),
    });

    if (!data.name) {
        throw Error(`Error while creating sub_category "${category.name}"`);
    }

    return {
        id: data.name,
        ...category,
    };
};

export const updateSubCategory = async (id: string, category: ISubCategoryDTO): Promise<ISubCategoryDTO> => {
    const data = await addRequest(`${config.backendBaseUrl}/sub_categories.json`, {
        method: 'PATCH',
        body: JSON.stringify({
            [id]: category,
        }),
    });

    if (!data[id]) {
        throw Error(`Error while updating sub_category "${category.name}"`);
    }

    return {
        id: +id,
        ...data[id],
    };
};

export const deleteSubCategory = async (id: string): Promise<boolean> => {
    return await addRequest(`${config.backendBaseUrl}/sub_categories/${id}.json`, {
        method: 'DELETE',
    });
};

export const fetchCategoryData = async () => {
    const categories: ICategoryDTO[] = await fetchCategories();
    const subCategories: ISubCategoryDTO[] = await fetchSubCategories();

    return {
        categories,
        subCategories,
    };
};

export const fetchCategories = async (): Promise<ICategoryDTO[]> => {
    let categories: ICategoryDTO[] = await fetchRequest(`${config.backendBaseUrl}/categories.json`, (category: object, id: number) => {
        return {
            id,
            ...category,
        };
    });

    // Remove root element
    categories.splice(0, 1);

    return categories;
};

export const fetchSubCategories = async (): Promise<ISubCategoryDTO[]> => {
    const categories: ISubCategoryDTO[] = [];
    const categoryResult = await fetchRequest(`${config.backendBaseUrl}/sub_categories.json`);
    if (!categoryResult) {
        return categories;
    }

    Object.keys(categoryResult).forEach((categoryId: string) => {
        const category = categoryResult[categoryId];
        categories.push({
            ...category,
            id: `${categoryId}`,
        });
    });

    return categories;
};
