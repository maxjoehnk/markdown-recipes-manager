import { CategoryEntity } from './contracts/entities/category.entity';

export interface RecipeCache {
    categories: Map<string, CategoryEntity>;
}

const cache: RecipeCache = {
    categories: new Map()
};

export function updateCategories(categories: CategoryEntity[]) {
    cache.categories.clear();
    for (const category of categories) {
        cache.categories.set(category.id, category);
    }
}

export function fetchCategories(): CategoryEntity[] {
    return [...cache.categories.values()];
}
