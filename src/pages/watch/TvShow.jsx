import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from '../../contexts/authContext/authContext'
import { Loader, Play } from 'lucide-react'
import { useMovies } from '../../contexts/moviesContext/moviesContext'
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"



const TvWatch = () => {
    const [base_url, setBaseUrl] = useState('https://embed.su/embed/tv')
    const { id, season, episode } = useParams()
    const { mode } = useAuth()
    const [service, setService] = React.useState(null)
    const [seasons, setSeasons] = useState([])
    const [episodes, setEpisodes] = useState([])
    const navigate = useNavigate()
    const { getTvShowSeasons, getTvShowEpisodes } = useMovies()
    const image_base_url = "https://image.tmdb.org/t/p/original"
    useEffect(() => {
        getTvShowSeasons(id).then(data => {
            setSeasons(data)
            console.log(data)
        })
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0)

    })
    useEffect(() => {
        getTvShowEpisodes(id, season).then(data => {
            setEpisodes(data.episodes)
            console.log(data)
        })
    }, [season])
    const handleServerChange = (value) => {
        if (value === 'vidsrc.dev') {
            setBaseUrl('https://vidsrc.me/embed/tv');
        }
        if (value === 'embed.su') {
            setBaseUrl('https://embed.su/embed/tv');
        }
        if (value === 'vidsrc.icu') {
            setBaseUrl('https://vidsrc.icu/embed/tv');
        }
        if (value === 'vidlink.pro') {
            setBaseUrl('https://vidlink.pro/embed/tv');
        }
        if (value === 'vidsrc.net') {
            setBaseUrl('https://vidsrc.net/embed/tv');
        }
        if (value === '2embed.cc') {
            setBaseUrl('https://www.2embed.cc/embedtv');
        }
        if (value === 'multiembed') {
            setBaseUrl('https://multiembed.mov')
        }
        if (value === 'NontonGo') {
            setBaseUrl('https://www.NontonGo.win/embed/tv')
        }


    }
    const handleSeasonChange = (value) => {
        navigate(`/tv/watch/${id}/${value}/1`)
    }
    return (
        <div className={`${mode} bg-secondary text-foreground max-sm:px-4 px-3`} >
            <div className='flex justify-center items-center rounded'>
                <div className='absolute text-center flex justify-center items-center flex-col'>
                    <Loader className='animate-spin text-foreground' /><span>please wait</span>
                </div>
                <iframe
                    src={base_url.includes('2embed.cc') ? `${base_url}/${id}&s=${season}&e=${episode}` : base_url.includes('NontonGo') ? `${base_url}/?id=${id}&s=${season}&e=${episode}` : base_url.includes('multiembed') ? `${base_url}/?video_id=${id}&tmdb=1&s=${season}&e=${episode}` : `${base_url}/${id}/${parseInt(season)}/${parseInt(episode)}`}
                    allowFullScreen
                    scrolling="no"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    title="Embedded Video"
                    className='rounded-md mt-3 z-10 max-sm:h-[200px] h-[500px]'
                ></iframe>
            </div>
            <div>

                <div className='py-3 flex sm:gap-10 gap-4'>
                    <Select onValueChange={handleServerChange} className='bg-background w-full'>
                        <SelectTrigger className="w-full  bg-background text-foreground">
                            <SelectValue placeholder="Select a service" className='text-foreground' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="embed.su">embed.su</SelectItem>
                            <SelectItem value="vidsrc.dev">vidsrc.dev</SelectItem>
                            <SelectItem value="vidsrc.icu">vidsrc.icu</SelectItem>
                            <SelectItem value="vidlink.pro">vidlink.pro</SelectItem>
                            <SelectItem value="vidsrc.net">vidsrc.net</SelectItem>
                            <SelectItem value="2embed.cc">2embed.cc</SelectItem>
                            <SelectItem value="multiembed">multiembed</SelectItem>
                            <SelectItem value="NontonGo">NontonGo</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={handleSeasonChange} className='bg-background w-full'>
                        <SelectTrigger className="w-full  bg-background text-foreground">
                            <SelectValue placeholder="Select a season" className='text-foreground' />
                        </SelectTrigger>
                        <SelectContent>
                            {seasons && seasons.map(season => (
                                <SelectItem value={season.season_number}><Link to={`/tv/watch/${season.season_number}/1`}>{season.name}</Link></SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                </div>
                <div className="flex sm:gap-10 gap-4 mb-3">
                    <Button className='w-full' disabled={parseInt(episode) === 1} variant=''><Link to={`/tv/watch/${id}/${season}/${parseInt(episode) > 1 ? parseInt(episode) - 1 : 1}`}>Previous episode</Link></Button>
                    <Button className='w-full' disabled={parseInt(episode) === episodes.length} variant=''><Link to={`/tv/watch/${id}/${season}/${parseInt(episode) + 1}`}>Next episode</Link></Button>

                </div>
                <h1 className='text-lg mb-4 '>Select an episode :</h1>
                <ScrollArea className="flex flex-col max-h-[400px]">
                    {episodes && episodes.map(ep => (
                        <div key={ep.id} className={`flex gap-4 p-3 mb-2 rounded-md border ${ep.episode_number == (episode) ? 'bg-slate-300 text-black' : 'bg-background'}`}>
                            <div className='relative flex items-center'>
                                <img src={`${image_base_url}${ep.still_path}`} className='rounded max-w-52 max-sm:max-w-24 max-h-24' alt={ep.name} />
                                <Link to={`/tv/watch/${id}/${ep.season_number}/${ep.episode_number}`} className='absolute inset-0'>
                                    <Play className='cursor-pointer absolute inset-0 m-auto flex justify-center items-center bg-slate-800 bg-opacity-30 rounded-full p-2 hover:scale-110 transition-all text-white' size={30} />
                                    <span className='absolute left-0 bottom-0 bg-zinc-700 border-opacity-20 text-white items-center text-sm px-1 justify-center flex rounded-tr-md min-w-5 text-center'>{ep.episode_number}</span>
                                </Link>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h1 className='max-sm:text-xs'>{ep.name}</h1>
                                <p className='text-sm  max-sm:text-[10px] max-sm:leading-3  sm:break-words max-sm:line-clamp-2' >{ep.overview}</p>
                            </div>
                        </div>
                    ))}
                    <ScrollBar orientation="vertical" className="bg-foreground rounded" />
                </ScrollArea>
            </div>
            <div className='mt-4'>

            <span className='text-lg mt-10'>Note:</span>
            <p> 
                If the video does not play, try changing the server.
            </p>
            </div>
        </div>
    )
}

export default TvWatch