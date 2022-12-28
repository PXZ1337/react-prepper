import { createMemoryHistory } from '@remix-run/router';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import IStockDTO from '../../../common/dto/StockDTOs';
import Unit from '../../../common/Unit';
import { calculateExpirationInDays } from '../../../common/Utils';
import StockList from '../../../components/Stocks/StockList';
import { createStockDTO } from '../../TestUtils';

describe('StockList', () => {
    test('should show no stocks message when empty items', () => {
        // Arrangef
        const history = createMemoryHistory();

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <StockList items={[]} />
            </Router>
        );

        // Assert
        screen.getByText('Kein Inventar gefunden!');
    });
    test("should render stock and it's information", async () => {
        // Arrange
        const history = createMemoryHistory();
        const dateModified = new Date();
        const durable = new Date();
        durable.setDate(durable.getDate() + 365);

        const stock1 = createStockDTO(
            'ID_1',
            'stock_1',
            1,
            1,
            1,
            0,
            'Test-Category_1',
            '0',
            Unit.G,
            dateModified.toISOString(),
            durable.toISOString()
        );
        const stock2 = createStockDTO('ID_2', 'stock_2', 1, 1, 1, 0, 'Test-Category_2', '0', Unit.G, dateModified.toISOString());
        const stockItems = [stock1, stock2];
        // Act
        render(
            <Router location={history.location} navigator={history}>
                <StockList items={stockItems} />
            </Router>
        );

        // Assert
        stockItems.forEach((stock: IStockDTO) => {
            screen.getByText(stock.name);
            screen.getByText(stock.id);
            screen.getByText(stock.categoryName);
        });

        screen.getByText(`${calculateExpirationInDays(durable)} Tage(n)`);
        expect(await screen.findAllByText('Aktualisiert:')).toHaveLength(stockItems.length);
        expect(await screen.findAllByText(`${dateModified.toLocaleDateString()}`)).toHaveLength(stockItems.length);
        expect(await screen.findAllByText('Ablaufdatum:')).toHaveLength(1);
        expect(await screen.findAllByText(`${durable.toLocaleDateString()}`)).toHaveLength(1);
    });
    test('should display "Menge" and "Gesamt" correctly formatted', () => {
        // Arrange
        const history = createMemoryHistory();
        const stock1 = createStockDTO('ID_1', 'stock_1', 10, 40, 400, 0, 'Test-Category_1', '0', Unit.G, new Date().toISOString());
        const stock2 = createStockDTO('ID_2', 'stock_2', 10, 60, 600, 0, 'Test-Category_2', '0', Unit.G, new Date().toISOString());
        const stockItems = [stock1, stock2];

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <StockList items={stockItems} />
            </Router>
        );

        // Assert
        stockItems.forEach((stock: IStockDTO) => {
            screen.getByText(`${stock.stock} x ${(stock.capacity / 1000).toFixed(2)}KG`);
            screen.getByText(`${(stock.abs / 1000).toFixed(2)}KG`);
        });
        expect(screen.getAllByText('Menge:')).toHaveLength(stockItems.length);
        expect(screen.getAllByText('Gesamt:')).toHaveLength(stockItems.length);
    });
    test('should hide "Ablaufdatum" and "Läuft ab in" when nothing was set', async () => {
        // Arrange
        const history = createMemoryHistory();
        const stock1 = createStockDTO('ID_1', 'stock_1', 10, 40, 400, 0, 'Test-Category_1', '0', Unit.G, new Date().toISOString());
        const stock2 = createStockDTO('ID_2', 'stock_2', 10, 60, 600, 0, 'Test-Category_2', '0', Unit.G, new Date().toISOString());
        const stockItems = [stock1, stock2];

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <StockList items={stockItems} />
            </Router>
        );

        // Assert
        expect(await screen.queryByText('Ablaufdatum:')).not.toBeInTheDocument();
    });
});
