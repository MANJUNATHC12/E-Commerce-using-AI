import "./form.css";
import Inputfield from "./Inputfield";
function Formtemp({ fields, formdata, handlechange, handlesubmit, buttonText, generalError, children }) {
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