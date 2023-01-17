import React, { useState, useEffect } from 'react'
import { supabase } from './SupaBaseClient'
import Avatar from './Avatar'

export default function Account({ session }) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [company, setCompany] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
        getProfile()
    }, [session])

    const getProfile = async () => {
        try {
            setLoading(true)
            const { user } = session

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, company, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setCompany(data.company)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { user } = session

            const updates = {
                id: user.id,
                username,
                company,
                avatar_url,
                updated_at: new Date(),
            }

            let { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div  className='flex-right flex'>
            <div className='topTable'>
                <Avatar
                    url={avatar_url}
                    size={100}
                    onUpload={(url) => {
                        setAvatarUrl(url)
                        updateProfile({ username, company, avatar_url: url })
                    }}
                />
                <button type="button" className="button primary block" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </button>
            </div>
            
            {loading ? (
                'Saving ...'
            ) : (
                <form onSubmit={updateProfile} className="form-widget">
                    <div>Email: {session.user.email}</div>
                    <div>
                        <label htmlFor="username">Name</label>
                        <input
                            className="form-Inputs"
                            id="username"
                            type="text"
                            value={username || ''}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="website">Organization</label>
                        <input
                            id="website"
                            type="text"
                            value={company || ''}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="button primary block" disabled={loading}>
                            Update profile
                        </button>
                    </div>
                </form>
            )}
            
        </div>
    )
}

