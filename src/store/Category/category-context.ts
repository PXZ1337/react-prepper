import React from 'react'
import { ICategoryData, ICategoryDTO } from '../../common/dto/CategoryDTOs'
import Unit from '../../common/Unit'
import { categoryIterableTypeHelp, categoryTreeTypeHelp, subCategoryIterableTypeHelp } from './CategoryAction'

const CategoryContext = React.createContext({
    categories: categoryIterableTypeHelp,
    subCategories: subCategoryIterableTypeHelp,
    categoryTree: categoryTreeTypeHelp,

    addCategory: (category: ICategoryDTO) => { },
    updateCategory: (category: ICategoryDTO) => { },
    removeCategory: (id: number) => { },

    getCategoryById: (id: number): ICategoryDTO => {
        return {
            id: 0,
            name: 'string',
            unit: Unit.G,
            goal: 0
        }
    },

    updateState: (categoryData: ICategoryData) => { }
})

export default CategoryContext