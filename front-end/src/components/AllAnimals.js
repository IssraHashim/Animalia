import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link }  from 'react-router-dom'

const AllAnimals = () => {
  const [animals, setAnimals] = useState([])

  useEffect(()=>{
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/animals')
        setAnimals(data)
      }
      getData()
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <>
      { animals.length > 0 ? 
        <section className='section is-large'>
          <div className='container'>
            <div className='columns is-multiline'>
              {animals.map(animal => {
                return (
                  <div key={animal._id} className='card column is-one-quarter-desktop is-one-third-tabled'>
                    <Link to={`/animals/${animal._id}`}>
                      <div className='card'>
                        <div className='card-image'>
                          <figure className='image is-5by4'>
                            <img src={animal.image} alt={animal.name}></img>
                          </figure>
                        </div>
                        <div className='card-content'>
                          <div className='card-header-title is-centered'>{animal.species}</div>
                        </div>
                        <div className='card-item is-centered'>
                          <div className='card-header-title is-centered' id='title'>{animal.name}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div> 
        </section>
        :
        <h1>Loading</h1>
      }
    </>
  )
}

export default AllAnimals