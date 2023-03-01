const express = require('express')
const router = express.Router()
const passport = require('passport')

const controller = require('../controllers/authorizationControllers')

router.post('/login', controller.login)
router.post('/register', controller.register)
router.put('/change', controller.change)
router.delete('/delete', controller.delete)

router.get('/test',passport.authenticate('jwt', {session: false}),controller.test)

module.exports = router