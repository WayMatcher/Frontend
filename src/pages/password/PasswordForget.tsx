import React, { useState } from 'react';
import classifyText from '@/utils/classifyText';
import { apiRequestPasswordReset } from '@/api/endpoints/user';

const PasswordForget: React.FC = () => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!input.trim()) {
            setError('Please enter your email address or username.');
            return;
        }

        const inputType = classifyText(input); // Determine if it's an email or username
        if (inputType !== 'email' && inputType !== 'username') {
            setError('Invalid input. Please enter a valid email address or username.');
            return;
        }

        try {
            await apiRequestPasswordReset(input, inputType);
            setSuccess('Password reset request sent successfully. Please check your email.');
        } catch (err) {
            setError('Failed to send password reset request. Please try again later.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h1>Password Reset</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor='input' style={{ display: 'block', marginBottom: '5px' }}>
                        Email Address or Username
                    </label>
                    <input
                        type='text'
                        id='input'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type='submit' style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PasswordForget;
