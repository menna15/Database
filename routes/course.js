const router = require('express').Router();
var db = require('../db');

  
router.get('/', async(req, res) => {

    var Courses_query="select * from Courses ";
    const GetCoursess=await Courses_db(Courses_query);

    Courses_query="select SSN,Fname,Minit,Lname from Courses,instructors where SSN= Instructors_SSN";
    const GetInstructorr=await Courses_db(Courses_query);

 
        return res.render('course',{
            title: 'course', 
            css:'course',
            courses: GetCoursess, 
            Instructor: GetInstructorr 
        })

});  

const Courses_db = (query) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
                db.query(query,(error, rows) => {
                    if(!error)
                      {
                        //console.log('Courses viewed');
                        resolve(rows);
                        
                      }
                    else
                     {reject(new Error(error));}
               })

        }, 1000);
    });
};


module.exports = router;