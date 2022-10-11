

const router = require('express').Router()

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    
} = require('../controllers/thoughtController')


router.route('/').get(getThoughts)

router.route('/:thoughtId').get(getSingleThought)

outer.route('/:thoughtId').post(updateThought)

router.route('/').post(createThought)

router.route('/:thoughtId').delete(deleteThought)



module.exports = router;