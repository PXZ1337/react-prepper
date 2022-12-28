import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSubCategory, deleteSubCategory, updateCategory, updateSubCategory } from '../../../api/category';
import { ISubCategoryCreateDTO, ISubCategoryDTO } from '../../../common/dto/CategoryDTOs';
import CategoryForm, { CategoryUpdateEventData } from '../../../components/Category/CategoryForm';
import Container from '../../../components/UI/Container/Container';
import Headline, { HeadlineType } from '../../../components/UI/Misc/Headline';
import { getByIdRoute, Routes } from '../../../Router';
import CategoryContext from '../../../store/Category/category-context';

const UpdateCategoryPage = () => {
    const navigate = useNavigate();
    const params: any = useParams();
    const categoryContext = useContext(CategoryContext);

    const category = categoryContext.getCategoryById(+params.id);
    const subCategories = categoryContext.filterTreeByCategory(category.id);

    const onSubmitHandler = async (eventData: CategoryUpdateEventData) => {
        if (params.id) {
            // Add
            const addedSubCategories: ISubCategoryDTO[] = [];
            eventData.addedSubCategoryDTOs.forEach(async (subCategory: ISubCategoryCreateDTO) => {
                addedSubCategories.push(await createSubCategory(subCategory));
            });

            // Update
            const updatedSubCategories: ISubCategoryDTO[] = [];
            eventData.updatedSubCategoryDTOs.forEach(async (subCategory: ISubCategoryDTO) => {
                updatedSubCategories.push(await updateSubCategory(subCategory.id.toString(), subCategory));
            });

            //
            eventData.deletedSubCategoryIds.forEach(async (categoryId: string) => {
                await deleteSubCategory(categoryId);
            });

            const updatedCategory = await updateCategory(params.id, eventData.categoryInputDTO);

            // Update Application State
            categoryContext.updateCategory({
                categoryData: updatedCategory,
                addedSubCategories,
                updatedSubCategories,
                deletedSubCategories: eventData.deletedSubCategoryIds,
            });
            navigate(getByIdRoute(Routes.CATEGORY_BY_ID, params.id));
        }
    };
    return (
        <Container>
            <Headline type={HeadlineType.PRIMARY} caption={`"${category.name}" bearbeiten`}>
                Aktualisieren
            </Headline>
            <CategoryForm onSubmitHandler={onSubmitHandler} initialValue={category} subCategories={subCategories[0].subCategories} />
        </Container>
    );
};

export default UpdateCategoryPage;
