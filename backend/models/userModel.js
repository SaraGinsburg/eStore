import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    //part of mongoose that allows us to see whether a field was modified
    next()
  }
  const salt = await bcrypt.genSalt(10) //salt will hash the password asynchronously, bcrypt returns a promise so we must have await
  this.password = await bcrypt.hash(this.password, salt) //password pertains to the user being created, his password, it takes in the salt as a second argument
})
const User = mongoose.model('User', userSchema)

export default User
