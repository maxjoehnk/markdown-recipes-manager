import { CategoryEntity } from '../contracts/entities/category.entity';
import * as cache from '../cache';
import { Category } from '../contracts/viewmodels/category';

export function all(): CategoryEntity[] {
    return cache.fetchCategories();
}

export function byId(id: string): CategoryEntity | undefined {
    const categories = cache.fetchCategories();

    return categories.find(c => c.id === id);
}
