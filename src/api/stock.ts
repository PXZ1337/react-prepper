import config from '../common/config'
import IStockDTO, { IStockInputDTO } from '../common/dto/StockDTOs'
import fetchRequest, { addRequest } from '../common/Request'

export const createStock = async (stock: IStockInputDTO): Promise<IStockDTO> => {
    const data = await addRequest(`${config.backendBaseUrl}/stocks.json`, {
        method: 'POST',
        body: JSON.stringify(stock)
    })

    if (!data.name) {
        throw Error(`Error while creating stock "${stock.name}"`)
    }

    return {
        id: data.name,
        ...stock
    }
}

export const updateStock = async (id: string, stock: IStockInputDTO): Promise<IStockDTO> => {
    const data = await addRequest(`${config.backendBaseUrl}/stocks.json`, {
        method: 'PATCH',
        body: JSON.stringify({
            [id]: stock
        })
    })

    if (!data[id]) {
        throw Error(`Error while updating stock "${stock.name}"`)
    }

    return {
        id,
        ...data[id]
    }
}

export const fetchStocks = async (): Promise<IStockDTO[]> => {
    const stocks: IStockDTO[] = []
    const stockResult = await fetchRequest(`${config.backendBaseUrl}/stocks.json`)

    if (!stockResult) {
        return stocks
    }

    Object.keys(stockResult).forEach((stockId: string) => {
        const stock = stockResult[stockId]
        stocks.push({
            id: stockId,
            ...stock
        })
    })

    return stocks
}

export const fetchStockById = async (id: string): Promise<IStockDTO> => {
    const stock = await fetchRequest(`${config.backendBaseUrl}/stocks/${id}.json`)
    if (!stock) {
        throw Error(`Stock with id: "${id}" not found!`)
    }
    return {
        id,
        ...stock
    }
}