const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('singleCourse', {
            title: 'singleCourse',
            css: 'singleCourse'

        })

});
module.exports = router;
