// src/components/ProtectedComponent.jsx
import React, { useState } from "react";
import axios from "axios";

function ProtectedComponent() {
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/protected-route", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            // Do something with res.data
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError(err.response.data.message);
            }
        }
    };

    return (
        <div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <button onClick={fetchData} className="btn btn-primary">Access Protected Route</button>
        </div>
    );
}

export default ProtectedComponent;
