const router = require('express').Router();
var db = require('../db');
var instructors;
router.get('/', async(req, res) => {

   var sql_query="SELECT Username from instructors where statuss=1";
   
   try{
       instructors=await ApplyQuery(sql_query);
       console.log(instructors);
       return res.render('add_any', {
        title: 'Add...',
        css: 'add_any',
        message:  req.flash('message'),
        instructors:instructors
    })

    }
    catch(e)
    {
        console.error(e);
        message="Failed to retriev all instructors";
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  req.flash('message'),
            instructors:instructors
        })
    
    }
    
});

router.post('/',async(req,res)=>{
//-------------------------------------------------------- Add Courses -----------------------------------------------------

//********************************************************** 
var courseName= req.body.Course_Name;
var Instructor_username= req.body.Instructor_username;
var Cost= req.body.Cost;
var Duration= req.body.Duration;
var Category= req.body.Category;
var Course_small_info=req.body.Course_small_info;
var uploaded_image= req.body.uploaded_image;
var courseInformation=req.body.courseInformation;
var Course_link=req.body.Course_link

if(!courseName==""|| !Instructor_username=="" || !Cost=="" ||  !Duration=="" || !Category=="" || !Course_small_info=="" ||!uploaded_image=="" || !courseInformation=="" || !Course_link==""){
    
if (!courseName) {
    return res.render('add_any', {
        title: 'Add...',
        css: 'add_any',
        message:  "Course must have a name",
        instructors:instructors
    })
}
var validInstructorQuery="select * from instructors where Username='"+Instructor_username+"'";
var sql_validInstructorQuery=await ApplyQuery(validInstructorQuery);

if (Instructor_username && sql_validInstructorQuery != 0) {
}
else{
    return res.render('add_any', {
        title: 'Add...', 
        css: 'add_any',
        message:  "Enter valid instructor name",
        instructors:instructors
    })
}

if (!Cost) {
    return res.render('add_any', {
        title: 'Add...',
        css: 'add_any',
        message:  "Course must have a price",
        instructors:instructors
    })
}
if (!Duration) {
    return res.render('add_any', {
        title: 'Add...',
        css: 'add_any',
        message:  "Course must have a duration time",
        instructors:instructors
    })
}
var validCategoryQuery="select * from categories where CName='"+Category+"'";
sql_validInstructorQuery=await ApplyQuery(validCategoryQuery);

if (Category && sql_validInstructorQuery != 0) {
    console.log(sql_validInstructorQuery[0]);
}
else{
    return res.render('add_any', {
        title: 'Add...', 
        css: 'add_any',
        message:  "Enter existing category name",
        instructors:instructors
    })
}

if (!Course_link) {
    return res.render('add_any', {
        title: 'Add...',
        css: 'add_any',
        message:  "Course content must have a link",
        instructors:instructors
    })
}

if (!Course_small_info) {
    return res.render('add_any', {
        title: 'Add...',
        css: 'add_any',
        message:  "Course must have a small attractive information",
        instructors:instructors
    })
}
if (!courseInformation) {
    return res.render('add_any', {
        title: 'Add...',
        css: 'add_any',
        message:  "Course must have a brief information about course details",
        instructors:instructors
    })
}

var RandomCourseID= Math.floor((Math.random() * 1000000) + 1);
var sql_RandomCourseID= "select  Count(*) from courses where Course_ID="+RandomCourseID;
const applysql_RandomCourseID= await ApplyQuery(sql_RandomCourseID);

while(applysql_RandomCourseID[0] >=1 )
{
    RandomCourseID= Math.floor((Math.random() * 1000000) + 1);
    sql_RandomCourseID= "select  Count(*) from courses where Course_ID="+RandomCourseID;
    applysql_RandomCourseID=await ApplyQuery(sql_RandomCourseID);
}

var img_name="";
if(uploaded_image)
{
    var file=req.files.uploaded_image;
    img_name="/images/"+file.name;
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
    img_name="/images/course_5.jpg";
}

//I didn't insert `Programe_Name`,

var sql = "INSERT INTO `courses`(`Course_ID`,`Instructors_Username`,`Category_Name`, `Cost` ,`Duration`,`Course_Name`,`Course_info`,`Course_small_info`,`Course_image`) VALUES ('" + RandomCourseID + "','" + Instructor_username + "','" + Category + "'," + Cost + "," + Duration + ",'" + courseName + "','" + courseInformation + "','" + Course_small_info + "','" + img_name + "')";

await ApplyQuery(sql);

return res.render('Account_Settings', {
    title: 'Account_Settings',
    css: 'Account_Settings',
    message: "Course is added",
    instructors:instructors
})
}
//----------------------------------------------Add category ----------------------------------------------------------------------------

 if(!req.body.Category_Name==""||!req.body.IT_username==""){
var img_name="";
if(req.body.cat_image)
{
    var file=req.body.cat_image;
    img_name="/images/"+file.name;
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
            message:  "This format is not allowed , please upload file with '.png','.gif','.jpg'",
            instructors:instructors
        })
    }
}
else
{
    img_name="/images/course_5.jpg";
}
var sql_query= "INSERT INTO Categories (CName, IT_Username ,Category_image) VALUES  ('" + req.body.Category_Name + "','" + req.body.IT_username +"','"+img_name+ "')";
if(!isNaN(req.body.Category_Name))
{return res.render('add_any', {
    title: 'Add...', 
    css: 'add_any',
    message: "Invalid Category name!",
    instructors:instructors}
)
;}
try
{
    await ApplyQuery(sql_query);
    return res.render('add_any', {
        title: 'Add...', 
        css: 'add_any',
        message: "Category added successfully !",
            instructors:instructors}
    );
}
catch(e)
{
    console.error(e);
    return res.render('add_any', {
        title: 'Add...', 
        css: 'add_any',
        message: "Faild to add this category!, Category Name may be taken or Username is incorrect!",
                instructors:instructors
    });
}
}
// ----------------------------------------------------------Add Program---------------------------------------------------------------
 if(!req.body.Program_Name==""||!req.body.IT_username_prog==""||!req.body.Cost_prog==""||!req.body.Duration_program==""|| !req.body.Level==""){
var img_name="";
if(req.body.Program_img)
{
    var file=req.body.Program_img;
    img_name="/images/"+file.name;
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
            message:  "This format is not allowed , please upload file with '.png','.gif','.jpg'",
                    instructors:instructors
        })
    }
}
else
{
    img_name="/images/course_5.jpg";
}

