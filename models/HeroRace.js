import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const heroRaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'HeroClass', required: true },
    abilities: [{ type: String }]
  },
  {
    timestamps: true
  }
)

heroRaceSchema.plugin(paginate)

const HeroRace = mongoose.model('HeroRace', heroRaceSchema)
export default HeroRace
