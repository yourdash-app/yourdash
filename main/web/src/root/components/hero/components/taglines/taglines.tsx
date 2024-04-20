/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component, createSignal, onCleanup, onMount } from "solid-js";

const IndexPageHeroTaglines: Component = () => {
  const [taglineIndex, setTaglineIndex] = createSignal(0);

  let interval: NodeJS.Timeout;

  onMount(() => {
    interval = setInterval(() => {
      if (taglineIndex() + 1 >= 3) {
        setTaglineIndex(0);
        return;
      }
      setTaglineIndex(taglineIndex() + 1);
    }, 2500);
  });

  onCleanup(() => {
    clearInterval(interval);
  });

  return (
    <div class={"relative whitespace-nowrap w-full animate__animated animate__slideInRight animate__500ms"}>
      <span
        class={"absolute flex items-end text-end transition-all motion-reduce:transition-none duration-500"}
        style={{
          right: taglineIndex() === 0 ? 0 : "-100%",
          opacity: taglineIndex() === 0 ? 1 : 0,
          scale: taglineIndex() === 0 ? "100%" : "0%",
        }}
      >
        Manage your files with ease
      </span>
      <span
        class={"absolute flex items-end text-end transition-all motion-reduce:transition-none duration-500"}
        style={{
          right: taglineIndex() === 1 ? 0 : "-100%",
          opacity: taglineIndex() === 1 ? 1 : 0,
          scale: taglineIndex() === 1 ? "100%" : "0%",
        }}
      >
        Collaborate seamlessly
      </span>
      <span
        class={"absolute flex items-end text-end transition-all motion-reduce:transition-none duration-500"}
        style={{
          right: taglineIndex() === 2 ? 0 : "-100%",
          opacity: taglineIndex() === 2 ? 1 : 0,
          scale: taglineIndex() === 2 ? "100%" : "0%",
        }}
      >
        Make it your own
      </span>
    </div>
  );
};

export default IndexPageHeroTaglines;