if(!isNaN(req.body.Program_Name))
{return res.render('add_any', {
    title: 'Add...', 
    css: 'add_any',
    message: "Invalid Program name!",
        instructors:instructors}
)
;}
if(isNaN(req.body.Cost_prog))
{return res.render('add_any', {
    title: 'Add...', 
    css: 'add_any',
    message: "Cost must be a numeric value!",
        instructors:instructors}
)
;}
if(isNaN(req.body.Duration_program))
{return res.render('add_any', {
    title: 'Add...', 
    css: 'add_any',
    message: "Duration must be a numeric value!",
        instructors:instructors}
)
;}
if(!req.body.Level)
{return res.render('add_any', {
    title: 'Add...', 
    css: 'add_any',
    message: "Enter Program Level!",
        instructors:instructors}
)
;}
var sql_query= "INSERT INTO Programs (PName,IT_Username, Cost, Level, Duration,Program_image,Program_info) VALUES ('" +req.body.Program_Name+"','"+req.body.IT_username_prog+"','"+req.body.Cost_prog+"','"+req.body.Level+"','"+req.body.Duration_program+"','"+req.body.Program_img+"','"+req.body.program_info+"')";
try
{
    await ApplyQuery(sql_query);
    return res.render('add_any', {
        title: 'Add...', 
        css: 'add_any',
        message: "Program added successfully !",
            instructors:instructors}
    );
}
catch(e)
{
    console.error(e);
    return res.render('add_any', {
        title: 'Add...', 
        css: 'add_any',
        message: "Faild to add this Program!, Program Name may be taken or Username is incorrect!",
                instructors:instructors
    });
}
}
// -------------------------------------------------------------- Add IT Administrator --------------------------------------------------------------------------

 if(!req.body.IT_FName=="" || !req.body.IT_LName=="" || !req.body.IT_username=="" || !req.body.Owner_username=="")
{
    if (!req.body.IT_FName) {
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "You must enter IT First Name ",
                    instructors:instructors
        })
    }
    if (!req.body.IT_LName) {
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "You must enter IT Last Name ",
                    instructors:instructors
        })
    }
    var RandomUsername= Math.floor((Math.random() * 1000000) + 1);
    var sql_RandomUsername= "select  Count(*) from owners where Username="+RandomUsername;
    const applysql_RandomUsername= await ApplyQuery(sql_RandomUsername);

    while(applysql_RandomUsername[0] >=1 )
    {
        RandomUsername= Math.floor((Math.random() * 1000000) + 1);
        sql_RandomUsername= "select  Count(*) from owners where Username="+RandomUsername;
        applysql_RandomUsername=await ApplyQuery(sql_RandomUsername);
    }
    var username_funky=req.body.IT_FName+req.body.IT_LName+RandomUsername;

    var checkOwnerExists ="select * from owners where Username='"+req.body.Owner_username+"'";
    var sqlcheckOwnerExists=await ApplyQuery(checkOwnerExists);

    if (req.body.Owner_username && sqlcheckOwnerExists!= 0){}
    else {
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "You must enter your username in Owner username",
            instructors:instructors
        })
    }

    var addIT="insert into it_adminstrators (FName, LName, Username, Owner_Username) values ('"+req.body.IT_FName+"','"+req.body.IT_LName+"','"+username_funky+"','"+req.body.Owner_username+"');";
    
    await ApplyQuery(addIT);

    return res.render('add_any', {
        title: 'Add...', 
        css: 'add_any',
        message: "IT Administrator is added successfully !",
        instructors:instructors}
    );
}
// -------------------------------------------------------------- Review Instructors --------------------------------------------------------------------------
var sql_query="SELECT Username from instructors where statuss= 1";
var instructors;
   try {
      instructors=await ApplyQuery(sql_query);
       console.log(instructors);
    }
    catch(e)
    {
        console.error(e);
    }
