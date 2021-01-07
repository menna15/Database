const router = require('express').Router();
var db = require('../db');

   
router.get('/', async(req, res) => {



    Courses_query="select * from courses";
    const GetCoursess=await Courses_db(Courses_query);

    Courses_query="SELECT Fname, Lname FROM Courses,Instructors Instructors_Username = Username;";
    const GetInstructorr=await getfromDB(Courses_query);


    return res.render('course',{
        title: 'course', 
        css:'course',
        courses: GetCoursess, 
	Instructor:GetInstructorr
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