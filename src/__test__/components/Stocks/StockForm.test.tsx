import { createMemoryHistory } from '@remix-run/router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { ICategoryTree } from '../../../common/dto/CategoryDTOs';
import { IStockInputDTO } from '../../../common/dto/StockDTOs';
import Unit from '../../../common/Unit';
import StockForm from '../../../components/Stocks/StockForm';

describe('StockForm', () => {
    describe('Validation', () => {
        test('"Bezeichnung"', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const initialFormValues = createInitialFormValues();
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} categoryTree={[]} />
                </Router>
            );
            const name = await screen.getByLabelText('Bezeichnung');
            const stock = await screen.getByLabelText('Bestand');

            // Act
            userEvent.click(name);
            userEvent.click(stock);

            // Assert
            await screen.getByText('Bitte einen gültigen Wert für "Bezeichnung" eingeben.');
        });

        test('"Kategorie"', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const initialFormValues = createInitialFormValues();
            const categoryTree = createCategoryTreeSelection();
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} categoryTree={[categoryTree]} />
                </Router>
            );

            const categorySelect = await screen.getByLabelText('Kategorie');

            // Act
            userEvent.selectOptions(categorySelect, '0__0');

            // Assert
            expect(categorySelect.classList.contains('invalid-form-field')).toBe(true);
        });
        test('"Bestand"', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const initialFormValues = createInitialFormValues(0);

            render(
                <Router location={history.location} navigator={history}>
                    <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} categoryTree={[]} />
                </Router>
            );

            const stock = await screen.getByLabelText('Bestand');
            const capacity = await screen.getByLabelText('Kapazität');

            // Act
            userEvent.click(stock);
            userEvent.click(capacity);

            // Assert
            await screen.getByText('Bitte einen gültigen Wert für "Bestand" eingeben.');
        });
        test('"Kapazität"', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const initialFormValues = createInitialFormValues(1, 0);
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} categoryTree={[]} />
                </Router>
            );

            const capacity = await screen.getByLabelText('Kapazität');
            const overallCapacity = await screen.getByPlaceholderText('Gesamtkapazität');

            // Act
            userEvent.click(capacity);
            userEvent.click(overallCapacity);

            // Assert
            await screen.getByText('Bitte einen gültigen Wert für "Kapazität" eingeben.');
        });
        test('"Gesamtkapazität" if "Bestand" is invalid', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const initialFormValues = createInitialFormValues(0);
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} categoryTree={[]} />
                </Router>
            );
            const stock = await screen.getByLabelText('Bestand');
            const overall = await screen.getByLabelText('Gesamt');

            // Act
            userEvent.click(stock);
            userEvent.click(overall);

            // Assert
            expect(overall.classList.contains('invalid-form-field')).toBe(true);
        });
        test('"Gesamtkapazität" if "Kapazität" is invalid', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const initialFormValues = createInitialFormValues(1, 0);
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} categoryTree={[]} />
                </Router>
            );
            const capacity = await screen.getByLabelText('Kapazität');
            const overall = await screen.getByLabelText('Gesamt');

            // Act
            userEvent.click(capacity);
            userEvent.click(overall);

            // Assert
            expect(overall.classList.contains('invalid-form-field')).toBe(true);
        });
    });
    describe('CalculateOverallCapacity', () => {
        test('integer caluclation should work', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const initialFormValues = createInitialFormValues(15, 10);
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} categoryTree={[]} />
                </Router>
            );
            const stock = await screen.getByLabelText('Bestand');
            const capacity = await screen.getByLabelText('Kapazität');

            // Act
            userEvent.click(stock);
            userEvent.click(capacity);

            // Assert
            expect(screen.getByDisplayValue('150.00')).toBeInTheDocument();
            expect(screen.getByLabelText('Gesamt').classList.contains('invalid-form-field')).toBe(false);
        });
        test('float caluclation should work', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const initialFormValues = createInitialFormValues(15, 0.01);
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} categoryTree={[]} />
                </Router>
            );
            const stock = await screen.getByLabelText('Bestand');
            const capacity = await screen.getByLabelText('Kapazität');

            // Act
            userEvent.click(stock);
            userEvent.click(capacity);

            // Assert
            expect(screen.getByDisplayValue('0.15')).toBeInTheDocument();
            expect(screen.getByLabelText('Gesamt').classList.contains('invalid-form-field')).toBe(false);
        });
        test('negative values should not work', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const initialFormValues = createInitialFormValues(-15, -0.01);
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} categoryTree={[]} />
                </Router>
            );
            const stock = await screen.getByLabelText('Bestand');
            const capacity = await screen.getByLabelText('Kapazität');
            const overall = await screen.getByLabelText('Gesamt');

            // Act
            userEvent.click(stock);
            userEvent.click(capacity);
            userEvent.click(overall);

            // Assert
            expect(screen.getByDisplayValue('0.15')).toBeInTheDocument();
            expect(stock.classList.contains('invalid-form-field')).toBe(true);
            expect(capacity.classList.contains('invalid-form-field')).toBe(true);
            expect(overall.classList.contains('invalid-form-field')).toBe(true);
        });
    });
    describe('FormState', () => {
        test('"Erstellen" button should be disabled initially', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const initialFormValues = createInitialFormValues();
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} categoryTree={[]} create={true} />
                </Router>
            );
            const createButton = await screen.getByText('ERSTELLEN');

            // Act

            // Assert
            expect(createButton).toBeDisabled();
        });
        test('"Erstellen" button should be enabled if form state is valid', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const validFormValues = createValidFormValues();
            const categoryTree = createCategoryTreeSelection();
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm
                        onSubmitHandler={onSubmitHandler}
                        initialValue={validFormValues}
                        categoryTree={[categoryTree]}
                        create={true}
                    />
                </Router>
            );
            const createButton = await screen.getByText('ERSTELLEN');
            const category = await screen.getByLabelText('Kategorie');

            // Act
            userEvent.selectOptions(category, '1__0');

            // Assert
            expect(createButton).not.toBeDisabled();
        });
        test('should not submit the form when "Abbrechen" is clicked', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const initialFormValues = createInitialFormValues();
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm onSubmitHandler={onSubmitHandler} initialValue={initialFormValues} categoryTree={[]} create={true} />
                </Router>
            );

            const cancelButton = await screen.getByText('ABBRECHEN');

            // Act
            userEvent.click(cancelButton);

            // Assert
            expect(onSubmitHandler).toBeCalledTimes(0);
        });
    });
    describe('Create', () => {
        test('onSubmit should call the handler function', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const validFormValues = createValidFormValues();
            const categoryTree = createCategoryTreeSelection();
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm
                        onSubmitHandler={onSubmitHandler}
                        initialValue={validFormValues}
                        categoryTree={[categoryTree]}
                        create={true}
                    />
                </Router>
            );

            const createButton = await screen.getByText('ERSTELLEN');
            const category = await screen.getByLabelText('Kategorie');

            // Act
            userEvent.selectOptions(category, '1__0');
            userEvent.click(createButton);

            // Assert
            expect(createButton).not.toBeDisabled();
            expect(onSubmitHandler).toBeCalledTimes(1);
        });
    });
    describe('Update', () => {
        test('onSubmit should call the handler function', async () => {
            // Arrange
            const history = createMemoryHistory();
            const onSubmitHandler = jest.fn();
            const validFormValues = createValidFormValues();
            const categoryTree = createCategoryTreeSelection();
            render(
                <Router location={history.location} navigator={history}>
                    <StockForm onSubmitHandler={onSubmitHandler} initialValue={validFormValues} categoryTree={[categoryTree]} />
                </Router>
            );

            const updateButton = await screen.getByText('ÄNDERN');
            const category = await screen.getByLabelText('Kategorie');

            // Act
            userEvent.selectOptions(category, '1__0');
            userEvent.click(updateButton);

            // Assert
            expect(updateButton).not.toBeDisabled();
            expect(onSubmitHandler).toBeCalledTimes(1);
        });
    });
});

const createValidFormValues = (): IStockInputDTO => {
    return {
        name: 'test',
        stock: 10,
        capacity: 5,
        abs: 50,
        parentCategoryId: 1,
        categoryName: 'Test-Category',
        categoryId: '0',
        unit: Unit.G,
        dateModified: new Date().toLocaleDateString(),
    };
};

const createCategoryTreeSelection = (): ICategoryTree => {
    return {
        id: 1,
        name: 'Test-Parent-Category',
        unit: Unit.G,
        subCategories: [
            {
                id: '0',
                name: 'Test-Category',
            },
        ],
    };
};

const createInitialFormValues = (stock: number = 1, capacity: number = 1): IStockInputDTO => {
    return {
        name: '',
        stock,
        capacity,
        abs: 0,
        parentCategoryId: 0,
        categoryName: '',
        categoryId: '0',
        unit: '',
        dateModified: '',
    };
};
