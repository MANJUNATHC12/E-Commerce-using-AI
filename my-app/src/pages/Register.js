import Formtemp from "../Templates/formtemp";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        phonenumber: "",
        password: ""
    })

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");

    const fields = [
        {
            label: "Name*",
            type: "text",
            name: "name",
            placeholder: "Enter your name",
            value: formdata.name,
            error: errors.name?.[0] || errors.Name?.[0]
        },
        {
            label: "Email*",
            type: "email",
            name: "email",
            placeholder: "Enter your email",
            value: formdata.email,
            error: errors.email?.[0] || errors.Email?.[0]
        },
        {
            label: "Phonenumber*",
            type: "number",
            name: "phonenumber",
            placeholder: "Enter your phonenumber",
            value: formdata.phonenumber,
            error: errors.phonenumber?.[0] || errors.Phonenumber?.[0]
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
        // if (formdata.name === "" || formdata.email === "" || formdata.phonenumber === "" || formdata.password === "") {
        //     alert("Please fill all the fields");
        // }
        // else {

        try {
            const response = await axios.post(
                "http://localhost:5164/api/auth/register",
                formdata
            );

            console.log(response.data);

            alert("Form submitted successfully"); // ✅ only on success

            setformdata({
                name: "",
                email: "",
                phonenumber: "",
                password: ""
            })

            setErrors({});
            setGeneralError("");

        } catch (error) {
            // ✅ Handle validation errors
            if (error.response && error.response.data) {

                // Model validation errors
                // if (error.response.data.errors) {
                //     setErrors(error.response.data.errors);
                // }

                // // Custom error (email exists)
                // else if (error.response.data.message) {
                //     setErrors({ email: [error.response.data.message] });
                // }

                // ✅ Field-wise validation errors
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }

                // ✅ General error (like "All fields mandatory")
                if (error.response.data.message) {
                    setGeneralError(error.response.data.message);
                }
            }
        }

        // }
        setformdata({
            name: "",
            email: "",
            phonenumber: "",
            password: ""
        })
        console.log(formdata);
    }
    return (
        <Formtemp
            fields={fields}
            formdata={formdata}
            handlechange={handlechange}
            handlesubmit={handlesubmit}
            buttonText="Register"
            generalError={generalError}
        >
            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                <Link to="/login" style={{ color: '#60a5fa', textDecoration: 'none' }}>Already have an account? Login here</Link>
            </div>
        </Formtemp>
    )
}

export default Register;