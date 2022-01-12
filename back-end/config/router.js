import express from 'express'
import { getAllAnimals, addAnimal, getSingleAnimal, updateAnimal, deleteAnimal, addAComment, deleteAComment, addASpotting, deleteASpotting } from '../controllers/animals.js'
import { loginUser, registerUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'


const router = express.Router()

router.route('/animals')
  .get(getAllAnimals)
  .post(secureRoute, addAnimal)

router.route('/animals/:id')
  .get(getSingleAnimal)
  .put(secureRoute, updateAnimal)
  .delete(secureRoute, deleteAnimal)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/animals/:id/comments')
  .post(secureRoute, addAComment)

router.route('/animals/:id/comments/:commentId')
  .delete(secureRoute, deleteAComment)

router.route('/animals/:id/spotting')
  .post(secureRoute, addASpotting)

router.route('/animals/:id/spotting/:spottingId')
  .delete(secureRoute, deleteASpotting)


export default router