import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './SupaBaseClient'
import Account from './Account'
import Login from './Login'

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
    
      {!session ? <Login /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}