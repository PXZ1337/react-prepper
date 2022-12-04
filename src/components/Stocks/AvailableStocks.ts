import { ICategory } from "../../common/Category"
import IStock from "../../common/Stock"
import Unit from "../../common/Unit"

const AvailableStocks = () => {
    const stocks: IStock[] = [
        {
            id: '1',
            name: 'Sixpack Wasser',
            stock: 1,
            capacity: 6,
            abs: 6,
            category: 'Drinks',
            unit: Unit.L,
            dateModified: new Date('2022-12-04'),
            durable: new Date('2024-12-04'),
        },
        {
            id: '1',
            name: 'Sixpack Wasser',
            stock: 1,
            capacity: 6,
            abs: 6,
            category: 'Drinks',
            unit: Unit.L,
            dateModified: new Date('2022-12-04'),
            durable: new Date('2024-12-04'),
        }, {
            id: '1',
            name: 'Sixpack Wasser',
            stock: 1,
            capacity: 6,
            abs: 6,
            category: 'Drinks',
            unit: Unit.L,
            dateModified: new Date('2022-12-04'),
            durable: new Date('2024-12-04'),
        }
    ]

    return stocks
}

export default AvailableStocks