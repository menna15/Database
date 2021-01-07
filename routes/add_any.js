const router = require('express').Router();
var db = require('../db');

router.get('/', (req, res) => {
    
    return res.render('add_any', {
        title: 'add_any',
        css: 'add_any'

    })

});

 

module.exports = router;