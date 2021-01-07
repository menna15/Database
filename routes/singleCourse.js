const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('singleCourse', {
            title: 'singleCourse',
            // put course name
            css: 'singleCourse'
 
        })

});
module.exports = router;
