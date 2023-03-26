import React from "react"
import Dialog from "./Dialog";

export interface IDialogMessage {
  title: string,
  message: string,
  onConfirm: () => void
}

const DialogMessage: React.FC<IDialogMessage> = ({ title, message, onConfirm }) => {
  return <Dialog dontAllowClosing={ true }>
    <h1 className={ `text-2xl font-bold text-center mt-2` }>{ title }</h1>
    <p className={ `text-center` }>{ message }</p>
    <button
        className={ `w-full pt-2 pb-2 pl-4 pr-4 hover:bg-theme-600 active:bg-theme-500 bg-theme-700 transition-colors select-none cursor-pointer` }
        onClick={ () => {
          onConfirm()
          return 0 /* FIXME: actually remove the dialog
           */
        } }>Ok
    </button>
  </Dialog>
}

export default DialogMessage
