import { categoryConstants } from "../actions/constants";

const initialState = {
    loading: false,
    categories: [],
    error: null,
    message: ''
}

const buildNewCategories = (categories, category) => {
    let newCategories = [];
    if (category.parentId === undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                parentId: category.parentId,
                name: category.name,
                slug: category.slug,
                children: [],
                categoryImage: category.categoryImage
            }
        ]
    }
    for (let cat of categories) {
        if (cat._id === category.parentId) {
            newCategories.push({
                ...cat,
                children: (cat.children) ? buildNewCategories([...cat.children, {
                    _id: category._id,
                    parentId: category.parentId,
                    name: category.name,
                    slug: category.slug,
                    children: [],
                    categoryImage: category.categoryImage
                }], category) : []
            })
        }
        else {
            newCategories.push({
                ...cat,
                children: (cat.children) ? buildNewCategories(cat.children, category) : []
            })
        }

    }
    return newCategories;
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            let category = action.payload.category;
            const updatedCategories = buildNewCategories(state.categories, category);
            console.log(updatedCategories);
            state = {
                ...state,
                loading: false,
                message: 'New Category Created Successfully with name: ' + category.name,
                categories: updatedCategories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}

export default categoryReducer;