import { createMemoryHistory } from '@remix-run/router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import Unit from '../../../common/Unit';
import StockItem from '../../../components/Stocks/StockItem';
import { createStockDTO } from '../../TestUtils';

describe('StockItem', () => {
    test('should trigger increase when "+1" is clicked', () => {
        // Arrange
        const history = createMemoryHistory();
        const increaseHandler = jest.fn();
        const reduceHandler = jest.fn();
        const stock = createStockDTO('ID_1', 'stock_1', 1, 1, 1, 0, 'Test-Category_1', 0, Unit.G, new Date().toISOString());

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <StockItem item={stock} increaseStockHandler={increaseHandler} reduceStockHandler={reduceHandler} />
            </Router>
        );
        userEvent.click(screen.getByTestId('increase'));

        // Assert
        expect(increaseHandler).toBeCalledTimes(1);
        expect(reduceHandler).not.toBeCalled();
    });
    test('should trigger reduce when "-1" is clicked', () => {
        // Arrange
        const history = createMemoryHistory();
        const increaseHandler = jest.fn();
        const reduceHandler = jest.fn();
        const stock = createStockDTO('ID_1', 'stock_1', 1, 1, 1, 0, 'Test-Category_1', 0, Unit.G, new Date().toISOString());

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <StockItem item={stock} increaseStockHandler={increaseHandler} reduceStockHandler={reduceHandler} />
            </Router>
        );
        userEvent.click(screen.getByTestId('reduce'));

        // Assert
        expect(increaseHandler).not.toBeCalled();
        expect(reduceHandler).toBeCalledTimes(1);
    });
});
