import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/authContext/authContext'

const Footer = () => {
    const {mode} = useAuth()
  return (
    <div>
        <footer className={` ${mode} flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-secondary-foreground`}>
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Film Guild. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

export default Footer