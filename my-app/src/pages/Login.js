import { useState } from "react";
import Formtemp from "../Templates/formtemp";
import axios from "axios";
import { Link } from "react-router-dom";
function Login() {
    const [formdata, setformdata] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");

    const fields = [
        {
            label: "Email*",
            type: "email",
            name: "email",
            placeholder: "Enter your email",
            value: formdata.email,
            error: errors.email?.[0] || errors.Email?.[0]
        },
        {
            label: "Password*",
            type: "password",
            name: "password",
            placeholder: "Enter your password",
            value: formdata.password,
            error: errors.password?.[0] || errors.Password?.[0]
        }
    ]

    const handlechange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5164/api/auth/login", formdata);
            const data = response.data;
            console.log(data);

            localStorage.setItem("user", JSON.stringify(data));
            window.location.href = "/home"; // redirect

        }
        catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
                
                if (error.response.data.message) {
                    setGeneralError(error.response.data.message);
                }

                if (typeof error.response.data === "string") {
                    setGeneralError(error.response.data);
                }
            } else {
                setGeneralError("An error occurred");
            }
        }
    }
    return (
        <Formtemp
            fields={fields}
            formdata={formdata}
            handlechange={handlechange}
            handlesubmit={handlesubmit}
            buttonText="Login"
            generalError={generalError}
        >
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <Link to="/forgot-password" style={{ color: '#60a5fa', textDecoration: 'none' }}>Forgot Password?</Link>
                <Link to="/register" style={{ color: '#60a5fa', textDecoration: 'none' }}>Don't have an account?</Link>
            </div>
        </Formtemp>

    );
}

export default Login;