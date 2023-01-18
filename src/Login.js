import React, { useState } from 'react'
import { supabase } from './SupaBaseClient'


export default function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithOtp({ email })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            alert(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="Container">
            <div className="FormWrap" >
                <h1 className="Heading">Magic Login Link with  + React</h1>
                <p className="Description">Enter Your Email to SignUp Below</p>
                {loading ? (
                    'Sending magic link...'
                ) : (
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                            <input
                                className='InputField'
                            id="email"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="Button" aria-live="polite">
                            Get Link
                        </button>
                    </form>

                )}
            </div>
        </div>
    )
}