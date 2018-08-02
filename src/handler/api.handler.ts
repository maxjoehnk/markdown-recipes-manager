import { Category } from '../contracts/viewmodels/category';
import { all } from '../repositories/categories.repository';

export function listCategories(): Category[] {
    const categories = all();

    return categories.map(c => ({
        id: c.id,
        title: c.title,
        recipes: c.recipes.map(r => r.title)
    }));
}
