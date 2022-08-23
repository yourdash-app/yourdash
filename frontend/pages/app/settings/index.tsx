import {useRouter} from "next/router"
import { useEffect } from "react"

export default function SettingsRedirectPage() {
  const router = useRouter()
  useEffect(() => {
    router.push("/app/settings/overview")
  })
  return <></>
}
