const router = require('express').Router();


router.get('/', (req, res) => {
 
    return res.render('Account_Settings', { 
        title: 'Profile/' + req.params.username, 
        css: 'Account_Settings',
        Type: req.params.type, 
        Username: req.params.username,
        message: req.flash('message')
    })
}); 

module.exports = router;