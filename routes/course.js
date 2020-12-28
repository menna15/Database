const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('course', {
            title: 'course', 
            // put course name
            css:'course'

        })

});
module.exports = router;