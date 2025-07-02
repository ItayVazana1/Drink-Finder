import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "./components/Logo";
import SearchBarWithFilter from "./components/SearchBarWithFilter";
import RecentSearches from "./components/RecentSearches";
import DrinkList from "./components/DrinkList";
import DrinkDetails from "./components/DrinkDetails";
import RandomDrinks from "./components/RandomDrinks";
import {
    getRandomDrink,
    searchDrinksByName,
    getDrinkById,
    getIngredientList,
} from "./utils/api";

/**
 * Main application component.
 * Handles app state and data flow between all UI components.
 */
const App = () => {
    const [drinks, setDrinks] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [history, setHistory] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [randomDrinks, setRandomDrinks] = useState([]);

    // Load ingredient list and random drinks on first mount
    useEffect(() => {
        getIngredientList().then(setIngredients);
        fetchRandomDrinks();
    }, []);

    // Fetch 5 random drinks for the bottom section
    const fetchRandomDrinks = async () => {
        const list = [];
        for (let i = 0; i < 5; i++) {
            const drink = await getRandomDrink();
            if (drink) list.push(drink);
        }
        setRandomDrinks(list);
    };

    // Handle user search by name or ingredient
    const handleSearch = async (query) => {
        if (!query || query.trim() === "") return;
        const results = await searchDrinksByName(query);
        setDrinks(results);
        setSelectedDrink(null);

        if (query && !history.includes(query)) {
            setHistory([query, ...history.slice(0, 2)]); // keep only last 3
        }
    };

    // Handle selection of a drink from the list
    const handleSelectDrink = async (id) => {
        const drink = await getDrinkById(id);
        setSelectedDrink(drink);
    };

    return (
        <Container className="py-3">
            {/* Top logo */}
            <Row className="mb-3">
                <Col>
                    <Logo />
                </Col>
            </Row>

            {/* Search bar with ingredient filter */}
            <Row className="mb-3">
                <Col>
                    <SearchBarWithFilter onSearch={handleSearch} ingredients={ingredients} />
                </Col>
            </Row>

            {/* Recent searches badges */}
            <Row className="mb-4">
                <Col>
                    <RecentSearches history={history} onSearch={handleSearch} />
                </Col>
            </Row>

            {/* Search results list and drink details */}
            <Row>
                <Col md={6}>
                    <DrinkList drinks={drinks} onSelect={handleSelectDrink} />
                </Col>
                <Col md={6}>
                    <DrinkDetails drink={selectedDrink} />
                </Col>
            </Row>

            {/* Random suggestions at the bottom */}
            <Row className="mt-5">
                <Col>
                    <RandomDrinks drinks={randomDrinks} />
                </Col>
            </Row>
        </Container>
    );
};

export default App;
