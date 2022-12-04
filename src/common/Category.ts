import Unit from "./Unit"

export interface ICategory {
    id: string
    name: string
    description: string
    unit: Unit
    goal: number
}