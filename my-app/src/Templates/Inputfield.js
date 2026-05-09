import { forwardRef } from "react";
const Inputfield = forwardRef(({ label, type, name, placeholder, value, onChange, error }, ref) => {
    return (
        <div className="input-group">
            <label>
                {label && label.includes('*') ? (
                    <>
                        {label.replace('*', '')}
                        <span style={{ color: 'red' }}>*</span>
                    </>
                ) : (
                    label
                )}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                ref={ref}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
});

export default Inputfield;