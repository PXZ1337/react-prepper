export const formatPercent = (value: number) => {
    return `${value.toFixed()}%`
}

export const formatRange = (value: number, goal: number, unit: string) => {
    return `${value} / ${goal} ${unit}`
}