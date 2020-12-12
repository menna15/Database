const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('joinOurStaff', {
            title: 'joinOurStaff'

        })

});
module.exports = router;