import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignIn = ({ url }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/auth/signin`, { email, password });
            if (response.data.success) {
                toast.success(response.data.message);
                // Handle successful sign-in (e.g., store token, redirect)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred during sign-in.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignIn;
