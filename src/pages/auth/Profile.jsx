import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/authContext/authContext'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Briefcase, MapPin, TimerIcon, LogIn, PenBox, Eye, MoveRight } from "lucide-react"
import { changeDisplayName, changeEmail, changePassword, verifyEmail } from '../../firebase/auth'
import { useToast } from "@/components/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Navigate } from 'react-router-dom'

const Profile = () => {
    const { user } = useAuth()
    const { toast } = useToast()
    const [displayName, setDisplayName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isEditing, setIsEditing] = useState(false)
    const [message, setMessage] = useState()
    useEffect(() => {
        setDisplayName(user?.displayName)
        setEmail(user?.email)
    },[user])

    const handleSubmit = async () => {
        if(displayName === "" || email === "" || password === "") {
            return toast({
                title: "Error while updating user",
                description: "Please fill in all the fields",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }

        if(displayName !== user.displayName) {
            await changeDisplayName(displayName).then(() => {setIsEditing(false); return toast({
                title: "Display name changed ",
                description: "Your display name has been changed successfully",
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })})
        }

        if(email !== user.email) {

            await changeEmail(email).then(() => {setIsEditing(false) ; return toast({
                title: "Email changed ",
                description: "Your display name has been changed successfully",
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })}).catch(error => {setIsEditing(false) ; return toast({
                title: "Error while Email changing ",
                description: error.message,
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })})
        }
        if(password !== user.password){

            await changePassword(password).then(() => {setIsEditing(false) ; return toast({
                title: "Password  changed ",
                description: "Your password has been changed successfully",
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })}).catch(error => {setIsEditing(false) ; return toast({
                title: "Error while Passowrd changing ",
                description: error.message,
                action: (
                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
            })})
        }
        
    }
    const {mode} = useAuth()
    
    const sendEmailVerification = async () => {
        await verifyEmail().then(() => {
            toast({
                title: "Verification email sent",
                description: "A verification email has been sent to your email address",
                duration: 5000,
                action: (
                  <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                ),
              })
        })
    }


    return (
        <div>
            {user === null ? <Navigate to="/login" /> :
                <div className={`container mx-auto py-10 bg-secondary-foreground ${mode}`}>
                    <Card className="max-w-2xl mx-auto bg-background ">
                        <CardHeader>
                            <CardTitle>User user</CardTitle>
                            <CardDescription>View and edit your user information</CardDescription>
                        </CardHeader>
                    
                        <CardContent>
                            <div >
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="w-24 h-24">
                                            <AvatarImage src={user?.photoURL} alt={user.displayName} />
                                            <AvatarFallback>{user?.displayName}</AvatarFallback>
                                        </Avatar>
                                        {isEditing && (
                                            <div>
                                                <Label htmlFor="avatar" className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500">
                                                    Change Avatar
                                                </Label>
                                                <Input
                                                    id="avatar"
                                                    type="file"
                                                    accept="image/*"
                                                    className="sr-only"
                                
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <div className="flex items-center space-x-2">
                                            <User className="text-gray-500" size={20} />
                                            <Input
                                                id="name"
                                                name="name"
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                                readOnly={!isEditing}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="flex items-center space-x-2">
                                            <Mail className="text-gray-500" size={20} />
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                readOnly={!isEditing}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div>

                                        Email verified : {user.emailVerified ? <Badge className="bg-green-500">Yes</Badge> : <Badge className="bg-red-500">No</Badge>}
                                        </div>
                                        {user.emailVerified ? null : <Button variant='ghost' className='border mt-3' onClick={sendEmailVerification}>Send verification email <MoveRight /></Button>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Password</Label>
                                        <div className="flex items-center space-x-2">
                                            <Eye className="text-gray-500" size={20} />
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"

                                                onChange={(e) => setPassword(e.target.value)}
                                                readOnly={!isEditing}
                                            />
                                        </div>
                                    </div>
        
                                    <div className="space-y-2">
                                        <Label htmlFor="occupation">Created at</Label>
                                        <div className="flex items-center space-x-2">
                                            <PenBox className="text-gray-500" size={20} />
                                            <span>{user.metadata.creationTime}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Last login</Label>
                                        <div className="flex items-center space-x-2">
                                            <LogIn className="text-gray-500" size={20} />
                                            <span>{user.metadata.lastSignInTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            {isEditing ? (
                                <>
                                    <Button onClick={handleSubmit}>Save Changes</Button>
                                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                </>
                            ) : (
                                <Button onClick={() => setIsEditing(true)}>Edit user</Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            }
        </div>

    )
}

export default Profile