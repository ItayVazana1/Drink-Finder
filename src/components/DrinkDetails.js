import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";

/**
 * Displays detailed information about a selected drink.
 * Shows image, name, instructions, ingredients (with icons), and glass type.
 */
const DrinkDetails = ({ drink }) => {
    const [showModal, setShowModal] = useState(false);

    // Fallback view when no drink is selected
    if (!drink) return <div>Select a drink to see details.</div>;

    // Ingredient icon mappings
    const iconMap = {
        rum: "🥃",
        vodka: "🥃",
        gin: "🍸",
        tequila: "🌵",
        whiskey: "🥃",
        triple: "🍊",
        liqueur: "🍷",
        juice: "🍍",
        orange: "🍊",
        lime: "🍋",
        lemon: "🍋",
        strawberry: "🍓",
        mint: "🌿",
        ice: "🧊",
        syrup: "🍯",
        sugar: "🍬",
        milk: "🥛",
        cream: "🥛",
        coconut: "🥥",
        soda: "🥤",
    };

    // Glass type icon mappings
    const iconMapGlass = {
        martini: "🍸",
        highball: "🥃",
        cocktail: "🍹",
        shot: "🥃",
        mug: "🍺",
        wine: "🍷",
        hurricane: "🌪️",
        champagne: "🥂",
        old: "🧊",
    };

    // Returns an icon based on ingredient keyword
    const getIconFor = (ingredient) => {
        const lower = ingredient.toLowerCase();
        for (const keyword in iconMap) {
            if (lower.includes(keyword)) return iconMap[keyword];
        }
        return "🍹";
    };

    // Returns an icon based on glass type keyword
    const getGlassIcon = (glass) => {
        const lower = glass.toLowerCase();
        for (const keyword in iconMapGlass) {
            if (lower.includes(keyword)) return iconMapGlass[keyword];
        }
        return "🥃";
    };

    // Build the ingredients list with icons and measurements
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ing = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ing) {
            ingredients.push({
                text: `${measure || ""} ${ing}`.trim(),
                icon: getIconFor(ing),
            });
        }
    }

    // Format drink creation date
    const createdAt = drink.dateModified
        ? new Date(drink.dateModified)
        : new Date();
    const createdStr = createdAt.toLocaleDateString("en-GB");

    const glassIcon = getGlassIcon(drink.strGlass);

    return (
        <>
            <Card className="text-center">
                <Card.Body>
                    <img
                        src={drink.strDrinkThumb}
                        alt={drink.strDrink}
                        onClick={() => setShowModal(true)}
                        style={{
                            maxHeight: "240px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            marginBottom: "1rem",
                            cursor: "pointer",
                        }}
                    />
                    <Card.Title className="mb-1">{drink.strDrink}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                        {drink.strCategory} | {glassIcon} {drink.strGlass}
                    </Card.Subtitle>
                    <Card.Text
                        style={{
                            textAlign: "left",
                            fontSize: "0.95rem",
                            marginBottom: "1.2rem",
                        }}
                    >
                        {drink.strInstructions}
                    </Card.Text>

                    <h6 className="mt-4">Ingredients</h6>
                    <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                        {ingredients.map((ing, idx) => (
                            <div
                                key={idx}
                                style={{
                                    backgroundColor: "#e0f7f4",
                                    borderRadius: "20px",
                                    padding: "8px 14px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    fontSize: "0.95rem",
                                }}
                            >
                                <span style={{ fontSize: "1.2rem" }}>{ing.icon}</span>
                                {ing.text}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 text-muted" style={{ fontSize: "0.85rem" }}>
                        Added on: {createdStr}
                    </div>
                </Card.Body>
            </Card>

            {/* Modal for image zoom */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Body className="text-center">
                    <img
                        src={drink.strDrinkThumb}
                        alt={drink.strDrink}
                        className="img-fluid"
                        style={{
                            maxHeight: "400px",
                            objectFit: "contain",
                            borderRadius: "10px",
                        }}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DrinkDetails;
