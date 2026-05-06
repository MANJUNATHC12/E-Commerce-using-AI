import React, { useState } from 'react';
import '../Templates/form.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally handle the API submission.
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="form-page">
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
                <h2 style={{ textAlign: 'center', color: '#f8fafc', marginBottom: '1rem' }}>Contact Us</h2>
                <p style={{ textAlign: 'center', color: '#cbd5e1', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    Have a question? Fill out the form below.
                </p>
                {submitted && <p style={{ color: '#4ade80', textAlign: 'center', marginBottom: '1rem' }}>Message sent successfully!</p>}
                
                <div className="input-group">
                    <label>Name<span style={{ color: 'red' }}>*</span></label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Enter your name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Email<span style={{ color: 'red' }}>*</span></label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Message<span style={{ color: 'red' }}>*</span></label>
                    <textarea 
                        name="message" 
                        placeholder="Write your message here" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                    ></textarea>
                </div>

                <button type="submit" style={{ marginTop: '1rem' }}>Send Message</button>
            </form>
        </div>
    );
}

export default Contact;
