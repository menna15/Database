const router = require('express').Router();
var db = require('../db');


router.get('/:course_ID', async(req, res) => { 
   
        var Courses_query="select * from Courses where Course_ID="+req.params.course_ID;
        const GetCourse=await Courses_db(Courses_query);
    
        return res.render('singleCourse', {
            title: GetCourse[0].Course_Name,
            css: 'singleCourse', 
            course: GetCourse  
    
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
