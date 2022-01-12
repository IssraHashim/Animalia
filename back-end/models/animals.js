import mongoose from 'mongoose'
import UniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 200 },
  image: { type: String },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
},
{
  timestamps: true
})

const spottingSchema = new mongoose.Schema({
  place: { type: String, required: true, maxlength: 100 },
  comment: { type: String, maxlength: 100 }, 
  image: { type: String },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
},
{
  timestamps: true
})

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  species: { type: String, required: true, unique: true },
  class: { type: String, required: true },
  image: { type: String, required: true },
  interestingFact: { type: String, required: true, maxlength: 500 },
  habitat: { type: String, required: true },
  diet: { type: String, required: true },
  size: { type: Number },
  averageLifeSpan: { type: String }, 
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema], 
  spotted: [spottingSchema]
})


animalSchema.plugin(UniqueValidator)
export default mongoose.model('Animal', animalSchema)