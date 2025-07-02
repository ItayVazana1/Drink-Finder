const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

/**
 * Fetches a single random drink from the API.
 * @returns {Promise<Object|null>} A drink object or null if not found.
 */
export async function getRandomDrink() {
    const res = await fetch(`${BASE_URL}random.php`);
    const data = await res.json();
    return data.drinks ? data.drinks[0] : null;
}

/**
 * Searches for drinks by full or partial name.
 * @param {string} name - The search query.
 * @returns {Promise<Array>} Array of drink objects, or empty array if none found.
 */
export async function searchDrinksByName(name) {
    const res = await fetch(`${BASE_URL}search.php?s=${name}`);
    const data = await res.json();
    return data.drinks || [];
}

/**
 * Fetches full details of a drink by its ID.
 * @param {string} id - The drink's unique ID.
 * @returns {Promise<Object|null>} A drink object or null if not found.
 */
export async function getDrinkById(id) {
    const res = await fetch(`${BASE_URL}lookup.php?i=${id}`);
    const data = await res.json();
    return data.drinks ? data.drinks[0] : null;
}

/**
 * Retrieves the full list of ingredients from the API.
 * @returns {Promise<Array<string>>} List of ingredient names.
 */
export async function getIngredientList() {
    const res = await fetch(`${BASE_URL}list.php?i=list`);
    const data = await res.json();
    return data.drinks.map(item => item.strIngredient1);
}
