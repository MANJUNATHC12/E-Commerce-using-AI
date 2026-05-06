import { useState } from "react";
import Formtemp from "../Templates/formtemp";
import axios from "axios";
function Login() {
    const [formdata, setformdata] = useState({
        email: "",
        password: ""
    })

    const fields = [
        {
            label: "Email*",
            type: "email",
            name: "email",
            placeholder: "Enter your email",
            value: formdata.email,
        },
        {
            label: "Password*",
            type: "password",
            name: "password",
            placeholder: "Enter your password",
            value: formdata.password,
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
        }
        setformdata({
            email: "",
            password: ""
        })
    }
    return (
        <Formtemp
            fields={fields}
            formdata={formdata}
            handlechange={handlechange}
            handlesubmit={handlesubmit}
            buttonText="Login"
        />

    );
}

export default Login;