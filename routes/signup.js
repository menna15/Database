const router = require('express').Router();

var db = require('../db');

router.get('/', (req, res) => {


        return res.render('signup', {
            title: 'signup',
            css:'login'
        });
 

         
});

router.post('/',async (req, res) => { 
    const FullName = req.body.FullName;
    const SSN = req.body.SSN;
    const Username = req.body.Username;
    const Password = req.body.Password;
    const Email = req.body.Email;
    const Confirm_Password = req.body.Confirm_Password;
   

    var sql_query=`INSERT INTO students  VALUES ("${req.body.FullName}","${req.body.FullName}","${req.body.Username}","${req.body.Password}" ,"${req.body.Email}" , null );`
    try{

        var executed = await signup(sql_query);
         
        if (executed)
        {
            return res.render('Account_Settings', {
                title: 'Account_Settings',
                css: 'Account_Settings'
            });
        }
    }
    catch(e)
{  
    return res.render('signup', {
        title: 'signup',
        css:'login',    
            message: "Choose another UserName"
        });
    }    
    }

);
const signup = (query) => {
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