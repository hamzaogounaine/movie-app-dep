import { createContext, useContext, useEffect, useState } from "react";
import {auth} from "../../firebase/firebase";
const AuthContext = createContext();
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');
    const toggleMode = () => {
        console.log(mode)
        setMode(mode === 'dark' ? 'light' : 'dark');
        localStorage.setItem('mode', mode === 'dark' ? 'light' : 'dark');
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsAuthenticated(!!user);
            setIsAuthenticating(false);
        });
        return () => unsubscribe();
    } ,[auth])
    return (
    <AuthContext.Provider value={{
        user,
        isAuthenticated,
        isAuthenticating,
        toggleMode,
        mode
        
    }}>
        {children}
    </AuthContext.Provider>
    );
}
export default AuthProvider;