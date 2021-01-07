const router = require('express').Router();
var db = require('../db');

   
router.get('/', async(req, res) => {

    var Courses_query="select * from Courses ";
    const GetCoursess=await Courses_db(Courses_query);

    Courses_query="select Username,Fname,Lname from courses,instructors where Username= Instructors_Username";
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

        }, 100);
    });
};


module.exports = router;