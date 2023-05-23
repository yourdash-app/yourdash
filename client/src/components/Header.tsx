import React from "react"
import { Link } from "react-router-dom"

const Header: React.FC = () => {
  return (
    <div
      className={ "sticky top-0 w-full h-16 bg-base-800 flex items-center justify-center bg-opacity-75 backdrop-blur-lg z-10" }
    >
      <img
        src={ "/assets/productLogos/yourdash.svg" }
        className={ "ml-auto h-12 pr-2 animate__fadeInDown animate__animated" }
        alt={ "" }
      />
      <h2 className={ "font-bold text-3xl animate__fadeInDown animate__animated animate__250ms" }>Your</h2>
      <h2 className={ "font-bold text-3xl animate__fadeInDown animate__animated animate__500ms" }>Dash</h2>
      <section
        className={ "ml-auto mr-auto gap-2 flex items-center justify-center" }
      >
        <Link
          to={ "/" }
          className={ "hover:text-theme-500 active:text-theme-400 transition-colors cursor-pointer select-none animate__fadeInDown animate__animated animate__1000ms" }
        >
          Home
        </Link>
        <Link
          to={ "/docs" }
          className={ "hover:text-theme-500 active:text-theme-400 transition-colors cursor-pointer select-none animate__fadeInDown animate__animated animate__750ms" }
        >
          Docs
        </Link>
        <Link
          to={ "https://github.com/yourdash-app/yourdash" }
          className={ "hover:text-theme-500 active:text-theme-400 transition-colors cursor-pointer select-none animate__fadeInDown animate__animated animate__500ms" }
        >
          Contribute
        </Link>
        <Link
          to={ "/login" }
          className={ "pl-4 pr-4 pb-1.5 pt-1.5 hover:bg-theme-500 active:bg-theme-400 bg-theme-600 transition-colors select-none cursor-pointer rounded-full animate__fadeInDown animate__animated animate__250ms" }
        >
          Login
        </Link>
      </section>
    </div>
  )
}

export default Header
