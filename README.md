# 🍹 Drink Finder App

**Last Updated:** 2025-07-02

---

## 📘 Overview

**Drink Finder** is a React-based cocktail exploration app that allows users to:

- 🔍 Search for cocktails by name or filter by ingredient.
- 📜 View detailed information about each drink.
- 🍸 Browse 5 random drink suggestions.
- 🕒 See your recent searches and quickly repeat them.

Data is sourced live from [TheCocktailDB](https://www.thecocktaildb.com/) API.

---

## 🧠 How It Works

### 🔁 Core Flow (App Logic)

- The app loads with two key tasks:
  1. Fetching the list of all drink ingredients (for dropdown filtering).
  2. Fetching 5 random drinks to populate the bottom carousel.
- State variables in the `App.js` component manage:
  - `drinks` — the results of the latest search.
  - `selectedDrink` — the drink selected for detailed view.
  - `randomDrinks` — five drinks shown at the bottom.
  - `ingredients` — for the dropdown selector.
  - `history` — up to 3 most recent search terms.

All state and logic live in `App.js`, and are passed as props to the child components.

---

## 🧩 Component Responsibilities

### `Logo.js`
- Displays a styled logo banner at the top.
- Includes a button that opens a modal with contact information:
  - LinkedIn, GitHub, and Email.
- Animated title and image hover-bounce.

---

### `SearchBarWithFilter.js`
- A styled input box and search button.
- Dropdown select of ingredients.
- On search or dropdown selection, triggers `onSearch(query)` passed from `App`.
- Uses emoji icons to label ingredients (e.g., 🥃 for alcohol, 🍊 for juices).

---

### `RecentSearches.js`
- Displays the 3 most recent non-empty search terms.
- Clicking any term re-triggers a new search.
- Automatically filters out duplicates.

---

### `DrinkList.js`
- Displays the list of drinks returned from the latest search.
- Sort buttons allow sorting by:
  - Name ↑↓
  - Date Modified ↑↓
- Each drink list item shows:
  - A circular thumbnail
  - Name, glass type, category, and modification date
- On click → calls `onSelect(drink.id)` → triggers drink detail fetch

---

### `DrinkDetails.js`
- Right-side panel view.
- Displays detailed information of the selected drink:
  - Drink image (opens in modal on click)
  - Instructions
  - Ingredients with measurement and matching icons
  - Glass icon and type
  - Date added
- If no drink is selected, a prompt is shown.

---

### `RandomDrinks.js`
- Displays 5 cards at the bottom of the page.
- Each card shows:
  - Image
  - Drink name
- Clicking a card opens a modal with the full image preview.

---

## 🛠️ API Layer (`api.js`)

All interaction with the external [TheCocktailDB API](https://www.thecocktaildb.com/) is centralized here:

- `getRandomDrink()` — fetches a random cocktail.
- `searchDrinksByName(name)` — searches cocktails by full or partial name.
- `getDrinkById(id)` — retrieves complete drink info.
- `getIngredientList()` — returns a list of ingredients for the dropdown.

---

## 🔄 Functional Flow Summary

1. **On Load**
   - Calls `getIngredientList` and fetches 5 drinks via `getRandomDrink`.

2. **Search Triggered**
   - `SearchBarWithFilter` or `RecentSearches` calls `App.handleSearch`.
   - `searchDrinksByName` hits the API.
   - Results go into `drinks`, and `selectedDrink` is reset.
   - `history` is updated with the new term (unless it's already present).

3. **Drink Selected**
   - `DrinkList` item is clicked.
   - Calls `App.handleSelectDrink(id)` → fetches full data via `getDrinkById`.
   - Full drink info displayed in `DrinkDetails`.

4. **Bottom Suggestions**
   - `RandomDrinks` always displays 5 cards.
   - Clicking a card opens an image modal with drink name.

---

## ✅ Optional Improvements

- Add a loading spinner during API requests.
- Show errors if API calls fail.
- Support favorites or "save drink" feature.
- Add pagination for search results.

---

## 📌 Technologies Used

- React.js (Functional components, hooks)
- React Bootstrap
- CocktailDB API
- HTML/CSS (with custom styling)

---

## ✨ Author Info

Built by Itay Vazana — [LinkedIn](https://www.linkedin.com/in/itayvazana) | [GitHub](https://github.com/ItayVazana1)

