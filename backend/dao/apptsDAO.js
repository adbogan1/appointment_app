import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let appts

export default class ApptsDAO {
    static async injectDB(conn) {
        if(users) {
            return
        }
        try {
            //NOTE: importing customers for now, may change directory and/or add folder named "users" for consistency
            users = await conn.db(process.env.USERS_NS).collection("customers")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in usersDAO: ${e}`,
            )
        }
    }

    static async addAppt(appt, user, date) {
        try {
            const apptDoc = { name: user.name,
                user_id: user._id,
                date: date,
                text: appt, }

            return await appts.insertOne(apptDoc)    
        } catch (e) {
            console.error(`Unable to post appointment: ${e}`)
            return { error: e }
        }
    }

    static async updateAppt(apptId, userId, text, date) {
        try {
            const updateResponse = await appts.updateOne(
                { user_id: userId, _id: ObjectId(apptId)},
                { $set: { text: text, date: date } },
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update appointment: ${e}`)
            return { error: e }
        }
    }

    static async deleteAppt(apptId, userId) {
        try {
            const deleteResponse = await appts.deleteOne({ 
                _id: ObjectId(apptId),
                user_id: userId,
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete appointment: ${e}`)
            return { error: e }
        }
    }
}