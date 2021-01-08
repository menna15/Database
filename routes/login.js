const router = require('express').Router();

var db = require('../db');
 
router.get('/', (req, res) => {

        return res.render('login', {
            title: 'login',
            css:'login'
        })
});

router.post('/',async (req, res) => {
    
    const sign_in_Username = req.body.sign_in_Username;
    const sign_in_Password = req.body.sign_in_Password;
    var sql_query = `SELECT password from students where username = ",""${req.body.sign_in_Username}";`

    var executed = await signin(sql_query);
    // check username in database   
       // if (executed[0].password == sign_in_Password)         {

            return res.render('Account_Settings', {
                title: 'Account_Settings',
                css: 'Account_Settings'
            });
    //     }  
  
    // else {  
    
    //     return res.render('login', {
    //     title: 'login',
    //     css:'login',    
    //     message: "No such user exists"
    //     });
    // }    
     } 

);
const signin = (query) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                db.query(query,(error, rows) => {
                    if(!error)
                      {                           
                        resolve(rows);
                         
                      }
                    else
                     {reject(new Error(error));}
               })     
        }, 1000);
    });
};

module.exports = router;