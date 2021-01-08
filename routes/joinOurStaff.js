const router = require('express').Router();

var db = require('../db');

router.get('/', (req, res) => {

        return res.render('joinOurStaff', {
            title: 'joinOurStaff',
            css:'joinOurStaff'           

        })
});

router.post('/', async(req, res) =>{

const FullName = req.body.FullName;
const SSN = req.body.SSN;
const Username = req.body.Username;
const Email = req.body.Email;
const Password = req.body.Password;
const ConfirmPassword = req.body.ConfirmPassword;

        var sql_query=`INSERT INTO instructors  VALUES ("${req.body.FullName}","${req.body.FullName}","${req.body.FullName}", 'Mkamal', '123' ,"${req.body.Password}" ,"${req.body.Email}" , 0 );`
        try{

            var executed = await Join(sql_query);
            
            if (executed)
            {
                return res.render('joinOurStaff', {
                    title: 'joinOurStaff',
                    css:'joinOurStaff'  ,     
                    message: "Waiting for IT-Adminastrator to accept you"   
                });
            }
        }
        catch(e)
    { 
     
            return res.render('joinOurStaff', {
                title: 'joinOurStaff',
                css:'joinOurStaff' ,     
                message: "Choose another UserName"
            });
        }    
        }
    
    );
    const Join = (query) => {
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