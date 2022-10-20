/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ServerSelectionLink() {
  const router = useRouter();
  useEffect(() => {
    let hostname = router.query.hostname as string
    if (!hostname) {
      router.push("/login/server")
      return
    }
    // the hostname has been set and now can be used to set the current server if one doesn't already exist.
    if (hostname === "") {
      router.push("/login/server")
      return
    }

    if (!hostname.startsWith("https://") && !hostname.startsWith("http://")) {
      router.push("/login/server")
      return
    }
    if (hostname.startsWith("https://.") || hostname.startsWith("http://.")) {
      router.push("/login/server")
      return
    }
    if (!hostname.includes(".")) {
      router.push("/login/server")
      return
    }
    if (hostname.endsWith(".")) {
      router.push("/login/server")
      return
    }

    fetch(hostname + "/test")
      .then(res => res.text())
      .then(text => {
        if (text === "yourdash instance") {
          localStorage.setItem("currentServer", hostname)
          router.push("/login/options")
        } else {
          router.push("/login/server")
          return
        }
      })
      .catch(() => {
        router.push("/login/server")
        return
      })
  }, [router])
  return <h1>Redirecting</h1>
}
