import React from 'react'
import { Button } from "@/components/ui/button"
import { forgotPassword } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext/authContext';


const ForgotPassword = () => {
    const [email , setEmail] = React.useState("");
    const [error, setError] = React.useState(null);
    const [submitted, setSubmitted] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email).then(() => setSubmitted(true)).catch(error => setError(error.message));
    }
    const {mode} = useAuth();
return (
    <div className={`${mode} flex bg-background flex-col items-center justify-center min-h-screen`}>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Forgot Password</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="bg-secondary-foreground p-6 rounded shadow-md w-full max-w-sm text" method='post'>
        {submitted && <p className="text-green-500 text-center">Password reset email sent</p>}
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email:
            </label>
            <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button
                type="submit"
                className="mt-4 w-full  text-white py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Submit
            </Button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
            Remembered your password? <a href="/login" className="text-secondary">Login</a>
        </p>
    </div>
)
}

export default ForgotPassword