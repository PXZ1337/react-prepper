export const groupBy = (list: any[], col: string) => {
    if (list.length === 0) return list

    return list.reduce((grouped, stock) => {
        !grouped[stock[col]] ? grouped[stock[col]] = [stock] : grouped[stock[col]].push(stock)
        return grouped
    }, {})
}

export const sleep = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}