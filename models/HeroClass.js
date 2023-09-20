import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const heroClassSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

heroClassSchema.plugin(paginate)

const HeroClass = mongoose.model('HeroClass', heroClassSchema)
export default HeroClass
