import { createMemoryHistory } from '@remix-run/router';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import CategoryList from '../../../components/Category/CategoryList';

describe('CategoryList', () => {
    test('should show no categories message when empty items', () => {
        // Arrangef
        const history = createMemoryHistory();

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <CategoryList items={[]} />
            </Router>
        );

        // Assert
        screen.getByText('Keine Kategorien gefunden!');
    });
});
