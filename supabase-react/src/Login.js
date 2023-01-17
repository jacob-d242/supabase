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
        <div className="row flex-center flex">
            <div className="col-6 form-widget" aria-live="polite">
                <h1 className="header">Magic Login Link with Supabase</h1>
                <p className="description">Enter Your Email to SignUp Below</p>
                {loading ? (
                    'Sending magic link...'
                ) : (
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="inputField"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="button block" aria-live="polite">
                            Get Link
                        </button>
                    </form>

                )}
            </div>
        </div>
    )
}