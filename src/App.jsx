//import './index.css'
import React,{ useState, useEffect } from 'react'
import SignIn from './components/SignIn'
//import { supabase } from './constants/supaBaseClient'

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <h1>moracha</h1>
      {/*<SignIn />*/}
      <h1>{process.env.REACT_APP_SUPABASE_ANON_KEY }</h1>
      {/*{!session ? <Login /> : <Account key={session.user.id} session={session} />}*/}
    </div>
  )
}