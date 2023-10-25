"use client"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from 'antd';

export default function Home() {

  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut();
    router.push("/signIn")
  };


  if (session == null) {
    router.push("/signIn")
    return
  }
  return (
    <>
      <div style={{ textAlign: "center" }}>Authenticated</div>

      <div className='sign-out'>
        <Button onClick={handleSignOut} type='primary'>SignOut</Button>
      </div></>
  )
}
