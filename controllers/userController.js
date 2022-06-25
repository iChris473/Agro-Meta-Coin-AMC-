
const User = require("../models/User")
const Token = require("../models/Token")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const sendMail = require("../middleware/sendMail")
const History = require("../models/History")

exports.createUser = async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        bsc: req.body.bsc,
        userid: crypto.randomBytes(3).toString("hex"),
        referrer: req.body.referrer,
        amount: 2500,
        validated: true
    })
    try {
              
    //   if(!req.body.email.includes("@gmail") || !req.body.email.includes("@yahoo") || !req.body.email.includes("@outlook") || !req.body.email.includes("@hotmail")){
    //     return res.status(401).json("Please use a valid email")
    //   }
      if( !( req.body.email.includes("@gmail") ||  
             req.body.email.includes("@hotmail") || 
             req.body.email.includes("@yahoo") ||
             req.body.email.includes("@outlook") ) )
        {

        return res.status(401).json("Please use a valid email")

      }
        const oldEmail = await User.findOne({email: req.body.email})

        if(oldEmail) return res.status(401).json("A user is registered with this email")

        const oldBsc = await User.findOne({bsc: req.body.bsc})

        if(oldBsc) return res.status(401).json("A user is registered with this Address")

         await newUser.save();

        // const token = await new Token({
        //     userId: newUser._id,
        //     token: crypto.randomBytes(32).toString("hex")
        // }).save()

        // const url = `https://agrometacoin.herokuapp.com/api/validate?token=${token.token}&id=${newUser._id}`

        // const message = `
        // <h1>Complete the process of creating an account with 
        // AGRO-META COIN (Pride Lands Dynasty PLD)</h1>
        // <p>Please click the link below to confirm your email </p>
        // <a href=${url} clicktracking=off>${url}</a>
        // `
        // await sendMail(req.body.email, "Verify Email", message)

        return res.status(201).json("Registration Complete")
        // return res.redirect("/checkemail")

    } catch (error) {
        res.status(400).json("An error occured while trying to creat account")
    }
}

// Confirm Email
exports.confirmEmail = async (req, res) => {
    const {id, token} = req.query;
    try {
       
        const thisUser = await User.findById(id)

        if(!thisUser) return res.status(400).json("A user is not registered via this emnail")

        const thisToken = await Token.findOne({
            userId: thisUser._id,
            token
        })
        
        if(!thisToken) return res.status(400).json("Invalid Link");

        await User.findOneAndUpdate(
            {
                _id: thisUser._id
            }, {
                $set: {
                    validated: true
                }
            },{new: true}
        );

        await Token.findByIdAndDelete(thisToken._id)
        
        return res.redirect("/confirmed")

    } catch (error) {
        return res.status(404).json("Oops An error Occured")
    }
}

// Login User
exports.loginUser = async  (req, res) => {
    try {
        // finds user by email
        const user = await User.findOne({  bsc: req.body.bsc })
        if(!user){
            return res.status(401).json("An account is not registered with this BSC address")
        }
        // if (!user.validated) {

        //   const validateToken = await Token.findOne({ userId: user._id });
        //   if (!validateToken) {
        //     const token = await new Token({
        //       userId: user._id,
        //       token: crypto.randomBytes(32).toString("hex"),
        //     }).save();

        //     const url = `https://agrometacoin.herokuapp.com/api/validate?token=${token.token}&id=${user._id}`;

        //     const message = `
        //     <h1>Complete the process of becoming a citizen of NairaCity</h1>
        //     <p>Please click the link below to confirm your email </p>
        //     <a href=${url} clicktracking=off>${url}</a>
        //     `;
        //     await sendMail(user.email, "Verify Email", message);
        //   }
        //   return res
        //     .status(200)
        //     .json("Check your Inbox or spam to verify your Email");
        // }

        // compares password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        
        if(!validPassword) return res.status(404).json("Incorrect password")

        // sends JSON_WEB_TOKEN
        const token = user.getSignedToken()
        
        // // hides password from client
        const { password, ...others} = user._doc

        return res.status(200).json({...others, token})
        

    } catch (err) {
        return res.status(404).json("An error occured")
    }
}

