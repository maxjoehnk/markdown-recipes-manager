import recipeReducer, {
    RecipeState,
    initialState as recipeInitialState
} from './recipe.reducer';

export interface AppState {
    recipe: RecipeState;
}

const initialState = {
    recipe: recipeInitialState
};

export default function rootReducer(
    state: AppState = initialState,
    action: any
): AppState {
    return {
        recipe: recipeReducer(state.recipe, action)
    };
}
