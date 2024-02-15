import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
 
const router = express.Router()

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body

    const user = await User.findOne({ email })
    const userName = await User.findOne({ username })

    if (user || userName) {
        return res.json({ message: "User Already exists" })
    }

    const hashpassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        username, email, password: hashpassword
    }) 

    await newUser.save()

    return res.json({
        status: true,
        message: "Account Created !!"
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
        return res.json({ message: "User Does not Exists" })
    }

    const validpassword = await bcrypt.compare(password, user.password)

    if (!validpassword) {
        return res.json({ message: "PASSWORD NOT CORRECT" })
    }

    const token = jwt.sign({
        username: user.username
    }, process.env.KEY, { expiresIn: '5m' })

    res.cookie('token', token, { 
        httpOnly: true, 
        maxAge: 360000, 
        secure: true
    });
 
    return res.json({
        status: true,
        message: "LOGGED IN SUCCESSFULLY"
    })
})

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ message: "USER DOES NOT EXISTS" })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.KEY,
            { expiresIn: '5m' }
        )

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'heelme1181@gmail.com',
                pass: 'ocif yuvz vwmo rstm'
             }
          });
          
          var mailOptions = {
            from: 'heelme1181@gmail.com',
            to: email,
            subject: 'reset password',
            text: `http://localhost:5173/resetpassword/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return res.json({ message : "ERROR !!!" })
            } else {
              return res.json({ message : "EMAIL SENT" })
            }
          });

    } catch(err){
        console.log(err)
    }
})

router.post('/reset-password/:token', async(req, res)=>{
    const { token } = req.params;
    const { password } = req.body;

    try{
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashpassword = await bcrypt.hash(password, 10)

        await User.findByIdAndUpdate({ _id:id }, { password: hashpassword })

        return res.json({
            status: true,
            message:"PASSWORD UPDATED"
        })
    } catch (err){
        return res.json(err)
    }
})

const verifyUser = ( req, res, next) =>{
    const token = req.cookies.token;

    try{
        if(!token){
            return res.json({
                status:false,
                message:"NO TOKEN RE BABA cHAL PHUT"
            })
        }
            const decoded = jwt.verify(token, process.env.KEY)
        next()

    }
    catch(err){
        return res.json(err)
    }
}

router.get('/verify', verifyUser, async (req , res)=>{

    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.KEY)
    const user = await User.findOne({ username: decoded.username })

    return res.json({
        status: true,
        message:"AUTHORIZED",
        data : {
            username: user.username,
            email: user.email
        }
    })
})


router.get('/logout', (req, res)=>{
   
    res.clearCookie('token')
    return res.json({ status: true })
})

export { router as UserRouter }