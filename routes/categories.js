const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('categories', {
            title: 'categories',
            css: 'categories'

        })

});
module.exports = router;