

const checkPassword = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWTSECRET, (err, user) => {
            if(err){
                return res.status(404).json("invalid token")
            } 
            const authUser = await UserModel.findById(user.id)
            if(!authUser || (authUser.password != user.password)){
                res.redirect("/login")
            }
            next()
        })
    } else {
        return res.status(401).json("youre not authorized")
    }
}


module.exports = checkPassword