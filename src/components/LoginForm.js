import { useState } from 'react';
import FirebaseAuthService from '../FirebaseAuthService';

const LoginForm = ({ existingUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Login user
    const handleLogin = async ($event) => {
        $event.preventDefault();

        try {
            await FirebaseAuthService.loginUser(username, password);
        } catch (error) {
            let message = '';
            if (error.code === 'auth/wrong-password') {
                message = 'Wrong password, please check it';
            } else if (error.code === 'auth/user-not-found') {
                message = 'Email address not found, please check it';
            } else if (error.code === 'auth/invalid-email') {
                message = 'Invalid email address';
            } else if (error.code === 'auth/user-disabled') {
                message = 'Account disabled, please contact support';
            }
            alert(message);
        }
    };

    // Logout user.
    const handleLogout = () => {
        FirebaseAuthService.logoutUser();
        setUsername('');
        setPassword('');
    }

    // Send password reset email
    const handleSendResetPasswordEmail = async () => {
        if (!username) {
            alert('Please fill the email field');
            return;
        }

        try {
            await FirebaseAuthService.sendPasswordResetEmail(username);
            alert("We've sent an email with the instructions to reset your password");
        } catch (error) {
            let message = '';
            if (error.code === 'auth/user-not-found') {
                message = 'Email address not found, please check it';
            }
            alert(message);
        }
    };

    return (
        <div className="login-form-container">
            { existingUser ? (
                <div className="row">
                    <h3>Welcome, { existingUser.email }</h3>
                    <button
                        type="button"
                        className="primary-button"
                        onClick={ handleLogout }
                    >Logout</button>
                </div>
            ) : (
                <form
                    className="login-form"
                    onSubmit={ handleLogin }
                >
                    {/* email */}
                    <label className="input-label login-label">
                        Email:
                        <input
                            type="email"
                            autoComplete='username'
                            required
                            value={ username }
                            onChange={ ($event) => setUsername($event.target.value) }
                            className="input-text"
                        />
                    </label>

                    {/* password */}
                    <label className="input-label login-label">
                        Password
                        <input
                            type="password"
                            autoComplete="current-password"
                            required
                            value={ password }
                            onChange={ ($event) => setPassword($event.target.value) }
                            className="input-text"
                        />
                    </label>
                    <div className="button-box">
                        <button className="primary-button">Login</button>
                        <button
                            type="button"
                            className="primary-button"
                            onClick={ handleSendResetPasswordEmail }
                        >Reset password</button>
                    </div>
                </form>
            )
            }
        </div>
    );
}
 
export default LoginForm;