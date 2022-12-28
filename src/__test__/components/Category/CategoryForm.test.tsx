import { createMemoryHistory } from '@remix-run/router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import CategoryForm, { CategoryUpdateEventData } from '../../../components/Category/CategoryForm';
import { createCategoryDTO, createCategoryTreeDTO } from '../../TestUtils';

describe('CategoryForm', () => {
    test('that submit button triggers the submitHandler', () => {
        // Arrange
        const history = createMemoryHistory();
        const onSubmitHandler = jest.fn();
        const category = createCategoryDTO();

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <CategoryForm onSubmitHandler={onSubmitHandler} initialValue={category} subCategories={[]} />
            </Router>
        );
        const submitButton = screen.getByText('ÄNDERN');
        userEvent.click(submitButton);

        // Assert
        expect(onSubmitHandler).toBeCalledTimes(1);
    });
    test('that categoryForm is initially valid', () => {
        // Arrange
        const history = createMemoryHistory();
        const category = createCategoryDTO();

        const onSubmitHandler = jest.fn();

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <CategoryForm onSubmitHandler={onSubmitHandler} initialValue={category} subCategories={[]} />
            </Router>
        );

        // Assert
        expect(screen.getByText('ÄNDERN')).not.toBeDisabled();
    });
    describe('SubCategoryForm', () => {
        test('that subCategoryForm is rendered as expected', () => {
            // Arrange
            const history = createMemoryHistory();
            const category = createCategoryDTO();
            const categoryTree = createCategoryTreeDTO();

            const onSubmitHandler = jest.fn();

            // Act
            render(
                <Router location={history.location} navigator={history}>
                    <CategoryForm onSubmitHandler={onSubmitHandler} initialValue={category} subCategories={categoryTree.subCategories} />
                </Router>
            );

            // Assert
            screen.getByText('Unter-Kategorien');
            categoryTree.subCategories.forEach((category) => {
                screen.getByDisplayValue(category.name);
            });
            expect(screen.getAllByText('Bestand: 0')).toHaveLength(categoryTree.subCategories.length);
            expect(screen.getAllByTestId('remove-category')).toHaveLength(categoryTree.subCategories.length);
        });
        test('that sub_category is validated and submit button disabled', () => {
            // Arrange
            const history = createMemoryHistory();
            const category = createCategoryDTO();
            const categoryTree = createCategoryTreeDTO();

            const onSubmitHandler = jest.fn();

            // Act
            render(
                <Router location={history.location} navigator={history}>
                    <CategoryForm onSubmitHandler={onSubmitHandler} initialValue={category} subCategories={categoryTree.subCategories} />
                </Router>
            );

            const categoryInput = screen.getByDisplayValue('Sub-Category_1');
            userEvent.type(categoryInput, ' ');

            // Assert
            screen.getByText('Bitte einen gültigen Wert für "Name" eingeben.');
            expect(screen.getByText('ÄNDERN')).toBeDisabled();
        });
        test('that sub_category is added', () => {
            // Arrange
            const history = createMemoryHistory();
            const category = createCategoryDTO();
            const categoryTree = createCategoryTreeDTO();
            const newCategoryName = 'New-Sub-Category';

            const onSubmitHandler = jest.fn((updateEventData: CategoryUpdateEventData) => {});

            // Act
            render(
                <Router location={history.location} navigator={history}>
                    <CategoryForm onSubmitHandler={onSubmitHandler} initialValue={category} subCategories={categoryTree.subCategories} />
                </Router>
            );

            const addButton = screen.getByText('Kategorie hinzufügen');
            const submitButton = screen.getByText('ÄNDERN');

            userEvent.click(addButton);
            const categoryInputs = screen.getAllByPlaceholderText('Kategorie-Name');
            userEvent.type(categoryInputs[categoryTree.subCategories.length], newCategoryName);
            userEvent.click(submitButton);

            // Assert
            expect(submitButton).not.toBeDisabled();
            expect(onSubmitHandler).toBeCalledTimes(1);
            expect(onSubmitHandler.mock.calls[0][0]).toStrictEqual({
                categoryInputDTO: {
                    goal: category.goal,
                    name: category.name,
                    unit: category.unit,
                },
                addedSubCategoryDTOs: [
                    {
                        name: newCategoryName,
                        parent: category.id,
                    },
                ],
                updatedSubCategoryDTOs: [],
                deletedSubCategoryIds: [],
            });
        });
        test('that sub_category is updated', () => {
            // Arrange
            const history = createMemoryHistory();
            const category = createCategoryDTO();
            const categoryTree = createCategoryTreeDTO();
            const updatedCategoryName1 = 'Sub-Category_1-UPDATED';
            const updatedCategoryName2 = 'Sub-Category_2-UPDATED';

            const onSubmitHandler = jest.fn((updateEventData: CategoryUpdateEventData) => {});

            // Act
            render(
                <Router location={history.location} navigator={history}>
                    <CategoryForm onSubmitHandler={onSubmitHandler} initialValue={category} subCategories={categoryTree.subCategories} />
                </Router>
            );

            const submitButton = screen.getByText('ÄNDERN');
            const category1 = screen.getByDisplayValue('Sub-Category_1');
            const category2 = screen.getByDisplayValue('Sub-Category_2');

            userEvent.type(category1, updatedCategoryName1);
            userEvent.type(category2, updatedCategoryName2);
            userEvent.click(submitButton);

            // Assert
            expect(submitButton).not.toBeDisabled();
            expect(onSubmitHandler).toBeCalledTimes(1);
            expect(onSubmitHandler.mock.calls[0][0]).toStrictEqual({
                categoryInputDTO: {
                    goal: category.goal,
                    name: category.name,
                    unit: category.unit,
                },
                addedSubCategoryDTOs: [],
                updatedSubCategoryDTOs: [
                    {
                        id: categoryTree.subCategories[0].id,
                        name: updatedCategoryName1,
                        parent: category.id,
                    },
                    {
                        id: categoryTree.subCategories[1].id,
                        name: updatedCategoryName2,
                        parent: category.id,
                    },
                ],
                deletedSubCategoryIds: [],
            });
        });
        test('that sub_category is deleted', () => {
            // Arrange
            const history = createMemoryHistory();
            const category = createCategoryDTO();
            const categoryTree = createCategoryTreeDTO();

            const onSubmitHandler = jest.fn((updateEventData: CategoryUpdateEventData) => {});
            window.confirm = jest.fn(() => true);

            // Act
            render(
                <Router location={history.location} navigator={history}>
                    <CategoryForm onSubmitHandler={onSubmitHandler} initialValue={category} subCategories={categoryTree.subCategories} />
                </Router>
            );
            const deleteCategoryButtons = screen.getAllByTestId('remove-category');
            const submitButton = screen.getByText('ÄNDERN');

            userEvent.click(deleteCategoryButtons[0]);
            userEvent.click(submitButton);

            // Assert
            expect(window.confirm).toBeCalled();
            expect(screen.queryByDisplayValue('Sub-Category_1')).not.toBeInTheDocument();
            expect(onSubmitHandler).toBeCalledTimes(1);
            expect(onSubmitHandler.mock.calls[0][0]).toStrictEqual({
                categoryInputDTO: {
                    goal: category.goal,
                    name: category.name,
                    unit: category.unit,
                },
                addedSubCategoryDTOs: [],
                updatedSubCategoryDTOs: [],
                deletedSubCategoryIds: [categoryTree.subCategories[0].id],
            });
        });
    });
});
