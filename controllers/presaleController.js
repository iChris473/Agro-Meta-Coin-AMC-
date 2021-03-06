
const Presale = require("../models/Presale")
const AdminPresale = require("../models/AdminPresale")

exports.createPresale = async (req, res) => { 

    try {

        
        // USER PRESALE
        const newPresale = new Presale(req.body)
        
        const oldPresale = await Presale.findOne({ userId: req.body.userId })

        if(oldPresale){

            let recentPresale = {...req.body}

            if(req.body.amount){
                recentPresale.amount = (parseInt(req.body.amount) * 1000)
            }


            if(req.body.paymentId){
                
                const {paymentId, ...others} = oldPresale._doc
                
                recentPresale = {...others, paymentId: paymentId.concat(req.body.paymentId)}

            }

            // ADMIN PRESALE

            const {amount, ...adminPresaleBody} = req.body

            const newAdminPresale = new AdminPresale({
                ...adminPresaleBody,
                amount: (parseInt(amount) * 1000)
            })

            const oldAdminPresale = await AdminPresale.findOne({ adminPaymentId: req.body.adminPaymentId })

            if (oldAdminPresale) {

                await AdminPresale.findOneAndUpdate(
                    {
                        adminPaymentId: req.body.adminPaymentId
                    }, {
                    $set: { 
                        ...adminPresaleBody,
                        amount: (parseInt(amount) * 1000),
                        bonus: oldPresale.bonus || 0
                    }
                }, { new: true }
                )

            } else {

                req.body.adminPaymentId && await newAdminPresale.save()
            }
            // END ADMIN PRESALE


            const updatePresale = await Presale.findOneAndUpdate(
                {
                    userId: req.body.userId
                }, {
                    $set: recentPresale
                },{new: true}
            )

            
            return res.status(201).json(updatePresale)
        }

        if(!req.body.bsc) return res.status(400).json("An error occured")

        await newPresale.save()

        return res.status(201).json(newPresale) 
        
        // END OF USER PRESALE

    } catch (error) {
        console.log(error)
        return res.status(400).json("An error occured while trying to create presale")
    }
}

exports.updatePresaleBonus = async (req, res) => {

    try {

        await Presale.findOneAndUpdate(
            {
                userId: req.body.userId
            }, {
            $set: { bonus: req.body.bonus }
        }, { new: true })

        return res.status(200).json("BONUS UPDATED")
        
    } catch (error) {
        console.log(error)
    }

}

exports.getUserPresale = async (req, res) => {
    try {

        const presale = await Presale.findOne({userId: req.params.id})

        return res.status(200).json(presale)

    } catch (error) {
        return res.status(400).json("An error occured while trying to get presale")
    }
}

exports.getPresaleRefBonus = async (req, res) => {

    try {

        const userPresale = await Presale.findOne({userId: req.params.id}) 

        const referrals = await Presale.find({userId: userPresale.ref})

        const grandRefs = await Presale.find({userId: userPresale.grandRef})

        let totalAmount = 0

        if(referrals){

            for(const value of referrals){
                totalAmount += parseInt(value.refAmount)
            }

        }

        if(grandRefs){

            for(const value of grandRefs){
                totalAmount += parseInt(value.grandRefAmount)
            }    

        }

        return res.status(200).json(totalAmount)

    } catch (error) {
        return res.status(400).json("An error occured while trying to get presale")
    }

}

exports.getAllPresales = async (req, res) => {
    
    try {

        let query = AdminPresale.find({amount: {$gt: 0}});
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.limit) || 10
        const skip = (page - 1) * pageSize
        const total = await Presale.countDocuments()
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

    } catch (error) {
        return res.status(400).json("An error occured while trying to get presales")
    }

}
exports.getAllPresaleAmount = async (req, res) => {
    
    try {

        let totalPresaleAmnt = 0

        let mainQuery = Presale.find({amount: {$gt: 0}});

        let pageSize = 500
        
        const total = await Presale.countDocuments()

        let query = mainQuery.skip(0).limit(500)

        let results = await query

        for(const value of results){

            // console.log(totalPresaleAmnt)
            totalPresaleAmnt += parseInt(value.amount)
            console.log(value)
 
        }

        while (total > pageSize) {

            pageSize += 500
            let newQuery = mainQuery.skip(pageSize).limit(500)
            let newResult = await newQuery

            for(const value of newResult){

                totalPresaleAmnt += parseInt(value.amount)
     
            }
            
        }
        
        return res.status(200).json(totalPresaleAmnt)

    } catch (error) {
        return res.status(400).json("Some Error Occured")
    }

}

exports.deletePresale = async (req, res) => {

    try {

        const presale = await Presale.findOneAndDelete({userId: req.params.id})

        return res.status(200).json("Presale Deleted")

    } catch (error) {

        return res.status(400).json("An error occured while trying to delete presale")
    }

}


// find a user by number phone username or fullname 
exports.searchPresale = async (req, res) => {
    const {presale} = req.query
    try {
        const allPresales = await Presale.find({amount: {$gt: 0}})
        
        const filteredPresales = allPresales
        .filter(
            u => 
                 u.bsc.toLowerCase().includes(presale.toLowerCase()) ||
                 u.amount.toLowerCase().includes(presale.toLowerCase()) ||
                 u.ref.toLowerCase().includes(presale.toLowerCase()) ||
                 u.grandRef.toLowerCase().includes(presale.toLowerCase()) || 
                 u.refBsc.toLowerCase().includes(presale.toLowerCase()) || 
                 u.grandRefBsc.toLowerCase().includes(presale.toLowerCase())
        )
        .sort((a,b) => {
            if(a.createdAt > b.createdAt) return -1
            if(a.createdAt < b.createdAt) return 1
        })

        return res.status(200).json(filteredPresales)

    } catch (err) {
        return res.status(400).json(err)
    }
}



// GET ALL ADMIN PRESALES 
exports.getAdminPresales = async (req, res) => {

    try {
        
        const allPresales = await AdminPresale.find({})

        return res.status(200).json(allPresales)

    } catch (error) {
        return res.status(400).json(err)
    }

}

// GET USER REFERRAL PRESALE
exports.getUserRefPresale = async (req, res) => {
    
    try {
        
        const referrals = await Presale.find({ref: req.query.id})

        const downlines = await Presale.find({grandRef: req.query.id})

        return res.status(200).json({
            referrals,
            downlines
        })
        
    } catch (error) {
        console.log(error)
    }

}