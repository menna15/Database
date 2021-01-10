const router = require('express').Router();

var db = require('../db');
 
router.get('/',async (req, res) => {

        return res.render('login', {
            title: 'login',
            css:'login'
        })
}); 
 

router.post('/',async (req, res) => {
    
    const sign_in_Username = req.body.sign_in_Username;
    const sign_in_Password = req.body.sign_in_Password;

    var sql_query1 = `SELECT Password , Fname , Lname from students         where Username = "${sign_in_Username}";`
    var sql_query2 = `SELECT Password , Fname , Lname from it_adminstrators where Username = "${sign_in_Username}";`
    var sql_query3 = `SELECT Password , Fname , Lname from owners           where Username = "${sign_in_Username}";`
    var sql_query4 = `SELECT Password , Fname , Lname from instructors      where Username = "${sign_in_Username}";`
    
    try{ 

        var executed1 = await signin(sql_query1);
        var executed2 = await signin(sql_query2);
        var executed3 = await signin(sql_query3);
        var executed4 = await signin(sql_query4);


        if (executed1.length == 1 && executed1[0].Password == sign_in_Password )
        {

            return res.redirect('Account_Settings/'+'student'+'/'+sign_in_Username); 
        }  
        else if(executed2.length == 1 && executed2[0].Password == sign_in_Password )
        {
        
            return res.redirect('Account_Settings/'+'it_adminstrator'+'/'+sign_in_Username); 
        }
        else if(executed3.length == 1 && executed3[0].Password == sign_in_Password )
        {
            return res.redirect('Account_Settings/'+'owner'+'/'+sign_in_Username); 

        }
        else if(executed4.length == 1 && executed4[0].Password == sign_in_Password )
        {
            return res.redirect('Account_Settings/'+'instructor'+'/'+sign_in_Username); 
        }
        else{

            return res.render('login', {
                title: 'login',
                css:'login',
                message: "User does not exist" 
                });

        }
    }
    catch(e)
{ 
 
    return res.render('login', {
        title: 'login',
        css:'login'
        });
    }    
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
        }, 10);
    });
};

module.exports = router;