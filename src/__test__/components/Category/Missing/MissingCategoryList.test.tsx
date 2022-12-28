import { createMemoryHistory } from '@remix-run/router';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import MissingCategoryList from '../../../../components/Category/Missing/MissingCategoryList';
import { createCategoryTreeDTO, createStockDTO } from '../../../TestUtils';

describe('MissingCategoryList', () => {
    test('that component did not render when nothing is missing', () => {
        // Arrange
        const history = createMemoryHistory();
        const categoryTree = createCategoryTreeDTO();
        const stock1 = createStockDTO('ID_1', 'stock_1', 1, 1, 1, 1, 'Sub-Category_1', '1');
        const stock2 = createStockDTO('ID_2', 'stock_2', 1, 1, 1, 1, 'Sub-Category_2', '2');
        const stock3 = createStockDTO('ID_3', 'stock_3', 1, 1, 1, 1, 'Sub-Category_3', '3');
        const stock4 = createStockDTO('ID_4', 'stock_4', 1, 1, 1, 1, 'Sub-Category_4', '4');

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <MissingCategoryList categoryTree={categoryTree} stocks={[stock1, stock2, stock3, stock4]} />
            </Router>
        );

        // Assert
        expect(screen.queryByText('Achtung!')).not.toBeInTheDocument();
    });
    test('that one missing is rendered', () => {
        // Arrange
        const history = createMemoryHistory();
        const categoryTree = createCategoryTreeDTO();
        const stock1 = createStockDTO('ID_1', 'stock_1', 1, 1, 1, 1, 'Sub-Category_1', '1');
        const stock2 = createStockDTO('ID_2', 'stock_2', 1, 1, 1, 1, 'Sub-Category_2', '2');
        const stock3 = createStockDTO('ID_3', 'stock_3', 1, 1, 1, 1, 'Sub-Category_3', '3');

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <MissingCategoryList categoryTree={categoryTree} stocks={[stock1, stock2, stock3]} />
            </Router>
        );

        // Assert
        screen.getByText('Achtung!');
        screen.getByText(`1 von 4 Produkt-Kategorien fehlen`);
        screen.getByText(`Sub-Category_4 wurde(n) noch nicht erfasst.`);
    });
    test('that exact 2 missing are rendered', () => {
        // Arrange
        const history = createMemoryHistory();
        const categoryTree = createCategoryTreeDTO();
        const stock1 = createStockDTO('ID_1', 'stock_1', 1, 1, 1, 1, 'Sub-Category_1', '1');
        const stock2 = createStockDTO('ID_2', 'stock_2', 1, 1, 1, 1, 'Sub-Category_2', '2');

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <MissingCategoryList categoryTree={categoryTree} stocks={[stock1, stock2]} />
            </Router>
        );

        // Assert
        screen.getByText('Achtung!');
        screen.getByText(`2 von 4 Produkt-Kategorien fehlen`);
        screen.getByText(`Sub-Category_3 und Sub-Category_4 wurde(n) noch nicht erfasst.`);
    });
    test('that multiple are rendered', () => {
        // Arrange
        const history = createMemoryHistory();
        const categoryTree = createCategoryTreeDTO();
        const stock1 = createStockDTO('ID_1', 'stock_1', 1, 1, 1, 1, 'Sub-Category_1', '1');

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <MissingCategoryList categoryTree={categoryTree} stocks={[stock1]} />
            </Router>
        );

        // Assert
        screen.getByText('Achtung!');
        screen.getByText(`3 von 4 Produkt-Kategorien fehlen`);
        screen.getByText(`Sub-Category_2, Sub-Category_3 und Sub-Category_4 wurde(n) noch nicht erfasst.`);
    });
});
