"use client"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()
  if (status != "authenticated") return <>Not Authenticated</>
  return (
    <>Authenticated</>
  )
}
