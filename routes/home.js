const router = require('express').Router();
var db = require('../db');

router.get('/', async(req, res) => {
    
var sql_query="SELECT * FROM Owners";
const data=await GetOwners(sql_query);

console.log(data[0]);
 res.render('home', {
    title: 'home',
    css: 'home',
    data: data
})

});


const GetOwners = (query) => {
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