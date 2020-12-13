const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('login', {
            title: 'login',
            css:'login'
        })
});

router.post('/', (req, res) => {
    
    const username = req.body.Username;
    const password = req.body.Password;
    const email = req.body.Email;
    const confirm = req.body.Confirm_Password;

    // make validations
    
    if (password == confirm)
        return   res.redirect('/home');
    else
        return res.redirect('/login');
});

module.exports = router;