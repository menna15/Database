const router = require('express').Router();
var db = require('../db');

router.get('/:username', async(req, res) => { 


   // Courses_query="SELECT C.* FROM Courses as c , Enroll_into_course as e , Students as s where e.finished = 1 and c.Course_ID = e.Course_ID and s.Username = '"+ req.params.username + "';";
    Courses_query="SELECT C.* FROM Courses as c , Enroll_into_course as e , Students as s where e.finished = 1 and c.Course_ID = e.Course_ID and s.Username = 'taher';";

    const GetCoursess=await getfromDB(Courses_query);

        return res.render('Achievements', {
            title: 'Achievements', 
            css: 'Achievements',
            Username: req.params.username,
            courses: GetCoursess,
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