const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('home', {
            title: 'home',
            css:'home'

        })

});
module.exports = router;