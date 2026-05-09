import "./form.css";
import Inputfield from "./Inputfield";
function Formtemp({ fields, formdata, handlechange, handlesubmit, buttonText, generalError, children, nameref, emailref, phonenumberref, passwordref }) {
    const getref = (fieldname) => {
        if (fieldname === "name") {
            return nameref;
        } else if (fieldname === "email") {
            return emailref;
        } else if (fieldname === "phonenumber") {
            return phonenumberref;
        } else if (fieldname === "password") {
            return passwordref;
        }
    }
    return (
        <div className="form-page">
            <form onSubmit={handlesubmit}>

                {generalError && (
                    <p style={{ color: "red", textAlign: "center" }}>
                        {generalError}
                    </p>
                )}

                {fields.map((field, index) => (
                    <Inputfield
                        key={index}
                        label={field.label}
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formdata[field.name]}
                        onChange={handlechange}
                        ref={getref(field.name)}
                        error={field.error}
                    />
                ))}
                <button type="submit">{buttonText}</button>
                {children}
            </form>
        </div>
    );
}

export default Formtemp;