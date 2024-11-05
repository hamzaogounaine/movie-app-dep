import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from '../../contexts/authContext/authContext'
import { Loader } from 'lucide-react'

const MovieWatch = () => {
    const [base_url , setBaseUrl] = useState('https://vidsrc.me/embed/movie')
    const { id } = useParams()
    const { mode } = useAuth()
    const [service, setService] = React.useState(null)
    const handleSortChange = (value) => {
        if (value === 'vidsrc.dev') {
            setBaseUrl('https://vidsrc.me/embed/movie');
        }
        if (value === 'embed.su') {
            setBaseUrl('https://embed.su/embed/movie');
        }
        if (value === 'putlocker.vip') {
            setBaseUrl('https://putlocker.vip/embed/movie');
        }
        if (value === 'vidsrc.icu') {
            setBaseUrl('https://vidsrc.icu/embed/movie');
        }
        if (value === 'vidlink.pro') {
            setBaseUrl('https://vidlink.pro/movie');
        }
        if (value === 'vidsrc.net') {
            setBaseUrl('https://vidsrc.net/embed/movie');
        }
        if (value === '2embed.cc') {
            setBaseUrl('https://www.2embed.cc/embed');
        }
        if (value === 'vidsrc.icu') {
            setBaseUrl('https://vidsrc.icu/embed/movie');
        }
        if (value === 'vidsrc.vip') {
            setBaseUrl('https://vidsrc.vip/embed/movie');
        }

        

    }
    return (
        <div className={`${mode} bg-secondary text-foreground px-10 min-h-[90vh]`} >
            <div className='flex justify-center items-center rounded'>
                <div className='absolute text-center flex justify-center items-center flex-col'>
                    <Loader className='animate-spin text-foreground' /><span>please wait</span> 
                </div>
                <iframe
                    src={`${base_url}/${id}`}
                    allowFullScreen
                    scrolling="no"
                    width="100%"
                    height="500px"
                    style={{ border: "none" }}
                    title="Embedded Video"
                    className='rounded-md mt-3 z-10'
                ></iframe>
            </div>
            <div className=' py-3'>
                <h1 className='text-lg'>Select a server</h1>
                <Select onValueChange={handleSortChange} defaultValue={service} className='bg-background w-full'>
                    <SelectTrigger className="w-full md:w-[200px] bg-background text-foreground">
                        <SelectValue placeholder="Select a service" className='text-foreground' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="vidsrc.dev">vidsrc.dev</SelectItem>
                        <SelectItem value="embed.su">embed.su</SelectItem>
                        <SelectItem value="vidsrc.icu">vidsrc.icu</SelectItem>
                        <SelectItem value="vidlink.pro">vidlink.pro</SelectItem>
                        <SelectItem value="vidsrc.net">vidsrc.net</SelectItem>
                        <SelectItem value="2embed.cc">2embed.cc</SelectItem>
                        <SelectItem value="vidsrc.vip">vidsrc.vip</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <span className='text-lg'>Note:</span>
            <p> 
                If the video does not play, try changing the server.
            </p>
        </div>
    )
}

export default MovieWatch