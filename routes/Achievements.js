const router = require('express').Router();


router.get('/:username', (req, res) => {

    return res.render('Achievements', {
        title: 'Achievements',
        css: 'Achievements',
        Username: req.params.username
    })
});

module.exports = router;