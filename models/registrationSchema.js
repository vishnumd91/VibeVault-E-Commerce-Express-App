import mongoose from "mongoose";

const registrationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const RegistrationSchema = mongoose.model("registration", registrationSchema);

export default RegistrationSchema;
