const router = require('express').Router();

const { query } = require('../db');

var db = require('../db');

router.get('/', async(req, res) => {
    
var sql_query="SELECT * FROM Owners";

const data=await GetOwners(sql_query);

console.log(data[0]);
 res.render('home', {
    title: 'home',
    css: 'home', 
    data: data 
})
 
});


const GetOwners = (query) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                db.query(query,(error, rows) => {
                    if(!error)
                      {
                        console.log('Post viewed');
                        resolve(rows);
                        
                      }
                    else
                     {reject(new Error(error));}
               })

        }, 1000);
    });
};


 


var data = await GetOwners(sql_query);

sql_query = "SELECT * FROM Courses JOIN Teaches JOIN Instructors ON (Courses.Course_ID = Teaches.Course_ID AND Teaches.Instructor_Username = Instructors.Username) ORDER BY Teaches.rate LIMIT 5;"
var topRated = await GetTopRated(sql_query);

var statistics = [];
sql_query = "SELECT COUNT(*) FROM Instructors;"
statistics["Instructors"] =await GetInstructors(sql_query);
sql_query = "SELECT COUNT(*) FROM Students;"
statistics["Students"] = await GetStudents(sql_query);
sql_query = "SELECT COUNT(*) FROM Courses;"
statistics["Courses"] = await GetCourses(sql_query);

console.log(statistics["Courses"]);

 res.render('home', {
    title: 'home',
    css: 'home',
    data: data,
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

const GetOwners = (query)=>{
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
          resolve(rows);
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
          resolve(rows);
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
          resolve(rows);
        }
        else{
          reject(new Error(err));
        }
      });
    }, 100);
  });
};

module.exports = router;