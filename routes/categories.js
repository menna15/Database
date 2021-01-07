const router = require('express').Router();
var db = require('../db');


router.get('/', async (req, res) => {
        


        var categories= await GetCategories('SELECT * FROM Categories');
        var coupons = await GetCoupons('SELECT * FROM Coupons');

        var category_courses = [];
        for(let i =0; i<categories.length; i++){
            var sqlquery = "SELECT * FROM Courses WHERE Category_Name = '" + categories[i].CName + "';";
            var tmp_CourseContainer = await GetCategoryCourses(sqlquery);
            if(tmp_CourseContainer!=[]){
                category_courses.push(tmp_CourseContainer);
            }
        }



        return res.render('categories', {
            title: 'categories',
            css: 'categories',
            categories:categories,
            categories_courses:category_courses,
            coupons:coupons
        })

});
const GetCategories = (query)=>{
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            db.query(query, (err,rows) =>{
                if(!err){
                    console.log("Post viewed");
                    resolve(rows);
                }
                else{
                    reject(new Error(err));
                }
            });
        },100);
    });
};
const GetCategoryCourses = (query)=>{
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            db.query(query, (err,rows) =>{
                if(!err){
                    console.log("Post viewed");
                    resolve(rows);
                }
                else{
                    reject(new Error(err));
                }
            });
        },100);
    });
};
const GetCoupons = (query)=>{
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            db.query(query, (err,rows) =>{
                if(!err){
                    console.log("Post viewed");
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