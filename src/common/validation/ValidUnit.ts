import Unit from "../Unit"

const ValidUnit = (value: string) => {
    return value in Unit
}

export default ValidUnit