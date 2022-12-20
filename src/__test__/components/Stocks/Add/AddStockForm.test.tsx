import { createMemoryHistory } from '@remix-run/router';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import AddStockForm from '../../../../components/Stocks/Add/AddStockForm';

describe('AddStockFrom', () => {
    test('should display headline "Erstellen" instead of "Aktualisieren"', async () => {
        // Arrange
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <AddStockForm />
            </Router>
        );
        const headline = await screen.findByText('Erstellen');
        const caption = await screen.findByText('neuen Bestand hinzufügen');

        // Assert
        expect(headline).not.toBeNull();
        expect(caption).not.toBeNull();
    });
    test('should display button "Erstellen" instead of "Ändern"', async () => {
        // Arrange
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <AddStockForm />
            </Router>
        );
        const createButton = await screen.findByText('ERSTELLEN');

        // Assert
        expect(createButton).not.toBeNull();
    });
});
