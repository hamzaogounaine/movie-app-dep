import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { signInWithGoogle, signUp } from "../../firebase/auth";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext/authContext";

export default function Signup() {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUp(email, password).catch(error => setError(error));

      navigate("/");
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }
  const googleSignIn = async () => {
    await signInWithGoogle().catch((error) => { setError(error.message) });
  }
  const { mode } = useAuth();
  return (
    <div className={` ${mode} flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8`}>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-foreground">Create an account</h1>
          <p className="text-muted-foreground">Enter your details to create a new account.</p>
          {error && <p className="text-red-500">{error}</p>}

        </div>
        <div className="space-y-4 text-foreground">

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder='*********' onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
          </div> */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium underline underline-offset-4 hover:text-primary">Sign in</Link>
          </p>
          <Button type="submit" className="w-full" onClick={(e) => handleSubmit(e)}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
          <Button variant='ghost' className='w-full border border-secondary' onClick={googleSignIn}>

            <div className='flex items-center justify-center '>
              <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google Logo" className='w-6 h-6 mr-2' />
              <span>Sign up with Google</span>
            </div>

          </Button>
        </div>
      </div>
    </div>
  )
}