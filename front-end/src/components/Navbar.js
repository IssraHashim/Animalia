import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/Auth'




const NavBar = () => {
  
  const history = useHistory()
  const location = useLocation()
  useEffect(()=> {

  }, [location.pathname])


  const handleLogout = ()=> {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <>
      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              <Link to='/'>Home</Link>
            </a>
            <a className="navbar-item">
              <Link to='/animals'>See All</Link>
            </a>

            
          </div>
          <div className="navbar-end">
            { userIsAuthenticated() ?
              <>
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">
                    More
                  </a>
                  <div className="navbar-dropdown">
                    <a className="navbar-item">
                      <Link to='/add'>Add a New Animal</Link>
                    </a>
                    <a className="navbar-item">
                    About
                    </a>
                    <a className="navbar-item">
                    </a>
                    <hr className="navbar-divider"></hr>
                    <a className="navbar-item">
                    Contact us
                    </a>
                  </div>
                </div>
                <div className="navbar-item">
                  <div className="buttons">
                    <a className="button is-light" >
                      <Link to='#' onClick={handleLogout}>Log out</Link>
                    </a>
                  </div>
                </div>
              </>
              :
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-warning">
                    <strong><Link to='/register' >Sign up</Link></strong>
                  </a>
                  <a className="button is-light">
                    <Link to='/login' >Log in</Link>
                  </a>
                </div>
              </div>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar