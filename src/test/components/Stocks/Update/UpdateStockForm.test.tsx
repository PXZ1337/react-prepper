import { createMemoryHistory } from '@remix-run/router';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import UpdateStockForm from '../../../../components/Stocks/Update/UpdateStockForm';

describe('UpdateStockForm', () => {
    test('should display headline "Aktualisieren" instead of "Erstellen"', async () => {
        // Arrange
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <UpdateStockForm />
            </Router>
        );
        const headline = await screen.findByText('Aktualisieren');

        // Assert
        expect(headline).not.toBeNull();
    });
    test('should display button "Ändern" instead of "Erstellen"', async () => {
        // Arrange
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <UpdateStockForm />
            </Router>
        );
        const updateButton = await screen.findByText('ÄNDERN');

        // Assert
        expect(updateButton).not.toBeNull();
    });
});
