const router = require('express').Router();

router.get('/', (req, res) => {

    console.log( req.params.username);
    console.log( "here");
    return res.render('Account_Settings', {
        title: 'Account_Settings',
        css: 'Account_Settings',
        message: req.flash('message')
    })
}); 

module.exports = router;