exports.updateUser = async(req, res) => {
    
    const { p } = req.query;

    try {
        
        const oldUser = await User.findById(req.params.id)

        let newUser = {...req.body}

        // IF UPDATE CONTAINS EMAIL
        if(req.body.email){

            const registered = await User.findOne({email: req.body.email})

            if(registered) return res.status(401).json("An Account is registered with this email")

            const correctPassword = await bcrypt.compare(p, oldUser.password);

            if (!correctPassword) return res.status(401).json("InCorrect Password");

            newUser = {
                ...req.body,
                modified: true
            }
        }

        // IF UPDATE CONTAINS BSC
        if(req.body.bsc){

            const correctPassword = await bcrypt.compare(p, oldUser.password);

            if (!correctPassword) return res.status(401).json("InCorrect Password");

        }

        // IF UPDATE CONTAINS PASSWORD
        if (req.body.password) {
          // checks password
          const validPassword = await bcrypt.compare(p, oldUser.password);

          if (!validPassword) return res.status(401).json("InCorrect Password");

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          req.body.password = hashedPassword;

          newUser = {
              ...req.body,
              modified: true
          }

        }
        
        const user = await User.findOneAndUpdate(
            {
                _id: req.params.id
            }, {
                $set: newUser
            },{new: true}
        );
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.query.id)
        return res.status(200).json("User Account deleted")
    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.deleteSpamUsers = async (req, res) => {

    try {
        
        // await User.deleteMany({email: {
        //     $regex: /@dilanfa @musezoo @falkyz @krunsea @nzaif @game4hr/i
        // }})
        // g h y o
        
        const resData = await User.deleteMany( { email: { $in: [/@a/, /@b/, /@c/, /@d/, /@e/, /@f/, /@iide/, /@j/, /@k/, /@l/, /@m/, /@n/, /@p/, /@q/, /@r/, /@s/, /@l/, /@m/, /@n/, /@o/, /@p/, /@q/, /@r/, /@s/, /@t/, /@u/, /@v/, /@w/, /@x/, /@z/] } } )

        // const allData = await User.find()

        // let count = 0

        // for(const spam of allData){

        //     if( !( spam.email.includes("@gmail") || spam.email.includes("@hotmail")) || spam.email.includes("@yahoo") || spam.email.includes("@outlook")  ){
        //         console.log(spam)
        //         spam.remove()
        //         count++
        //         console.log(count)
        //     }

        // }
        
        return res.status(200).json(resData)
    
    } catch (error) {

        return res.status(400).json(error)

    }

}

// get a user
exports.getOneUser = async (req, res) => {

    try {

       const user = await User.findById(req.query.id)

       const {password, createdAt, updatedAt, ...others} = user._doc

       return res.status(200).json(others)

    } catch (err) {
        
        return res.status(404).json(err) 
    }
}


// Get all users
exports.getNoUsers = async (req, res) => {

    try {

        const total = await User.countDocuments()
     
        return res.status(200).json(total)

    } catch (err) {
       return res.status(401).json(err) 
    }
} 

// Forgot Password

exports.forgotPassword = async (req, res) => {

    const {email} = req.body

    try {
        const user = await User.findOne({email})

        if(!user) return res.status(400).json("Please enter the email used in creating your account")

        const resetToken = user.getResetPasswordToken()

        await user.save();

        const resetUrl = `https://www.agrometacoin.com/updatepass?resettoken=${resetToken}`

        const message = `
            <h1>You have requested for a password reset</h1>
            <p>Please click the link below to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            await sendMail(
                user.email,
                'Password reset request',
                message
            )

            return res.status(200).json('Email Sent')

        } catch (error) {

            user.resetPasswordToken = undefined;
            await user.save()

            return res.status(500).json('Email could not be sent')
        }

    } catch (err) {
        return res.status(500).json('An error occured sening the email')
    }
}

// Reset Password
exports.resetPassword = async (req, res) => {

    const resetPasswordToken = crypto.createHash('sha256').update(req.query.resettoken).digest('hex')

    try {
        const user = await User.findOne({
            resetPasswordToken,
        })

        if(!user) return res.status(400).json('Invalid Reset Token')

        user.password = req.body.password;
        user.resetPasswordToken = undefined;

        await user.save()

        return res.status(200).json("Password changed")

    } catch (error) {
        return res.status(400).json('An error occured while resetting the password')
    }
}


exports.getReferredUsers = async (req, res) => { 

    try {

        const referred = await User.find({referrer: req.query.userid})

        return res.status(200).json(referred)
        
    } catch (error) {
        return res.status(400).json('An error occured while trying to get referrals')
    }
}



exports.sendAMC = async (req, res) => { 

    const { senderId, recieverId, coins, type } = req.body

    try {

        // History Model
        const newHistory = new History({
            sender: senderId,
            receiever: recieverId,
            wallet: type,
            amount: coins
        })        

        const sender = await User.find({bsc:senderId})
        const reciever = await User.find({bsc:recieverId})

        if(sender[0][type] < parseInt(coins)) return  res.status(404).json("Insufficient Coins")

        await User.findOneAndUpdate(
            {
                bsc: senderId
            }, {
                $set: {
                    [type]: (sender[0][type] - parseInt(coins)),
                    amount: (sender[0]['amount'] - parseInt(coins))
                }
            },{new: true}
        );
        
        await User.findOneAndUpdate(
            {
                bsc: recieverId
            }, {
                $set: {
                    amount: (reciever[0]['amount'] + parseInt(coins)),
                    receieved: (reciever[0]['receieved'] + parseInt(coins))
                }
            },{new: true}
        );

        await newHistory.save()

        return res.status(200).json("Transaction Complete")
        
    } catch (error) {
        console.log(error)
        return res.status(400).json('An error occured while trying to send amcs')
    }
}

// Get all users
exports.getHistory = async (req, res) => {
    try {
       const history = await History.find({})
       return res.status(200).json(history)
    } catch (err) {
        return res.status(404).json(err) 
    }
}

// Get all users
exports.getAllUsers = async (req, res) => {

    try {

        let query = User.find();
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.limit) || 3
        const skip = (page - 1) * pageSize
        const total = await User.countDocuments()
        const pages = Math.ceil( total / pageSize )
        query = query.skip(skip).limit(pageSize)
        const results = await query

        if(page > pages) {
            return res.status(404).json('page not found')
        }

        return res.status(200).json({
            count: results.length,
            page,
            pages,
            data: results
        })

    } catch (err) {
       return res.status(401).json(err) 
    }
}

// find a user by number phone username or fullname 
exports.searchUser = async (req, res) => {
    const {user} = req.query
    try {
        // const allUsers = User.find()
        let query = User.find();
        const page = parseInt(req.query.page) || 17
        const pageSize = parseInt(req.query.limit) || 10000
        const skip = (page - 1) * pageSize
        const total = await User.countDocuments()
        const pages = Math.ceil( total / pageSize )
        query = query.skip(skip).limit(pageSize)
        const allUsers = await query

        
        const filteredUsers = allUsers
        .filter(
            u => 
                 u.bsc.toLowerCase().includes(user.toLowerCase()) ||
                 u.email.toLowerCase().includes(user.toLowerCase())
        )
        .sort((a,b) => {
            if(a.createdAt > b.createdAt) return -1
            if(a.createdAt < b.createdAt) return 1
        })

        return res.status(200).json(filteredUsers)

    } catch (err) {
        return res.status(400).json(err)
    }
}

exports.getAllBSCs = async (req, res) => {

    try {

        const totalBsc = []

        const users = await User.find()
         
        for(u of users){

            // await User.find({referrer: u.userid})

            totalBsc.push({
                bsc: u.bsc,
                Airdrop: u.airdropAmount,
                Referral: u.refAmount,
                Total: u.amount
            }) 

        }
       
        return res.status(200).json(totalBsc)
        
    } catch (error) {
        return res.status(400).json('An error occured')
    }

}

exports.getAllEmails = async (req, res) => {

    try {

        const totalEmail = []

        let query = User.find();
        const page = parseInt(req.query.page) || 9
        const pageSize = parseInt(req.query.limit) || 1000
        const skip = (page - 1) * pageSize
        const total = await User.countDocuments()
        const pages = Math.ceil( total / pageSize )
        query = query.skip(skip).limit(pageSize)
        const allUsers = await query
         
        for(u of allUsers){

            // const refs = await User.countDocuments({referrer: u.userid})
            // console.log((refs * 5000))

            totalEmail.push(
                {
                    BSC: u.bsc,
                    Emails: u.email,
                    Airdrop: u.airdropAmount,
                    Referral: u.refAmount,
                    Total: u.amount
                }
            ) 
        }
       
        return res.status(200).json({
            count: allUsers.length,
            page,
            pages,
            data: totalEmail
        })
        
    } catch (error) {
        return res.status(400).json('An error occured')
    }

}