const router = require('express').Router();
var db = require('../db');

router.get('/', (req, res) => {
    
    return res.render('add_any', {
        title: 'add_any',
        css: 'add_any'

    })

});

router.post('/',async(req,res)=>{

    var courseName= req.body.Course_Name;
    //var Course_ID= req.body.Course_ID;
    var Instructor_username= req.body.Instructor_username;
    var Cost= req.body.Cost;
    var Duration= req.body.Duration;
    var Category= req.body.Category;
    var Course_small_info=req.body.Course_small_info;
    var Course_info=req.body.Course_info;
    var uploaded_image= req.body.uploaded_image;
    var courseInformation=req.body.courseInformation;

    var RandomCourseID= Math.floor((Math.random() * 1000000) + 1);
    var sql_RandomCourseID= "select  Count(*) from courses where Course_ID="+RandomCourseID;
    //console.log("Random");
    const applysql_RandomCourseID= await AddCourses(sql_RandomCourseID);

    while(applysql_RandomCourseID[0] >=1 )
    {
        RandomCourseID= Math.floor((Math.random() * 1000000) + 1);
        sql_RandomCourseID= "select  Count(*) from courses where Course_ID="+RandomCourseID;
        //console.log("Random loop");
        applysql_RandomCourseID=await AddCourses(sql_RandomCourseID);
    }

    if (!courseName) {
        req.flash('message','Please Enter Course Name');
        //console.log("no course name");
        res.redirect('/');
    }
  

    var file = req.files.uploaded_image;
    var img_name="images/"+file.name;
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                
        file.mv('./public/images/'+file.name, function(err) {
            if (err)
            { 
                //console.log("can't upload picture");
                return res.status(500).send(err);
            }
            
        });
    } else {
        var message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
        res.render('/',{message: message});
    }
    
    //I didn't insert `Programe_Name`,
    var sql = "INSERT INTO `courses`(`Course_ID`,`Instructors_Username`,`Category_Name`, `Cost` ,`Duration`,`Course_Name`,`Course_info`,`Course_small_info`,`Course_image`) VALUES ('" + RandomCourseID + "','" + Instructor_username + "','" + Category + "'," + Cost + "," + Duration + ",'" + courseName + "','" + courseInformation + "','" + Course_small_info + "','" + img_name + "')";
    await AddCourses(sql);


    res.redirect('/Account_Settings');
});
  
const AddCourses = (query) => {
    //console.log("inside AddCourses function");
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
                db.query(query,(error, rows) => {
                    if(!error) 
                        {
                        //console.log('Course added');
                        resolve(rows);
                    
                        
                        }
                    else
                        {reject(new Error(error));}
                })

        }, 1000);
    });
};
module.exports = router;