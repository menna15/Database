const router = require('express').Router();

var db = require('../db');

// GET //

router.get('/', async(req, res) => {
 
sql_query = "SELECT * FROM Courses JOIN Teaches JOIN Instructors ON (Courses.Course_ID = Teaches.Course_ID AND Teaches.Instructor_Username = Instructors.Username) ORDER BY Teaches.rate LIMIT 5;"
var topRated = await GetTopRated(sql_query);

 var statistics = [];
sql_query = "SELECT COUNT(*) FROM Instructors;"
statistics["Instructors"] =await GetInstructors(sql_query);
sql_query = "SELECT COUNT(*) FROM Students;"
statistics["Students"] = await GetStudents(sql_query);
sql_query = "SELECT * FROM Courses;"
statistics["Courses"] = await GetCourses(sql_query);
console.log(statistics);

res.render('home', {
title: 'home',
css: 'home', 
statistics:statistics,
top_5_Courses:topRated
})
 
});



const GetTopRated = (query)=>{
  return new Promise((resolve, reject)=>{
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
    }, 100);
  });
};


const GetInstructors = (query)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      db.query(query, (err, rows)=>{
        if(!err){
          console.log("Post Viewed");
          resolve(rows.length);
        }
        else{
          reject(new Error(err));
        }
      });
    }, 100);
  });
};

const GetCourses = (query)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      db.query(query, (err, rows)=>{
        if(!err){
          console.log("Post Viewed");
          resolve(rows.length);
        }
        else{
          reject(new Error(err));
        }
      });
    }, 100);
  });
};
const GetStudents = (query)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      db.query(query, (err, rows)=>{
        if(!err){
          console.log("Post Viewed");
          resolve(rows.length);
        }
        else{
          reject(new Error(err));
        }
      });
    }, 100);
  });
};

module.exports = router;