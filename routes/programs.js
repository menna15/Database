const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('programs', {
            title: 'programs'

        })

});
module.exports = router;
