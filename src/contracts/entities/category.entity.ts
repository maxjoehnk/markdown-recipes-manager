import { RecipeEntity } from './recipe.entity';

export interface CategoryEntity {
    id: string;
    title: string;
    recipes: RecipeEntity[];
}
