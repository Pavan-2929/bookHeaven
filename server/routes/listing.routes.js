import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { createListing, deleteListing, getListing, getSearchListings, updateListing } from '../controllers/listing.controller.js'

const router = express.Router()

router.post('/create',verifyToken, createListing)
router.delete("/delete/:id", verifyToken, deleteListing)
router.post("/update/:id", verifyToken, updateListing)
router.get('/get/:id', getListing)
router.get('/get', getSearchListings)

export default router