import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ServerSelectionLink() {
  const router = useRouter();
  useEffect(() => {
    if (!router.query.hostname) return
    console.log(router.query.hostname)
    let hostname = decodeURIComponent(router.query.hostname as string)
    if (!hostname) {
      router.push("/login")
    }

    if (hostname === "") {
      router.push("/login")
    }

    if (!hostname.startsWith("https://") && window.location.port !== "3000") {
      router.push("/login")
    }

    if (hostname !== "http://localhost") {
      if (!hostname.includes(".")) {
        router.push("/login")
      }
      if (hostname.endsWith(".")) {
        router.push("/login")
      }
      if (hostname.endsWith("/")) {
        hostname = hostname.split("/")[0]
      }
    }

    fetch(`${hostname}:3560/test`)
        .then(res => res.text())
        .then(text => {
          if (text === "yourdash instance") {
            localStorage.setItem("currentServer", `${hostname}:3560`)
            router.push("/login/server")
          } else {
            router.push("/login")
          }
        })
        .catch(() => {
          router.push("/login/server")
        })
  }, [ router ])
  return <h1>Redirecting</h1>
}
