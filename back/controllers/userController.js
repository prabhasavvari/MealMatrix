const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {authMiddleware} = require ('../middleware/authMiddleware');

exports.getAllUsers = async(req, res) => {
  try {
    const allUsers = await User.find().lean();  //  Convert to plain JavaScript objects
    res.status(200).json(allUsers); 
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

exports.registerUser = async(req, res) => {
  try{
    const {email, password} = req.body;

    let user = await User.findOne({email});
    if(user) {
      res.status(400).json({message: 'User already exists'});
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword
    });


    await user.save();
    res.status(201).json({message: "User registered successfully", user})
  }
  catch (error){
    res.status(500).json({message: "Server error", error});
  }
}

exports.loginUser = async(req, res) => {
  try{
    const {email, password} = req.body;
  
    let user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "Invalid email"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message: "Invalid password"});

    //generate JWT token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ message: "Login successful", token });
  }
  catch(error) {
    res.status(500).json({ message: "server error", error });
  }
}

exports.getUserProfile = async(req, res) => {
  try{
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  }
  catch (error){
    res.status(500).json({message: "Server error", error});
  }
}

exports.updateUserProfile = async (req, res) => {
  try{
    const {name, email, password, phone, address} = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    /*const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      
      const hashedPassword = await bcrypt.hash(password, salt);
      password = hashedPassword;
    }*/
    
    // Update only if new values exist
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = address;

    if(password && !(await bcrypt.compare(password, user.password))){
      const salt = await bcrypt.genSalt(10)
      updateFields.password = await bcrypt.hash(password, salt);
    }

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set: updateFields }, { new: true });

    res.status(200).json({ message: "Profile updated successfully", updatedUser });
  }
  catch (error) {
    res.status(500).json({ message: "server error", error });
  }
}

exports.deleteUserProfile = async(req, res) => {
  try{
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).json({message: "User not found"});

    await user.deleteOne() //User.findByIdAndDelete(req.user._id);
    res.status(200).json({message: "user deleted successfully"});
  }
  catch (error) {
    res.status(500).json({ message: "server error", error });
  }
}
 