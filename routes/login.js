const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('login', {
            title: 'login',
            css:'home'

        })

});
module.exports = router;