
const Presale = require("../models/Presale")

exports.createPresale = async (req, res) => { 

    const newPresale = new Presale(req.body)

    try {
        
        const oldPresale = await Presale.findOne({userId: req.body.userId})

        if(oldPresale){

            let recentPresale = {...req.body}

            const parentRef = await Presale.findOne({userId: oldPresale.ref})

            const grandReferal = await Presale.findOne({userId: oldPresale.grandRef})

            // GETTING DOWNLINERS
            if(parentRef){

                recentPresale = {
                    ...req.body, 
                    grandRef: parentRef.ref, 
                    refBsc: parentRef.bsc,
                    grandRefBsc: grandReferal.bsc || ""
                }

                if(req.body.amount){

                    await parentRef.updateOne({bonus: (parseInt(req.body.amount) * 1000) + parseInt(parentRef.bonus)})

                    if(grandReferal){
                        await grandReferal.updateOne({bonus: (parseInt(req.body.amount) * 500) + parseInt(grandReferal.bonus)})
                    }

                    recentPresale = {amount: (parseInt(req.body.amount) * 1000)}
    
                }
            }

            if(req.body.amount){
                recentPresale = {amount: (parseInt(req.body.amount) * 1000)}
            }


            if(req.body.paymentId){
                
                const {paymentId, ...others} = oldPresale._doc
                
                recentPresale = {...others, paymentId: paymentId.concat(req.body.paymentId)}

            }

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

        res.status(201).json(newPresale)

    } catch (error) {
        console.log(error)
        return res.status(400).json("An error occured while trying to create presale")
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

        let query = Presale.find({amount: {$gt: 0}});
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