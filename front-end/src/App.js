import React from 'react'
import AllAnimals from './components/AllAnimals'
import NavBar from './components/Navbar'
import OneAnimal from './components/OneAnimal'
import Register from './components/Register'
import Home from './components/Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import AddAnimal from './components/AddAnimal'

const App = () => {

  // eslint-disable-next-line no-unused-vars

  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/add' component={AddAnimal} />
          <Route exact path='/animals' component={AllAnimals} />
          <Route exact path='/animals/:id' component={OneAnimal} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login}  />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App