import React from "react";
import Header from "./components/Header";

const Root: React.FC = () => {
  return <main className={ `bg-base-900 min-h-screen` }>
    <Header/>
    <section
        className={ `w-full h-[30rem] overflow-hidden relative bg-base-800 [clip-path:_polygon(0_0,_100%_0%,_100%_85%,_0%_100%);]` }>
      <div>
        <h1>
          YourDash
        </h1>
        {/* Taglines scroller */ }
        <div>
          <span>
            Manage your files with ease
          </span>
          <span>
            Collaborate seamlessly
          </span>
          <span>
            Make it your own
          </span>
        </div>
      </div>
      <div>
        <div>
          <a>Login</a>
          <a>Signup</a>
        </div>
      </div>
    </section>
  </main>
}

export default Root
