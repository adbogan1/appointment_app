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
            if ("name" in filters) { //search anywhere in name 
                query = { $text: {$search: filters["name"]} }
            } else if ("username" in filters) { //search exact username
                query = { "username": {$eq: filters["username"]} }
            } else if ("email" in filters) { //search exact email
                query = { "email": {$eq: filters["email"]} }
            }
            
        }

        let cursor

        try {
            cursor = await users.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { usersList: [], totalNumUsers: 0 }
        }

        const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page)

        try {
            const usersList = await displayCursor.toArray()
            const totalNumUsers = await users.countDocuments(query)
            
            return { usersList, totalNumUsers }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { usersList: [], totalNumUsers: 0 }
        }
    }
}