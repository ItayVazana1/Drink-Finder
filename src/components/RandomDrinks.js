import React, { useState } from "react";
import { Row, Col, Card, Modal } from "react-bootstrap";

/**
 * Displays 5 random drinks as clickable cards in a responsive row.
 * When a card is clicked, a modal opens showing the drink image and name.
 */
const RandomDrinks = ({ drinks }) => {
    const [selectedDrink, setSelectedDrink] = useState(null);

    if (!drinks || drinks.length === 0) return null;

    return (
        <>
            <h5 className="text-center mb-4">You Might Also Like</h5>

            {/* Drink cards grid */}
            <Row className="g-3 justify-content-center">
                {drinks.map((drink, index) => (
                    <Col key={index} xs={6} md={2}>
                        <Card
                            className="text-center h-100"
                            onClick={() => setSelectedDrink(drink)}
                            style={{
                                borderRadius: "16px",
                                cursor: "pointer",
                                boxShadow: "0 0 6px rgba(0,0,0,0.05)",
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.03)";
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow = "0 0 6px rgba(0,0,0,0.05)";
                            }}
                        >
                            <Card.Img
                                variant="top"
                                src={drink.strDrinkThumb}
                                alt={drink.strDrink}
                                style={{
                                    height: "100px",
                                    objectFit: "cover",
                                    borderTopLeftRadius: "16px",
                                    borderTopRightRadius: "16px",
                                }}
                            />
                            <Card.Body style={{ padding: "0.5rem" }}>
                                <Card.Title className="fs-6">{drink.strDrink}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal to show full-size drink image */}
            <Modal
                show={!!selectedDrink}
                onHide={() => setSelectedDrink(null)}
                centered
            >
                <Modal.Body className="text-center">
                    <img
                        src={selectedDrink?.strDrinkThumb}
                        alt={selectedDrink?.strDrink}
                        className="img-fluid mb-3"
                        style={{
                            maxHeight: "400px",
                            objectFit: "contain",
                            borderRadius: "10px",
                        }}
                    />
                    <h5>{selectedDrink?.strDrink}</h5>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RandomDrinks;
