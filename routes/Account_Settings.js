<<<<<<< HEAD
const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('Account_Settings', {
            title: 'Account_Settings',
            css:'Account_Settings'
        })
});

=======
const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('Account_Settings', {
            title: 'Account_Settings',
            css:'Account_Settings'
        })
});

>>>>>>> ca101b8db6fd45c17595caf2ed574fda3d8977b0
module.exports = router;