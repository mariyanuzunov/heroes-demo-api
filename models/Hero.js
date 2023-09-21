import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const heroSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    race: { type: mongoose.Schema.Types.ObjectId, ref: 'HeroRace', required: true },
    avatar: { type: String, required: true },
    extraAbilities: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
)

heroSchema.plugin(paginate)

const Hero = mongoose.model('Hero', heroSchema)
export default Hero
