import { Recipe } from '../../contracts/viewmodels/recipe';

export interface RecipeState {
    current?: Recipe;
    open: boolean;
}

export const initialState: RecipeState = {
    current: undefined,
    open: false
};

export default function recipeReducer(
    state: RecipeState = initialState,
    action: any
) {
    switch (action.type) {
        default:
            return state;
    }
}
