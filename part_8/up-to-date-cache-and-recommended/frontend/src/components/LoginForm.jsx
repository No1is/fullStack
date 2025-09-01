import { useMutation, useApolloClient } from "@apollo/client";
import { useState, useEffect } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setMessage, setPage, setToken }) => {
    const client = useApolloClient()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN, { 
      onError: (error) => {
        setMessage(error.graphQLErrors[0].message)
      }
    })

    useEffect(() => {
      (async () => {
        const token = result.data?.login?.value
        if (!token) return

        localStorage.setItem('library-user-token', token)

        await client.resetStore()
        setToken(token)
        setPage('authors')
      })()
    }, [result.data])

    const handleLogin = async (event) => {
      event.preventDefault()
        
      await login({ variables: { username, password } })
        
      setPassword('')
      setUsername('')
    }
        

    if(!show) return null

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username:
                    <input 
                      value={username}
                      onChange={({ target }) => setUsername(target.value)}
                      autoComplete="username"
                      required
                    />
                </div>
                <div>
                    password:
                    <input
                      type='password' 
                      value={password}
                      onChange={({ target }) => setPassword(target.value)}
                      autoComplete="current-password"
                      required
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm