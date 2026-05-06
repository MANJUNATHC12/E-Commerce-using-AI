function Inputfield({ label, type, name, placeholder, value, onChange, error }) {
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

            />

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Inputfield;