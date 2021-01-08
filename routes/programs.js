
const { query } = require('express');
var db = require('../db');
const router = require('express').Router();


router.get('/', async(req, res) => {

        var Programs = await GetfromDB("SELECT * FROM Programs");
        var programCourses = [];
        for(let i = 0; i < Programs.length; i++){
            let sqlquery = "SELECT C.Course_Name, C.Course_image,C.Course_ID, C.Cost, I.Fname,I.Lname, I.Profile_Pic FROM Courses as C JOIN Instructors as I ON C.Instructors_Username = I.Username WHERE Programe_Name = '"+ Programs[i].PName + "';";
            let tmp_ProgramCourse = await GetfromDB(sqlquery);
            if(tmp_ProgramCourse!= []){
                programCourses.push(tmp_ProgramCourse);
            }
        }
        return res.render('programs', {
            title: 'programs',
            css:'programs',
            programs:Programs,
            ProgramCourses:programCourses
        })

});




const GetfromDB = (query)=>{
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            db.query(query, (err, rows)=>{
                if(!err){
                    console.log("Post Viewed");
                    resolve(rows);
                }
                else{
                    reject(new Error(err));
                }
            });
        },100);
    });
};



module.exports = router;
