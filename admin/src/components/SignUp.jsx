import { useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = ({ url }) => {
    SignUp.propTypes = {
        url: PropTypes.string.isRequired
    };


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        try {
            const response = await axios.post(`${url}/api/auth/signup`, { email, password });
            if (response.data.success) {
                toast.success(response.data.message);
                // Handle successful sign-up (e.g., redirect to sign-in)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred during sign-up.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;
