let users

export default class usersDAO {
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

    static async getUsers({
        filters = null,
        page = 0,
        usersPerPage = 25,
    } = {}) {
        let query
        if (filters) {
            if("name" in filters) {
                query = {$text: {$}}
            }
        }
    }
}