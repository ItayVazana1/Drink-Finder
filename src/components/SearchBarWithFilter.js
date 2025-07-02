import React, { useState } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";

/**
 * Search bar with text input and dropdown filter for ingredients.
 * Triggers `onSearch` with either a query or selected ingredient.
 */
const SearchBarWithFilter = ({ onSearch, ingredients }) => {
    const [query, setQuery] = useState("");
    const [selectedIngredient, setSelectedIngredient] = useState("");

    // Handle form submit (text search)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setQuery("");
        }
    };

    // Handle dropdown selection (ingredient filter)
    const handleIngredientSelect = (value) => {
        setSelectedIngredient(value);
        onSearch(value);
    };

    // Assign emoji icon based on ingredient keyword
    const getIconForIngredient = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes("rum") || lower.includes("vodka") || lower.includes("whiskey")) return "🥃";
        if (lower.includes("juice") || lower.includes("lime") || lower.includes("orange")) return "🍊";
        if (lower.includes("mint")) return "🌿";
        if (lower.includes("ice")) return "🧊";
        if (lower.includes("syrup")) return "🍯";
        if (lower.includes("milk") || lower.includes("cream")) return "🥛";
        return "🍹";
    };

    return (
        <Form onSubmit={handleSubmit} className="text-center">
            {/* Search input and button */}
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search for a drink..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{
                                borderTopLeftRadius: "20px",
                                borderBottomLeftRadius: "20px",
                                padding: "10px 15px",
                                fontSize: "1rem",
                                border: "1px solid #ccc",
                            }}
                        />
                        <Button
                            type="submit"
                            style={{
                                backgroundColor: "#2b2b2b",
                                color: "#fff",
                                fontWeight: "bold",
                                border: "none",
                                borderTopRightRadius: "20px",
                                borderBottomRightRadius: "20px",
                                padding: "10px 20px",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#ff7f50";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#2b2b2b";
                            }}
                        >
                            🔍 Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            {/* Ingredient filter dropdown */}
            <Row className="justify-content-center mt-3">
                <Col xs={12} md={6}>
                    <Form.Select
                        value={selectedIngredient}
                        onChange={(e) => handleIngredientSelect(e.target.value)}
                        style={{
                            borderRadius: "20px",
                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.05)",
                            textAlign: "center",
                            padding: "10px",
                            fontSize: "1rem",
                            marginTop: "10px",
                        }}
                    >
                        <option value="">🍸 Filter by ingredient</option>
                        {ingredients.map((item, index) => (
                            <option key={index} value={item}>
                                {getIconForIngredient(item)} {item}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchBarWithFilter;
