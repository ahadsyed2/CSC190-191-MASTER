import express from 'express';

//controller functions
//const { getProfile, createProfile, updateProfile, deleteProfile, getAllProfiles } = require ('../controllers/profileController')
import { getProfile, createProfile, updateProfile, deleteProfile, getAllProfiles } from '../controllers/profileController.js';

const router = express.Router()

//Does this need to be just '/:id' or '/Profile/:id'
//Note '/profile' is already included in server.js, do not add here

router.get('/:id', getProfile)

router.get('/', getAllProfiles)

router.post('/', createProfile)

router.patch('/:id', updateProfile)

router.delete('/:id', deleteProfile)

export default router;
