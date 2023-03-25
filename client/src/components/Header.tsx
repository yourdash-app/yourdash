import React from "react";
import YourDashLogo from "./../../public/assets/productLogos/yourdash.svg"

const Header: React.FC = () => {
  return <div className={ `sticky top-0 w-full h-16 bg-base-800 flex items-center justify-center` }>
    <img src={ YourDashLogo } className={ `ml-auto h-12 pr-2` } alt={ `` }/>
    <h2 className={ `font-bold text-3xl` }>YourDash</h2>
    <section className={ `ml-auto mr-auto gap-2 flex items-center justify-center` }>
      <a href={ `/` }
         className={ `hover:text-theme-500 active:text-theme-400 transition-colors cursor-pointer select-none` }>Home</a>
      <a href={ `/docs` }
         className={ `hover:text-theme-500 active:text-theme-400 transition-colors cursor-pointer select-none` }>Docs</a>
      <a href={ `https://github.com/ewsgit/yourdash` }
         className={ `hover:text-theme-500 active:text-theme-400 transition-colors cursor-pointer select-none` }>Contribute</a>
      <a href={ `/login` }
         className={ `pl-4 pr-4 pb-1.5 pt-1.5 hover:bg-theme-500 active:bg-theme-400 bg-theme-600 transition-colors select-none cursor-pointer rounded-full` }>Login</a>
    </section>
  </div>
}

export default Header
