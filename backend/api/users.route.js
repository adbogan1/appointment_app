import express from "express"

import UsersCtrl from "./users.controller.js"
import ApptsCtrl from "./appts.controller.js"

const router = express.Router()

router.route("/").get(UsersCtrl.apiGetUsers)

router
    .route("/appt")
    .post(ApptsCtrl.apiPostAppt)
    .put(ApptsCtrl.apiUpdateAppt)
    .delete(ApptsCtrl.apiDeleteAppt)

export default router