if(instructors.length!=0)
{    
    for(var i=0 ; i< instructors.length ; i++)
    {   
        if(req.body[i]!="Select")
        {  
            if(req.body[i]=="Rejected")
            {          
                var sql_query="DELETE from instructors where Username='"+ instructors[i].Username+"'";
                    try{
                    var executed= await ApplyQuery(sql_query);
                    }
                    catch(e)
                    {
                        console.error(e);
                        return res.render('add_any', {
                            title: 'Add...', 
                            css: 'add_any',
                            message: "FAILD!",
                            instructors:instructors
                        });
                    }
                   
                    
            }
           else if(req.body[i]=="Accepted")
           {     
               var sql_query="Update instructors set Statuss='"+ 0+"' where Username='"+instructors[i].Username+"'";
                try{
                    var executed= await ApplyQuery(sql_query);
                    }
                catch(e)
                {
                    console.error(e);
                    return res.render('add_any', {
                        title: 'Add...', 
                        css: 'add_any',
                        message: "FAILD!",
                        instructors:instructors
                    });
                }

            }
        }

    }
    return res.render('add_any', {
        title: 'Add...', 
        css: 'add_any',
        message: "Successfully!",
        instructors:instructors
    });
}
else 
{    
    return res.render('add_any', {
    title: 'Add...', 
    css: 'add_any',
    message: "",
    instructors:instructors});
}
// ------------------------------------------------ ADD Coupons ----------------------------------------------------
 if(!req.body.Owner_username2=="" || !req.body.percentage=="" || !req.body.start=="" || !req.body.end=="" ||!req.body.Category2=="" )
{
    //create random coupon id
    var RandomCoupon_ID= Math.floor((Math.random() * 1000000) + 1);
    var sql_RandomCoupon_ID= "select  Count(*) from coupons where Coupon_ID="+RandomCoupon_ID;
    const applysql_RandomCoupon_ID= await ApplyQuery(sql_RandomCoupon_ID);

    while(applysql_RandomCoupon_ID[0] >=1 )
    {
        RandomCoupon_ID= Math.floor((Math.random() * 1000000) + 1);
        sql_RandomCoupon_ID= "select  Count(*) from coupons where Coupon_ID="+RandomCoupon_ID;
        applysql_RandomCoupon_ID=await ApplyQuery(sql_RandomCoupon_ID);
    }

    //owner username
    var checkOwnerExists ="select * from owners where Username='"+req.body.Owner_username2+"'";
    var sqlcheckOwnerExists=await ApplyQuery(checkOwnerExists);

    if (req.body.Owner_username2 && sqlcheckOwnerExists!= 0){}
        else {
            return res.render('add_any', {
                title: 'Add...',
                css: 'add_any',
                message:  "You must enter your username in Owner username",
                        instructors:instructors
            })
        }
    //percentage between 0-100
    if (!req.body.percentage) {
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "You must enter coupon discount percentage ",
                    instructors:instructors
        })
    }
    if(req.body.percentage < 0  || req.body.percentage > 100)
    {
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "Coupon discount percentage must be between 0-100",
                    instructors:instructors
        })
    }

    if (!req.body.start) {
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "You must enter coupon discount start date",
                    instructors:instructors
        })
    }
    if (!req.body.end) {
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "You must enter coupon discount end date",
                    instructors:instructors
        })
    }
    //end date must be greater than start date
    if(req.body.start >= req.body.end)
    {
        return res.render('add_any', {
            title: 'Add...',
            css: 'add_any',
            message:  "end date must be greater than start date",
                    instructors:instructors
        })
    }
    var validCategoryQuery="select * from categories where CName='"+req.body.Category2+"'";
    sql_validInstructorQuery=await ApplyQuery(validCategoryQuery);

    if (req.body.Category2 && sql_validInstructorQuery != 0) {
    }
    else{
        return res.render('add_any', {
            title: 'Add...', 
            css: 'add_any',
            message:  "Enter existing category name",
                    instructors:instructors
        })
    }
    
    var addCoupon="insert into coupons (Coupon_ID, Owner_Username, SDate, EDate,discount_percentage, Category_Name) values ("+RandomCoupon_ID+",'"+req.body.Owner_username2+"','"+req.body.start+"','"+req.body.end+"',"+ req.body.percentage+",'"+req.body.Category2 +"');";
        
        await ApplyQuery(addCoupon);

        return res.render('add_any', {
            title: 'Add...', 
            css: 'add_any',
            message: "Coupon is added successfully !",
                instructors:instructors}
        );
}


    return res.render('Account_Settings', {
        title: 'Account_Settings',
        css: 'Account_Settings',
        message: "Nothing is added",
                instructors:instructors
    })
});

  
const ApplyQuery = (query) => {
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

        }, 1000);
    });
};
module.exports = router;