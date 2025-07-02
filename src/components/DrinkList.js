import React, { useState } from "react";
import { ListGroup, Image, ButtonGroup, Button } from "react-bootstrap";

/**
 * Displays a scrollable, sortable list of drink search results.
 * Allows sorting by name or modification date.
 * Each item is clickable to trigger detailed view.
 */
const DrinkList = ({ drinks, onSelect }) => {
    const [sortBy, setSortBy] = useState("name");
    const [order, setOrder] = useState("asc");

    if (!drinks || drinks.length === 0) {
        return <div>No drinks found.</div>;
    }

    // Maps glass type to appropriate icon
    const getGlassIcon = (glass) => {
        const g = glass.toLowerCase();
        if (g.includes("cocktail")) return "🍸";
        if (g.includes("highball")) return "🥃";
        if (g.includes("mug")) return "🍺";
        if (g.includes("wine")) return "🍷";
        if (g.includes("shot")) return "🥃";
        if (g.includes("champagne")) return "🍾";
        return "🍹";
    };

    // Sorts drinks based on selected criteria
    const sortedDrinks = [...drinks].sort((a, b) => {
        if (sortBy === "name") {
            const nameA = a.strDrink.toLowerCase();
            const nameB = b.strDrink.toLowerCase();
            return order === "asc"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        } else if (sortBy === "date") {
            const dateA = new Date(a.dateModified || 0);
            const dateB = new Date(b.dateModified || 0);
            return order === "asc" ? dateA - dateB : dateB - dateA;
        }
        return 0;
    });

    return (
        <div>
            {/* Sorting buttons */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <strong className="ms-2">Sort By:</strong>
                <ButtonGroup size="sm">
                    <Button
                        variant={sortBy === "name" && order === "asc" ? "dark" : "outline-dark"}
                        onClick={() => {
                            setSortBy("name");
                            setOrder("asc");
                        }}
                    >
                        Name ↑
                    </Button>
                    <Button
                        variant={sortBy === "name" && order === "desc" ? "dark" : "outline-dark"}
                        onClick={() => {
                            setSortBy("name");
                            setOrder("desc");
                        }}
                    >
                        Name ↓
                    </Button>
                    <Button
                        variant={sortBy === "date" && order === "asc" ? "dark" : "outline-dark"}
                        onClick={() => {
                            setSortBy("date");
                            setOrder("asc");
                        }}
                    >
                        Date ↑
                    </Button>
                    <Button
                        variant={sortBy === "date" && order === "desc" ? "dark" : "outline-dark"}
                        onClick={() => {
                            setSortBy("date");
                            setOrder("desc");
                        }}
                    >
                        Date ↓
                    </Button>
                </ButtonGroup>
            </div>

            {/* List of sorted drinks */}
            <div
                style={{
                    maxHeight: "500px",
                    overflowY: "auto",
                    paddingRight: "6px",
                    borderRadius: "10px",
                    backgroundColor: "#f7f9fa",
                    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                }}
            >
                <ListGroup variant="flush">
                    {sortedDrinks.map((drink) => {
                        const date = drink.dateModified ? new Date(drink.dateModified) : null;
                        const dateStr = date ? date.toLocaleDateString("en-GB") : "N/A";

                        return (
                            <ListGroup.Item
                                key={drink.idDrink}
                                action
                                onClick={() => onSelect(drink.idDrink)}
                                className="d-flex align-items-center justify-content-start gap-3 py-2"
                                style={{ transition: "background-color 0.2s" }}
                            >
                                <Image
                                    src={drink.strDrinkThumb}
                                    roundedCircle
                                    width={50}
                                    height={50}
                                    style={{ border: "2px solid #e0f7f4" }}
                                />
                                <div className="text-start">
                                    <div className="fw-bold">{drink.strDrink}</div>
                                    <small className="text-muted">
                                        {getGlassIcon(drink.strGlass)} {drink.strGlass} | {drink.strCategory}
                                    </small>
                                    <br />
                                    <small className="text-secondary">📅 {dateStr}</small>
                                </div>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </div>
        </div>
    );
};

export default DrinkList;
