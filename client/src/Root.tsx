import React, { useEffect, useState } from "react"
import Header from "./components/Header"
import { Card, MajorButton } from "./ui"
import { Link, useNavigate } from "react-router-dom"

const Root: React.FC = () => {
  const navigate = useNavigate()
  const [taglineInd, setTaglineInd] = useState( 0 )

  useEffect( () => {
    if ( taglineInd + 1 >= 3 ) {
      setTimeout( () => {
        return setTaglineInd( 0 )
      }, 3000 )
    } else {
      setTimeout( () => {
        return setTaglineInd( taglineInd + 1 )
      }, 3000 )
    }
  }, [taglineInd] )

  return (
    <main className={ "bg-base-900 min-h-screen h-full" }>
      <Header/>
      <section
        className={ "animate__animated animate__fadeIn w-full h-[30rem] overflow-hidden relative bg-base-800 [clip-path:_polygon(0_0,_100%_0%,_100%_85%,_0%_100%);] grid md:grid-cols-2 grid-cols-1 gap-10 pb-4" }
      >
        <div className={ "flex flex-col items-end justify-center overflow-hidden md:ml-0 md:mr-0 ml-auto mr-auto" }>
          <h1 className={ "text-6xl font-bold text-base-50 animate__jackInTheBox animate__animated flex select-none" }>
            YourDash
          </h1>
          {/* Taglines scroller */ }
          <div
            className={ "relative whitespace-nowrap w-full animate__animated animate__slideInRight animate__delay-500ms" }
          >
            <span
              className={ "absolute flex items-end text-end transition-all motion-reduce:transition-none duration-500" }
              style={ {
                right: taglineInd === 0
                  ? 0
                  : "-100%",
                opacity: taglineInd === 0
                  ? 1
                  : 0
              } }
            >
              Manage your files with ease
            </span>
            <span
              className={ "absolute flex items-end text-end transition-all motion-reduce:transition-none duration-500" }
              style={ {
                right: taglineInd === 1
                  ? 0
                  : "-100%",
                opacity: taglineInd === 1
                  ? 1
                  : 0
              } }
            >
              Collaborate seamlessly
            </span>
            <span
              className={ "absolute flex items-end text-end transition-all motion-reduce:transition-none duration-500" }
              style={ {
                right: taglineInd === 2
                  ? 0
                  : "-100%",
                opacity: taglineInd === 2
                  ? 1
                  : 0
              } }
            >
              Make it your own
            </span>
          </div>
          <div
            className={ "flex gap-4 pt-7 items-center justify-center animate__animated animate__fadeIn animate__delay-750ms" }
          >
            <Link
              to={ "/login" }
              className={ "pl-4 pr-4 pb-1.5 pt-1.5 hover:bg-theme-500 active:bg-theme-400 bg-theme-600 transition-colors select-none cursor-pointer rounded-full animate__animated animate__tada animate__delay-1s" }
            >
              Login
            </Link>
            <Link
              to={ "/login/signup" }
              className={ "hover:text-theme-500 active:text-theme-400 text-theme-200 transition-colors select-none cursor-pointer" }
            >
              Signup
            </Link>
          </div>
        </div>
        <div className={ "relative md:block hidden" }>
          <img
            className={ "w-24 absolute top-36 left-56 aspect-square animate__animated animate__bounceInDown animate__1000ms hover:top-32 transition-[var(--transition)] shadow-2xl rounded-3xl" }
            src={ "/assets/promo-apps/store.png" }
            alt={ "" }
          />
          <img
            className={ "w-24 absolute top-44 left-36 aspect-square animate__animated animate__bounceInDown animate__750ms hover:top-40 transition-[var(--transition)] shadow-2xl rounded-3xl" }
            src={ "/assets/promo-apps/code-studio.png" }
            alt={ "" }
          />
          <img
            className={ "w-24 absolute top-36 left-16 aspect-square animate__animated animate__bounceInDown animate__500ms hover:top-32 transition-[var(--transition)] shadow-2xl rounded-3xl" }
            src={ "/assets/promo-apps/checklist.png" }
            alt={ "" }
          />
          <img
            className={ "w-24 absolute top-40 left-0 aspect-square animate__animated animate__bounceInDown animate__250ms hover:top-36 transition-[var(--transition)] shadow-2xl rounded-3xl" }
            src={ "/assets/promo-apps/files.png" }
            alt={ "" }
          />
        </div>
      </section>
      { /*TODO: fix css styling defaults*/ }
      <section
        className={ "pt-8 flex justify-between items-center gap-4 ml-auto mr-auto grid-cols-1 max-w-5xl w-full lg:grid-cols-2 xl:grid-cols-3 pl-8 pr-8 mb-10" }
      >
        <h3 className={ "text-7xl font-black animate__animated animate__fadeInLeft animate__500ms animate__slow" }>
          Host Your
          <br/>
          Own
        </h3>
        <div className={ "flex items-end gap-4 flex-col animate__animated animate__fadeInRight animate__500ms animate__slow relative" }>
          <span className={ "w-72 text-right text-2xl" }>
            Run a single command and be up-and-running within minutes
            <span className={ "text-base font-thin text-gray-300" }>
              *
            </span>
          </span>
          <MajorButton onClick={ () => {
            navigate( "/docs/get-started" )
          } }
          >
            Get Startedf
          </MajorButton>
          <span className={ "text-xs text-gray-400 absolute top-full mt-2" }>
            *On linux devices only
          </span>
        </div>
      </section>
      <section
        className={ "text-3xl font-semibold pt-8 grid gap-4 ml-auto mr-auto grid-cols-1 max-w-5xl w-full lg:grid-cols-2 xl:grid-cols-3 pl-8 pr-8" }
      >
        <Card className={ "flex items-center justify-center text-center" }>
          <h1 className={ "font-medium text-2xl tracking-wide" }>Host your own</h1>
        </Card>
        <Card className={ "flex items-center justify-center text-center" }>
          <h1 className={ "font-medium text-2xl tracking-wide" }>Limitless personalization</h1>
        </Card>
        <Card className={ "flex items-center justify-center text-center" }>
          <h1 className={ "font-medium text-2xl tracking-wide" }>Open sourced</h1>
        </Card>
      </section>
      <section className={ "flex items-center justify-center text-5xl font-bold pt-16 tracking-wide" }>
        Coming soon...
      </section>
    </main>
  )
}

export default Root
