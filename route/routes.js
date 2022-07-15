
const router = require("express").Router()
const userController = require("../controllers/userController")
const adminController = require("../controllers/adminController")
const presaleController = require("../controllers/presaleController")

const {verifiedAccessToken, verifiedAdminToken} = require("./verifyTokens")

// USER ROUTES

// create user
router.post("/user/register", userController.createUser)
// Verify User
router.get("/validate", userController.confirmEmail)
// login user
router.post("/user/login", userController.loginUser)
// Update User
router.put("/user/update/:id", userController.updateUser)
// Delete user
router.delete("/user/delete/:id", verifiedAdminToken, userController.deleteUser)
// Delete Spam Users
// router.delete("/user/all/delete", userController.deleteSpamUsers)
// Get one User
router.get("/user/get/:id",  userController.getOneUser)
// Get All Bscs
// router.get("/user/bscs/:id", verifiedAdminToken, userController.getAllBSCs)
// Get All Emails
router.get("/user/emails/:id", userController.getAllEmails)
// Search For Users
router.get("/user/search/:id", userController.searchUser)
// Search For Number of Users
router.get("/user/number/:id", verifiedAdminToken, userController.getNoUsers)
// Get All Users
router.get("/user/all/:id",  userController.getAllUsers)
// Forgot Passowrd
router.post("/user/forgotpass", userController.forgotPassword)
// Reset Passowrd
router.put("/user/resetpassword", userController.resetPassword)
// Get all Referrals
router.get("/user/referrals", userController.getReferredUsers)
// Send Amc
router.put("/user/sendamc", userController.sendAMC)
// Get History
router.get("/history/get/:id", verifiedAdminToken, userController.getHistory)



// ADMIN ROUTES

// create admin
router.post("/admin/register", adminController.createUser)
// login admin
router.post("/admin/login", adminController.loginUser)
// Update admin
router.put("/admin/update/:id", verifiedAdminToken, adminController.updateUser)
// Delete admin
router.delete("/admin/delete/:id", verifiedAdminToken, adminController.deleteUser)


// PRESALE ROUTES

// Create Presale
router.post("/presale/generate", presaleController.createPresale)
// Get All Users Presale
router.get("/presale/user/:id", presaleController.getUserPresale)
// Get All Presales
router.get("/presale/all/:id", presaleController.getAllPresales)
// GET TOTAL PRESALE AMOUNT
router.get("/presale/amount/get", presaleController.getAllPresaleAmount)
// Get Presales Bonus
router.get("/presale/bonus/:id", presaleController.getPresaleRefBonus)
// Delete Presale
router.delete("/presale/:id", presaleController.deletePresale)
// SEARCH Presale
router.get("/presale/search/:id", verifiedAdminToken, presaleController.searchPresale)
// GET USER PRESALE
router.get("/presale/ref/user", presaleController.getUserRefPresale)


module.exports = router