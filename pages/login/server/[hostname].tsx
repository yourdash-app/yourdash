import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ServerSelectionLink() {
  const router = useRouter();
  useEffect(() => {
    let hostname = router.query.hostname as string
    if (!hostname) {
      router.push("/login/")
      return
    }
    // the hostname has been set and now can be used to set the current server if one doesn't already exist.
    if (hostname === "") {
      router.push("/login/")
      return
    }

    if (!hostname.startsWith("https://") && !hostname.startsWith("http://")) {
      router.push("/login/")
      return
    }
    if (hostname.startsWith("https://.") || hostname.startsWith("http://.")) {
      router.push("/login/")
      return
    }
    if (!hostname.includes(".")) {
      router.push("/login/")
      return
    }
    if (hostname.endsWith(".")) {
      router.push("/login/")
      return
    }

    fetch(hostname + "/test")
      .then(res => res.text())
      .then(text => {
        if (text === "yourdash instance") {
          localStorage.setItem("currentServer", hostname)
          router.push("/login/instance")
        } else {
          router.push("/login/")
          return
        }
      })
      .catch(() => {
        router.push("/login/")
        return
      })
  }, [router])
  return <h1>Redirecting</h1>
}
