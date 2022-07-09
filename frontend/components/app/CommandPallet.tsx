import { useRouter } from "next/router";
import React, { useEffect, createRef } from "react";

export default function CommandPallet() {
  const router = useRouter();
  let [visible, toggleVisibility] = React.useState(false);
  let [options, setOptions] = React.useState([
    {
      title: "Home",
      icon: "home",
      onClick: () => {
        router.push("/app/home");
      },
    },
  ]);
  let inputRef = (createRef() as any) as { current: HTMLInputElement };
  useEffect(() => {
    let listener = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        event.preventDefault();
        inputRef.current.focus();
        toggleVisibility(!visible);
        inputRef.current.value = "";
      }
      if (event.key === "Escape") {
        if (visible) {
          event.preventDefault();
          toggleVisibility(false);
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });
  return (
    <div
      onClickCapture={e => {
        if (e.target === inputRef.current) return;
        toggleVisibility(false);
      }}
      className={`fixed z-50 top-0 left-0 w-full h-screen bg-content-dark bg-opacity-50 ${
        visible ? "block" : "hidden"
      } flex items-center justify-center`}>
      <div className="w-1/2 h-max-content bg-content-dark text-text-primary shadow-2xl p-4 rounded-xl border-2 border-content-border">
        <input
          type="text"
          placeholder="Enter a command here"
          ref={inputRef}
          className={`w-full p-2 bg-content-normal rounded-lg shadow-lg text-xl text-center`}
        />
        <div className={`w-full shadow-inner mt-4 bg-content-normal p-1 rounded-lg`}>
          <button className={`w-full p-1 bg-content-dark rounded-md text-lg font-medium tracking-wide`}>Test</button>
        </div>
      </div>
    </div>
  );
}
