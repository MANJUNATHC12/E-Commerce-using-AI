import { useState } from "react";
import './style.css'

function Practice() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfrimpassword] = useState("");
    const [checked, setChecked] = useState(false);

    return (
        <div>
            <h1>practice</h1>
            <input type="text"
                placeholder="enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)} />

            <input type="text"
                placeholder="enter your name"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

            <input type="text"
                placeholder="enter your name"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)} />

            <input type="text"
                placeholder="enter your name"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />

            <input type="text"
                placeholder="enter your name"
                value={confirmpassword}
                onChange={(e) => setConfrimpassword(e.target.value)} />

            <input type="checkbox"
                placeholder="remenber me"
                checked={checked}
                onChange={(e) => setChecked(e.target.value)} />
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone Number: {phonenumber}</p>
            <p>Password: {password}</p>
            <p>Confirm Password: {confirmpassword}</p>
            <p>Remember Me: {checked ? "checked" : "not checked"}</p>
        </div>
    );
}

export default Practice;


