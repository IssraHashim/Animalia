import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const OneAnimal = () => {
  const [animal, setAnimal] = useState([])
  const { id } = useParams()

  useEffect(()=> {
    const getData = async() => {
      const { data } = await axios.get(`/api/animals/${id}`)
      setAnimal(data)
    }
    getData()
  }, [])
  console.log(animal)
  return (
    <>
      <section className='hero is-fullheight'>
        <div className='hero-body'>
          <div className='container'>
            <div>
              <div className='columns is-align-items-center'>
                <div className='column is-half'>
                  <h2 className='title is-2'>{animal.name}</h2>
                  <figure className='image is-4by3 '>
                    <img src={animal.image} alt={animal.name}></img>
                  </figure>
                </div>
                <div className='column is-half'>
                  <hr />
                  <h4>Species : {animal.species}</h4>
                  <h4>Class : {animal.class}</h4>
                  <h4 >Habitat : {animal.habitat}</h4>
                  <h4 >Diet : {animal.diet}</h4>
                  <h4 >Size : {animal.size} metres</h4>
                  <h4 >Average Life Span : {animal.averageLifeSpan}</h4>
                  <hr />
                  <h4 >Interesting Fact</h4>
                  <p>{animal.interestingFact}</p>
                  <hr />
                  {animal.owner && <h4>Added By {animal.owner.username}</h4>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OneAnimal