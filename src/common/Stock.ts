interface IStock {
    id: string,
    name: string,
    stock: number,
    capacity: number,
    abs: number,
    category: string,
    unit: string,
    dateModified: Date,
    durable: Date,
}

export default IStock