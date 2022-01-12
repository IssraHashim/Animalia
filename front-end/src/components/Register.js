import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [error, setError] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async(event) => {
    try {
      event.preventDefault()
      await axios.post('/api/register', formData)
      history.push('/login')

    } catch (err) {
      setError(err.response.data.errors)
    }
  }

  const handleClick = ()=>{
    history.push('/animals')
  }
  return (
    <section className='register'>
      <form className='column is-half is-offset-one-quarter box' onSubmit={handleSubmit}>
        <i className="far fa-window-close" onClick={handleClick}></i>
        <div className='title'> Sign Up</div>
        <div className='subtitle'>Welcome to the this awesome website, where we look at how awesome mother nature is. To sign up and contribute to our community, sign up below!</div>
        <label className='label'>Username</label>
        <p className='control'>
          <input className = 'input'
            placeholder = 'Username'
            name='username'
            value={formData.username}
            onChange={handleChange} />
        </p>
        {error.username && <p className='is-danger'>Username must be unique </p>}
        <label className='label'>Email</label>
        <p className='control'>
          <input className = 'input'
            placeholder = 'Email'
            name='email'
            value={formData.email}
            onChange={handleChange} />
        </p>
        {error.email && <p className='is-danger'>Email must be unique</p>}
        <label className='label'>Password</label>
        <div className='field'>
          <p className='control'>
            <input className = 'input'
              type='password'
              placeholder = 'Password'
              name='password'
              value={formData.password}
              onChange={handleChange}/>
          </p>
          {error.password && <p className='is-danger'>{error.password}</p>}
        </div>
        <label className='label'>Password Confirmation</label>
        <div className='field'>
          <p className='control'>
            <input className = 'input'
              type='password'
              placeholder = 'Password Confirmation'
              name='passwordConfirmation'
              value={formData.passwordConfirmation}
              onChange={handleChange} />
          </p>
          {error.passwordConfirmation && <p className='is-danger'>{error.passwordConfirmation.message}</p>}
        </div>
        <div className='field'>
          <p className='control'>
            <button type='submit' className='button is-warning is-fullwidth'>Sign Up</button>
          </p>
        </div>
      </form>
    </section>
  )
}

export default Register