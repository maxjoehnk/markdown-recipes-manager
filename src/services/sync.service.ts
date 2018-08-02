import { clone, pull } from 'isomorphic-git';
import * as fs from 'fs';
import { promisify } from 'util';
import { CategoryEntity } from '../contracts/entities/category.entity';
import * as cache from '../cache';
import { join } from 'path';
import {
    REPOSITORY_URL,
    REPOSITORY_DIRECTORY,
    REPOSITORY_USERNAME,
    REPOSITORY_TOKEN
} from '../config';

const readdir = promisify(fs.readdir);
const exists = promisify(fs.exists);

const SYNC_INTERVAL = 1 * 60 * 1000;

export default async function syncService() {
    try {
        if (!(await isSetup())) {
            await setup();
        }
        await update();
        const categories = await readRecipes();
        cache.updateCategories(categories);
    } catch (err) {
        console.error(err);
    }
    setTimeout(syncService, SYNC_INTERVAL);
}

async function setup() {
    await clone({
        fs,
        dir: REPOSITORY_DIRECTORY,
        url: REPOSITORY_URL,
        username: REPOSITORY_USERNAME,
        token: REPOSITORY_TOKEN,
        singleBranch: true,
        depth: 1
    });
}

async function update() {
    await pull({
        fs,
        dir: REPOSITORY_DIRECTORY,
        username: REPOSITORY_USERNAME,
        token: REPOSITORY_TOKEN,
        singleBranch: true
    });
}

async function readRecipes(): Promise<CategoryEntity[]> {
    const categories = await readdir(REPOSITORY_DIRECTORY);

    const categoryJobs = categories
        .filter((name: string) => !name.startsWith('.'))
        .map(async (categoryName: string) => {
            const title = categoryName;
            const id = title.replace(' ', '-').toLowerCase();
            const recipes = await readdir(
                join(REPOSITORY_DIRECTORY, categoryName)
            );

            return {
                id,
                title,
                recipes: recipes.map(recipeName => ({
                    title: recipeName.replace('.md', '')
                }))
            };
        });

    return await Promise.all(categoryJobs);
}

async function isSetup(): Promise<boolean> {
    const dirExists = await exists(REPOSITORY_DIRECTORY);

    if (!dirExists) {
        return false;
    }

    const isGitDirectory = await exists(join(REPOSITORY_DIRECTORY, '.git'));

    if (!isGitDirectory) {
        return false;
    }

    return true;
}
