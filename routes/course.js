const router = require('express').Router();
var db = require('../db');

   
router.get('/', async(req, res) => {



    Courses_query="SELECT C.*,I.Fname, I.Lname FROM Courses as C JOIN Instructors as I ON C.Instructors_Username = I.Username;";
    const GetCoursess=await getfromDB(Courses_query);


    return res.render('course',{ 
        title: 'Courses', 
        css:'course',
        courses: GetCoursess
    })


});  

const getfromDB = (query) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
                db.query(query,(error, rows) => {
                    if(!error)
                      {
                        resolve(rows);    
                      }
                    else
                     {reject(new Error(error));}
               })

        }, 100);
    });
};


module.exports = router;