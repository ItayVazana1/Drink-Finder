import React, { useState } from "react";
import { Navbar, Container, Button, Modal } from "react-bootstrap";

/**
 * Displays the top logo banner with animated branding.
 * Includes a bounce effect on hover and a modal with contact information.
 */
const Logo = () => {
    const [showAbout, setShowAbout] = useState(false);

    // Embedded CSS for animation and text shine
    const style = `
      @keyframes bounce {
        0% { transform: translateY(0); }
        30% { transform: translateY(-10px); }
        60% { transform: translateY(5px); }
        100% { transform: translateY(0); }
      }

      @keyframes shine {
        0% { background-position: -200px; }
        100% { background-position: 200px; }
      }

      .shiny-text {
        background: linear-gradient(90deg, #ff944d, #00bfa6, #ff944d);
        background-size: 300%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 3s infinite linear;
        text-align: center;
      }

      @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap');
    `;

    return (
        <>
            <style>{style}</style>

            {/* Top banner with logo and animated title */}
            <Navbar
                className="mb-4"
                style={{
                    backgroundColor: "#e6f7f9",
                    borderBottom: "2px solid #d0f0f2",
                    padding: "12px 20px",
                    borderRadius: "20px",
                }}
            >
                <Container className="justify-content-center position-relative">
                    <Navbar.Brand className="d-flex align-items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="Drink Finder Logo"
                            height="50"
                            onMouseEnter={(e) => {
                                e.target.style.animation = "bounce 0.5s ease";
                            }}
                            onAnimationEnd={(e) => {
                                e.target.style.animation = "";
                            }}
                            style={{
                                borderRadius: "8px",
                                transition: "transform 0.2s",
                                cursor: "pointer",
                            }}
                        />
                        <span
                            className="shiny-text"
                            style={{
                                fontFamily: "'Fredoka', sans-serif",
                                fontWeight: "600",
                                fontSize: "2.5rem",
                                lineHeight: "1.2",
                            }}
                        >
                            Drink Finder
                        </span>
                    </Navbar.Brand>

                    {/* Info button opens the About Me modal */}
                    <div
                        style={{
                            position: "absolute",
                            right: 15,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        <Button
                            variant="light"
                            onClick={() => setShowAbout(true)}
                            style={{
                                borderRadius: "50%",
                                fontSize: "1.3rem",
                                padding: "6px 10px",
                                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                            }}
                            title="About Me"
                        >
                            ℹ️
                        </Button>
                    </div>
                </Container>
            </Navbar>

            {/* Modal with contact links */}
            <Modal show={showAbout} onHide={() => setShowAbout(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>About Me</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>
                        🧑‍💼 <a href="https://www.linkedin.com/in/itayvazana" target="_blank" rel="noreferrer">LinkedIn</a>
                    </p>
                    <p>
                        🐙 <a href="https://github.com/ItayVazana1" target="_blank" rel="noreferrer">GitHub</a>
                    </p>
                    <p>
                        ✉️ <a href="mailto:itay.vazana.b@gmail.com">itay.vazana.b@gmail.com</a>
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Logo;
