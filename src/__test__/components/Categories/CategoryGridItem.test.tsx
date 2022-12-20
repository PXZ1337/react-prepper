import { createMemoryHistory } from '@remix-run/router';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Unit from '../../../common/Unit';
import CategoryGridItem from '../../../components/Categories/CategoryGridItem';
import { createCategoryDTO } from '../../TestUtils';

describe('CategoryGridItem', () => {
    test('should render category with unit "G" in "KG"', () => {
        // Arrangef
        const history = createMemoryHistory();
        const category = createCategoryDTO(1, 'category_1', Unit.G, 3000);
        const stock = Math.round(Math.random() * category.goal);
        const reached = Math.round((stock / category.goal) * 100);

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <CategoryGridItem id={category.id} name={category.name} stock={stock} goal={category.goal} unit={category.unit} />
            </Router>
        );

        // Assert
        screen.getByText(`${(stock / 1000).toFixed(2)} / ${(category.goal / 1000).toFixed(2)}KG`);
        screen.getByText(`${reached}%`);
        screen.getByText(category.name);
    });
    test('should render category with unit "L"', () => {
        // Arrangef
        const history = createMemoryHistory();
        const category = createCategoryDTO(1, 'category_1', Unit.L, 5);
        const stock = Math.round(Math.random() * category.goal);
        const reached = Math.round((stock / category.goal) * 100);

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <CategoryGridItem id={category.id} name={category.name} stock={stock} goal={category.goal} unit={category.unit} />
            </Router>
        );

        // Assert
        screen.getByText(`${stock} / ${category.goal}L`);
        screen.getByText(`${reached}%`);
        screen.getByText(category.name);
    });
    test('should render category with unit "items" in "Stück"', () => {
        // Arrangef
        const history = createMemoryHistory();
        const category = createCategoryDTO(1, 'category_1', Unit.items, 10);
        const stock = Math.round(Math.random() * category.goal);
        const reached = Math.round((stock / category.goal) * 100);

        // Act
        render(
            <Router location={history.location} navigator={history}>
                <CategoryGridItem id={category.id} name={category.name} stock={stock} goal={category.goal} unit={category.unit} />
            </Router>
        );

        // Assert
        screen.getByText(`${stock} / ${category.goal} Stück`);
        screen.getByText(`${reached}%`);
        screen.getByText(category.name);
    });
});
