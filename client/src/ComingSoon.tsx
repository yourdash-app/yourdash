import React from "react"

const ComingSoon: React.FC = () => (
  <div
    className={ "min-h-full w-full text-base-50 flex items-center justify-center text-5xl font-bold tracking-wide " +
                "flex-col gap-4" }
  >
    <span>Coming soon...</span>
    <a
      href={ "#/" }
      className={ "pl-8 pr-8 pb-1.5 pt-1.5 hover:bg-theme-500 active:bg-theme-400 bg-theme-600 transition-colors " +
                  "select-none cursor-pointer rounded-full text-xl font-normal tracking-normal" }
    >
      Home
    </a>
  </div>
)

export default ComingSoon
