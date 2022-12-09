import Unit from "../Unit"

const ValidUnit = (value: string) => {
    console.log(value)
    return value in Unit
}

export default ValidUnit