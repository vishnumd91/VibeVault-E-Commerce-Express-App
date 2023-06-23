import RegistrationSchema from "../models/registrationSchema.js";

const userRegistration = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;
    if (!name || !email || !contact || !password) {
      res.status(400);
      throw new Error("All fields are mandatory !");
    }
    // Check if the email already exists in the database
    const existingUser = await RegistrationSchema.findOne({ email: email });

    if (existingUser) {
      // If the user already exists, return an error
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // Create a new instance of the User model
    const newUser = new RegistrationSchema({
      name,
      email,
      contact,
      password,
    });
    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default userRegistration;
