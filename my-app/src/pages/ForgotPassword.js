import React, { useState } from "react";
import Formtemp from "../Templates/formtemp";
import axios from "axios";
import { Link } from "react-router-dom";

function ForgotPassword() {
    const [formdata, setformdata] = useState({
        email: "",
        newPassword: ""
    });
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");

    const fields = [
        {
            label: "Email*",
            type: "email",
            name: "email",
            placeholder: "Enter your registered email",
            value: formdata.email,
            error: errors.email?.[0] || errors.Email?.[0]
        },
        {
            label: "New Password*",
            type: "password",
            name: "newPassword",
            placeholder: "Enter your new password",
            value: formdata.newPassword,
            error: errors.newPassword?.[0] || errors.NewPassword?.[0]
        }
    ];

    const handlechange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setGeneralError("");
        setErrors({});
        
        try {
            const response = await axios.post("http://localhost:5164/api/auth/forgot-password", formdata);
            setMessage(response.data.message);
            setformdata({ email: "", newPassword: "" });
        } catch (err) {
            if (err.response && err.response.data) {
                if (err.response.data.errors) {
                    setErrors(err.response.data.errors);
                }
                if (err.response.data.message) {
                    setGeneralError(err.response.data.message);
                }
                if (typeof err.response.data === "string") {
                    setGeneralError(err.response.data);
                }
            } else {
                setGeneralError("An error occurred");
            }
        }
    };

    return (
        <div style={{ padding: "2rem", minHeight: "80vh" }}>
            <h2 style={{ textAlign: "center", color: "#f8fafc", marginBottom: "1rem" }}>Reset Password</h2>
            {message && <p style={{ color: "#10b981", textAlign: "center", marginBottom: "1rem" }}>{message}</p>}
            <Formtemp
                fields={fields}
                formdata={formdata}
                handlechange={handlechange}
                handlesubmit={handlesubmit}
                buttonText="Reset Password"
                generalError={generalError}
            >
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    <Link to="/Login" style={{ color: '#60a5fa', textDecoration: 'none' }}>&larr; Back to Login</Link>
                </div>
            </Formtemp>
        </div>
    );
}

export default ForgotPassword;
