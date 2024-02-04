import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { getUser, updateUser, userData } from '../controllers/user.controller.js'
import { getUserListing } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/user', verifyToken, userData)
router.post('/user/update', verifyToken, updateUser)
router.get('/user/listings/:id', verifyToken, getUserListing)
router.get('/user/:id', verifyToken, getUser)

export default router