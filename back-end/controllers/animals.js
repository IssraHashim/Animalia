import Animal from '../models/animals.js'

export const getAllAnimals = async (req, res) => {
  const animals = await Animal.find()
  return res.status(200).json(animals)
}
export const addAnimal = async (req,res)=> {
  try {
    const newAnimal = { ...req.body, owner: req.currentUser._id }
    const animalToAdd = await Animal.create(newAnimal)
    return res.status(201).json(animalToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}
export const getSingleAnimal = async (req, res) => {
  try {
    const { id } = req.params
    const singleAnimal = await Animal.findById(id).populate('owner').populate('comments.owner').populate('spotted.owner')
    if (!singleAnimal) throw new Error()
    return res.status(200).json(singleAnimal)
  } catch (err) {
    return res.status(404).json( { 'message': 'This animal was not found' } )
  }
}

export const deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params
    const animalToDelete = await Animal.findById(id)
    if (!animalToDelete) throw new Error('Animal not found')
    if (!animalToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await animalToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json( { 'message': err.message })
  }
}
export const updateAnimal = async (req,res)=> {
  try {
    const { id } = req.params
    const animalToUpdate = await Animal.findByIdAndUpdate(id, req.body, { new: true })
    if (!animalToUpdate) throw new Error()
    return res.status(200).json(animalToUpdate)
  } catch (err) {
    return res.status(404).json( { 'message': 'This animal was not found' })
  }
}

export const addAComment = async (req, res) => {
  try {
    const { id } = req.params 
    const animal = await Animal.findById(id)
    if (!animal) throw new Error()
    const newComment = { ...req.body, owner: req.currentUser._id }
    animal.comments.push(newComment)
    await animal.save({ validateModifiedOnly: true })
    return res.status(200).json(animal)
  } catch (err) {
    return res.status(404).json({ 'message': 'something went wrong' })
  }
}

export const deleteAComment = async (req, res) => {
  try {
    const { id, commentId } = req.params
    const animal = await Animal.findById(id)
    if (!animal) throw new Error()
    const commentToDelete = animal.comments.id(commentId)
    if (!commentToDelete) throw new Error()
    if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error()
    await commentToDelete.remove()
    await animal.save( { validateModifiedOnly: true })
    return res.sendStatus(204)
  } catch (err) {
    return  res.status(404).json({ 'message': 'something went wrong' })
  }
}

export const addASpotting = async (req, res) => {
  try {
    const { id } = req.params
    const animal = await Animal.findById(id)
    if (!animal) throw new Error()
    const newSpotting = { ...req.body, owner: req.currentUser._id }
    animal.spotted.push(newSpotting)
    await animal.save({ validateModifiedOnly: true })
    return res.status(200).json(animal)
  } catch (err) {
    return res.status(404).json({ 'message': 'something went wrong' })
  }
}


export const deleteASpotting = async (req, res) => {
  try {
    const { id, spottingId } = req.params
    console.log(id)
    const animal = await Animal.findById(id)
    if (!animal) throw new Error()
    const spottingToDelete = animal.spotted.id(spottingId)
    console.log(spottingToDelete)
    if (!spottingToDelete) throw new Error()
    if (!spottingToDelete.owner.equals(req.currentUser._id)) throw new Error()
    await spottingToDelete.remove()
    await animal.save({ validateModifiedOnly: true })
    return res.sendStatus(204)
  } catch (err) {
    return res.status(404).json({ 'message': 'something went wrong' })
  }
}
