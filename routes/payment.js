const router = require('express').Router();
 
var db = require('../db');

router.get('/', async(req, res) => {

    Courses_query="SELECT c.Course_Name, c.Course_ID , i.Username , i.Fname, i.Lname from courses as c  , instructors as i , teaches as t where t.Course_ID = c.Course_ID and t.Instructor_Username = i.Username;";
    const GetCoursess=await getfromDB(Courses_query);
 
        console.log(GetCoursess);
        return res.render('payment', {
            title: 'Payment',
            css:'payment',
            courses:GetCoursess,
            message:  req.flash('message') 
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