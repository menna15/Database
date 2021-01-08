const router = require('express').Router();
var db = require('../db');

router.get('/', (req, res) => {
    
    return res.render('add_any', {
        title: 'Add...',
        css: 'add_any',
        message:  req.flash('message')
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
    // var Course_info=req.body.Course_info;
    var uploaded_image= req.body.uploaded_image;
    var courseInformation=req.body.courseInformation;
    var Course_link=req.body.Course_link
    
    if (!courseName) {
        // req.flash('message','Please Enter Course Name');
        //console.log("no course name");
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "Course must have a name"
        })
    }
    var validInstructorQuery="select * from instructors where Username='"+Instructor_username+"'";
    var sql_validInstructorQuery=await ApplyQuery(validInstructorQuery);

    if (Instructor_username && sql_validInstructorQuery != 0) {
        // console.log(sql_validInstructorQuery[0]);
    }
    else{
        // req.flash('message','Enter valid instructor name');
        return res.render('add_any', {
            title: 'Add...', 
            css: 'add_any',
            message:  "Enter valid instructor name"
        })
    }
    
    if (!Cost) {
        // req.flash('message','Please Enter Course Name');
        //console.log("no course name");
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "Course must have a price"
        })
    }
    if (!Duration) {
        // req.flash('message','Please Enter Course Name');
        //console.log("no course name");
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "Course must have a duration time"
        })
    }
    var validCategoryQuery="select * from categories where CName='"+Category+"'";
    sql_validInstructorQuery=await ApplyQuery(validCategoryQuery);

    if (Category && sql_validInstructorQuery != 0) {
        console.log(sql_validInstructorQuery[0]);
    }
    else{
        // req.flash('message','Enter valid instructor name');
        return res.render('add_any', {
            title: 'Add...', 
            css: 'add_any',
            message:  "Enter existing category name"
        })
    }
    
    if (!Course_link) {
        // req.flash('message','Please Enter Course Name');
        //console.log("no course name");
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "Course content must have a link"
        })
    }
    
    if (!Course_small_info) {
        // req.flash('message','Please Enter Course Name');
        //console.log("no course name");
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "Course must have a small attractive information"
        })
    }
    if (!courseInformation) {
        // req.flash('message','Please Enter Course Name');
        //console.log("no course name");
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "Course must have a brief information about course details"
        })
    }


    


    var RandomCourseID= Math.floor((Math.random() * 1000000) + 1);
    var sql_RandomCourseID= "select  Count(*) from courses where Course_ID="+RandomCourseID;
    //console.log("Random");
    const applysql_RandomCourseID= await ApplyQuery(sql_RandomCourseID);

    while(applysql_RandomCourseID[0] >=1 )
    {
        RandomCourseID= Math.floor((Math.random() * 1000000) + 1);
        sql_RandomCourseID= "select  Count(*) from courses where Course_ID="+RandomCourseID;
        //console.log("Random loop");
        applysql_RandomCourseID=await ApplyQuery(sql_RandomCourseID);
    }

    var img_name="";
    if(uploaded_image)
    {
        var file=req.files.uploaded_image;
        img_name="images/"+file.name;
        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                    
            file.mv('./public/images/'+file.name, function(err) {
                if (err)
                { 
                    console.log("can't upload picture");
                    return res.status(500).send(err);
                }
                
            });
        } else {
            return res.render('add_any', {
                title: 'Add...',
                css: 'add_any',
                message:  "This format is not allowed , please upload file with '.png','.gif','.jpg'"
            })
        }
    }
    else
    {
        img_name="images/course_5.jpg";
    }
    
    //I didn't insert `Programe_Name`,

    var sql = "INSERT INTO `courses`(`Course_ID`,`Instructors_Username`,`Category_Name`, `Cost` ,`Duration`,`Course_Name`,`Course_info`,`Course_small_info`,`Course_image`) VALUES ('" + RandomCourseID + "','" + Instructor_username + "','" + Category + "'," + Cost + "," + Duration + ",'" + courseName + "','" + courseInformation + "','" + Course_small_info + "','" + img_name + "')";

    await ApplyQuery(sql);


    // res.redirect('/Account_Settings');
    return res.render('Account_Settings', {
        title: 'Account_Settings',
        css: 'Account_Settings',
        message: "Course is added"
    })
});
  
const ApplyQuery = (query) => {
    //console.log("inside ApplyQuery function");
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