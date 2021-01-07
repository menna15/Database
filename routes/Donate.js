const router = require('express').Router();


router.get('/', (req, res) => {

        return res.render('Donate', {
            title: 'Donate',
            css:'Donate',
            message:  req.flash('message')
        })

});

router.post('/', function(req, res, next) {

    console.log(req.body.Orgnization_name);
    if(req.body.Email=="" )
    { 
        req.flash('message',"Enter the email");
    return res.render('Donate', {
        title: 'Donate',
        css:'Donate',
        js:'Donate',
        message: "You must fill all required data"
    });}
    if(req.body.amount=="" )
    { 
       
    return res.render('Donate', {
        title: 'Donate',
        css:'Donate',
        js:'Donate',
        message: "You must fill all required data"
    });}
    if(req.body.date=="" )
    { 
       
    return res.render('Donate', {
        title: 'Donate',
        css:'Donate',
        js:'Donate',
        message: "You must fill all required data"
    });}



});
const Donate = (query) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                db.query(query,(error, rows) => {
                    if(!error)
                      {
                        console.log('Post viewed');
                        resolve(rows);
                        
                      }
                    else
                     {reject(new Error(error));}
               })

        }, 1000);
    });
};
module.exports = router;