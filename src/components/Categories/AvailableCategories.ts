import { ICategory } from "../../common/Category"
import Unit from "../../common/Unit"
import CategoryGridItem from "./CategoryGridItem"

const AvailableCategories = () => {
    const categories: ICategory[] = [
        {
            id: 'drinks',
            name: 'Drinks',
            description: '',
            unit: Unit.L,
            goal: 20
        },
        {
            id: 'cereales',
            name: 'Cereales',
            description: 'Cereales, bread, potatoes, pasta, rice',
            unit: Unit.G,
            goal: 3500
        },
        {
            id: 'vegetables',
            name: 'Vegetables',
            description: 'Vegetables and legumes',
            unit: Unit.G,
            goal: 4000
        },
        {
            id: 'fruits',
            name: 'fruits and oats',
            description: 'Vegetables and legumes',
            unit: Unit.G,
            goal: 2500
        },
        {
            id: 'milk',
            name: 'Milk and milkproducts',
            description: 'Vegetables and legumes',
            unit: Unit.G,
            goal: 2600
        },
        {
            id: 'fish',
            name: 'Fish and meat',
            description: 'Fish, meat eggs or full egg pouder',
            unit: Unit.G,
            goal: 1500
        },
        {
            id: 'fats',
            name: 'Fats and oils',
            description: 'Fish, meat eggs or full egg pouder',
            unit: Unit.G,
            goal: 375
        },
        {
            id: 'others',
            name: 'Others',
            description: 'Sugar, honey, jam, chocolate, salt, prepared food (f.e. dried tortelini. ravioli or soups), potato mash, instant broth, cacao pouder or salt stick',
            unit: Unit.G,
            goal: 1500
        },
        {
            id: 'medicine-chest',
            name: 'Medicine chest',
            description: 'Medical kit, medicaments, painkiller, sanitizer (skin, wound), medicine for colt, thermometer',
            unit: Unit.ITEMS,
            goal: 10
        },
        {
            id: 'sanitary',
            name: 'Sanitary',
            description: 'Soap, toothbrush, toothpaste, disposable table wear, toiletpaper, bin liner, gloves',
            unit: Unit.ITEMS,
            goal: 9
        },
        {
            id: 'energy-loss',
            name: 'Energy loss',
            description: 'Candles, ligther, flashlight, batteries, gas cooker, heating device',
            unit: Unit.ITEMS,
            goal: 7
        },
        {
            id: 'broadcast',
            name: 'Broadcast',
            description: 'Battery radio',
            unit: Unit.ITEMS,
            goal: 7
        },
    ]

    return categories
}

export default AvailableCategories