const mongoose = require (`mongoose`);

const newUser = new mongoose.Schema ({
    name: {
        type: String,
        require:true
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        require:true
    },
    password:{
        type: String,
        require:true 
    }
})

const Register = new mongoose.model("Logindata", newUser)

module.exports = Register;