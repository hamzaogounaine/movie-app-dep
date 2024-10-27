
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"

import { useEffect, useState } from "react";
import { signIn, signInWithGoogle } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    await signIn(email, password).catch((error) => {setError(error.message)});
  }

  const {isAuthenticated} = useAuth();
  useEffect(() => {
      if(isAuthenticated) {
          navigate("/");
      }
  },[isAuthenticated])

  const googleSignIn = async () => {
    await signInWithGoogle().catch((error) => {setError(error.message)});
  }
  const {mode} = useAuth();
return (
  <div className={`flex  min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 ${mode}`}>
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl text-foreground font-bold">Welcome back</h1>
        <p className="text-muted-foreground">Enter your email and password to sign in to your account.</p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="space-y-4 text-foreground">
        <div className="space-y-2 ">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-sm font-medium underline underline-offset-4 hover:text-primary"
              prefetch={false}
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder='*********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/signup" className="font-medium underline underline-offset-4 hover:text-primary">Sign up</Link>
          </p>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Sign in
        </Button>
        <Button variant='ghost' className='w-full border border-secondary' onClick={googleSignIn}>

       
            <div className='flex items-center justify-center'>
              <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google Logo" className='w-6 h-6 mr-2'/>
              <span>Sign in with Google</span>
            </div>
       
        </Button>
      </div>
    </div>
  </div>
);}

export default Login;

