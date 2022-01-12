import React , { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const Login = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState(false)

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log(event.target.name)
    setFormData(newFormData)
  }

  const setItemToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      setItemToLocalStorage(data.token)
      history.push('/')
    } catch (err) {
      setError(true)
    }
  }


  return (
    <section className='register'>
      <form className='column is-half is-offset-one-quarter box' onSubmit={handleSubmit}>
        <div className='title '>Login</div>
        <div className='field'>
          <p className='control has-icons-left has-icons-right'>
            <input className='input' name='email' placeholder='Email' value={formData.email} onChange={handleChange}/>
            <span className='icon is-small is-left'>
              <i className='fas fa-envelope'></i>
            </span>
            {error && <p className='is-danger'>Username or password are incorrect</p>}
          </p>
        </div>
        <div className='field'>
          <p className='control has-icons-left'>
            <input className='input' type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange}/>
            <span className='icon is-small is-left'>
              <i className='fas fa-lock'></i>
            </span>
            {error && <p className='is-danger'>Username or password are incorrect</p>}
          </p>
        </div>
        <div className='field'>
          <p className='control'>
            <button className='button is-success'>
              Login
            </button>
          </p>
        </div>
      </form>
    </section>
  )
}

export default Login