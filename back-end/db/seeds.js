import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import animalsData from './data/animals.js'
import Animal from '../models/animals.js'
import userData from './data/users.js'
import User from '../models/user.js'


const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('👍Connected to DB')

    await mongoose.connection.db.dropDatabase()
    console.log('DB has been dropped')

    const users = await User.create(userData)
    const animalsWithOwners = animalsData.map(animal => {
      animal.owner = users[0]._id
      return animal
    })    

    const animals = await Animal.create(animalsWithOwners)
    console.log(`🌱 DB has been created with ${animals.length} animals`)

    await mongoose.connection.close()
    console.log('✌️ connection to DB closed')

  } catch (err) {
    console.log(err)
    console.log('🚨 something has gone wrong seeding the db')
    await mongoose.connection.close()
    console.log('✌️ connection to DB closed')
  }
}

seedDatabase()