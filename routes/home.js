const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('home', {
            title: 'home',
            css:'home'

        })

});
function display()
{
    var element=document.getElementById("vitext").style.opacity=1;
    
}
module.exports = router;