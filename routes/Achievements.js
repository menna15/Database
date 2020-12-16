const router = require('express').Router();


router.get('/', (req, res) => {

    return res.render('Achievements', {
        title: 'Achievements',
        css: 'Achievements'
    })
});

module.exports = router;