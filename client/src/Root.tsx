import React, { useEffect, useState } from "react";
import Header from "./components/Header";

const Root: React.FC = () => {
  const [ taglineInd, setTaglineInd ] = useState( 0 )
  
  useEffect( () => {
    if (taglineInd + 1 >= 3) {
      setTimeout( () => setTaglineInd( 0 ), 2500 )
    } else {
      setTimeout( () => setTaglineInd( taglineInd + 1 ), 2500 )
    }
  }, [ taglineInd ] )
  
  return <main className={ `bg-base-900 min-h-screen` }>
    <Header/>
    <section
        className={ `w-full h-[30rem] overflow-hidden relative bg-base-800 [clip-path:_polygon(0_0,_100%_0%,_100%_85%,_0%_100%);] grid md:grid-cols-2 grid-cols-1 gap-10 pb-4` }>
      <div className={ `flex flex-col items-end justify-center overflow-hidden md:ml-0 md:mr-0 ml-auto mr-auto` }>
        <h1 className={ `text-6xl font-bold text-base-50` }>
          YourDash
        </h1>
        {/* Taglines scroller */ }
        <div className={ `relative whitespace-nowrap w-full` }>
          <span
              className={ `absolute flex items-end text-end transition-all` }
              style={ {
                right: taglineInd === 0
                       ? 0
                       : "-100%",
                opacity: taglineInd === 0
                         ? 1
                         : 0
              } }>
            Manage your files with ease
          </span>
          <span
              className={ `absolute flex items-end text-end transition-all` }
              style={ {
                right: taglineInd === 1
                       ? 0
                       : "-100%",
                opacity: taglineInd === 1
                         ? 1
                         : 0
              } }>
            Collaborate seamlessly
          </span>
          <span
              className={ `absolute flex items-end text-end transition-all` }
              style={ {
                right: taglineInd === 2
                       ? 0
                       : "-100%",
                opacity: taglineInd === 2
                         ? 1
                         : 0
              } }>
            Make it your own
          </span>
        </div>
        <div className={ `flex gap-2 pt-8 items-center justify-center` }>
          <a href={ `/login` }
             className={ `pl-4 pr-4 pb-1.5 pt-1.5 hover:bg-theme-500 active:bg-theme-400 bg-theme-600 transition-colors select-none cursor-pointer rounded-full` }>Login</a>
          <a href={ `/login/signup` }
             className={ `hover:text-theme-500 active:text-theme-400 text-theme-200 transition-colors select-none cursor-pointer` }>Signup</a>
        </div>
      </div>
      <div className={ `relative md:block hidden` }>
        <img className={ `w-24 absolute top-36 left-56 aspect-square` } src={ `/assets/promo-apps/store.png` }
             alt={ `` }/>
        <img className={ `w-24 absolute top-44 left-36 aspect-square` } src={ `/assets/promo-apps/code-studio.png` }
             alt={ `` }/>
        <img className={ `w-24 absolute top-36 left-16 aspect-square` } src={ `/assets/promo-apps/checklist.png` }
             alt={ `` }/>
        <img className={ `w-24 absolute top-40 left-0 aspect-square` } src={ `/assets/promo-apps/files.png` }
             alt={ `` }/>
      </div>
    </section>
    <section className={ `flex items-center justify-center text-3xl font-semibold pt-16` }>
      Coming soon...
    </section>
  </main>
}

export default Root
