import React from "react";
import { Stack, Badge } from "react-bootstrap";

/**
 * Displays a horizontal stack of up to 3 recent search terms.
 * Clicking a badge triggers a new search with that term.
 */
const RecentSearches = ({ history, onSearch }) => {
    // Filter out empty or duplicate values, limit to 3 recent terms
    const recent = [...new Set(history.filter(item => item?.trim() !== ""))].slice(0, 3);

    return (
        <div className="text-center mb-4">
            <div className="mb-2 fw-semibold fs-5 text-secondary">Recent Searches</div>
            <Stack direction="horizontal" gap={2} className="flex-wrap justify-content-center">
                {recent.map((item, index) => (
                    <Badge
                        key={index}
                        bg="warning"
                        style={{
                            padding: "0.6em 1.1em",
                            borderRadius: "20px",
                            cursor: "pointer",
                            fontSize: "0.95rem",
                            color: "#333",
                        }}
                        onClick={() => onSearch(item)}
                    >
                        {item}
                    </Badge>
                ))}
            </Stack>
        </div>
    );
};

export default RecentSearches;
