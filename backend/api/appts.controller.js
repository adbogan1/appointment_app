import ApptsDAO from "../dao/apptsDAO.js"

export default class ApptsController {
    static async apiPostAppt(req, res, next) {
        try {
            const appt = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
        }

        const date = new Date()
        const ApptResponse = await ApptsDAO.addAppt(
            appt,
            userInfo,
            date,
        )

        res.json( {status: "success"} )
        } catch (e) {
        res.status(500).json( {error: e.message } )
        }
    
    }

    static async apiUpdateAppt(req, res, next) {
        try {
            const apptId = req.body.appt_id
            const text = req.body.text
            const date = new Date()
        
            const ApptResponse = await ApptsDAO.updateAppt(
                apptId,
                req.body.user_id,
                userInfo,
                date,
            )
            
        var { error } = ApptResponse
        if(error) {
            res.status(400).json({ error })
        }

        if(ApptResponse.modifiedCount === 0) {
            throw new Error(
                "unable to update appointment - user may not be original poster",

            )
        }
        res.json( {status: "success"} )
        } catch (e) {
        res.status(500).json( {error: e.message } )
        }
    
    }

    static async apiDeleteAppt(req, res, next) {
        try {
            const apptId = req.query.id
            const userId = req.body.user_id
            console.log(reviewId)
            const reviewResponse = await ApptsDAO.deleteAppt(
                apptId,
                userId,
            )
        res.json( {status: "success"} )
        } catch (e) {
        res.status(500).json( {error: e.message } )
        }
    }

}
