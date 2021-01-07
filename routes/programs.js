
const { query } = require('express');
var db = require('../db');
const router = require('express').Router();


router.get('/', async(req, res) => {

        var Programs = await GetPrograms("SELECT * FROM Programs");
        var programCourses = [];
        for(let i = 0; i < Programs.length; i++){
            let sqlquery = "SELECT * FROM Courses WHERE Programe_Name = '"+ Programs[i].PName + "';";
            let tmp_ProgramCourse = await GetProgramCourses(sqlquery);
            if(tmp_ProgramCourse!= []){
                programCourses.push(tmp_ProgramCourse);
            }
        }
        console.log(programCourses[0][0].Course_image);

        return res.render('programs', {
            title: 'programs',
            css:'programs',
            programs:Programs,
            ProgramCourses:programCourses
        })

});




const GetPrograms = (query)=>{
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

const GetProgramCourses = (query)=>{
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
            })
        }, 100);
    });
};

module.exports = router;
