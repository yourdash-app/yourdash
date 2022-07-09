import React from "react";

export default function Header(props: { title: string }) {
  return (
    <div className={`w-full font-extrabold text-5xl flex h-56 mb-16 items-center justify-center text-text-primary shadow-2xl bg-content-normal`}>
      <h1>{props.title}</h1>
    </div>
  );
}
