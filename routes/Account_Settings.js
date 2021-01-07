const router = require('express').Router();
var db = require('../db');

router.get('/', (req, res) => {

    return res.render('Account_Settings', {
        title: 'Account_Settings',
        css: 'Account_Settings'
    })
});

module.exports = router; 