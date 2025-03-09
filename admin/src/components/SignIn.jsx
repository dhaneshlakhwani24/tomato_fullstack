import { useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { toast } from 'react-toastify';

const SignIn = ({ url }) => {
    SignIn.propTypes = {
        url: PropTypes.string.isRequired
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/login`, { email, password });

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
