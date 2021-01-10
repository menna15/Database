const router = require('express').Router();
var db = require('../db');

router.get('/:type/:username', async(req, res) => {

    var myType=req.params.type;
    var myUsername= req.params.username
    var sql="";
    if(myType == 'instructor')
    {
        const query= "SELECT * FROM instructors where Username ='"+myUsername+"'";
        sql =await getfromDB(query);
    }
    if(myType == 'it_administrator')
    {
        const query= "SELECT * FROM it_administrator where Username ='"+myUsername+"'";
        sql =await getfromDB(query);
    }
    if(myType == 'owner')
    {
        const query= "SELECT * FROM owners where Username ='"+myUsername+"'";
        sql =await getfromDB(query);
    }
    if(myType == 'student')
    {
        const query= "SELECT * FROM students where Username ='"+myUsername+"'";
        sql =await getfromDB(query);
    } 
    return res.render('Account_Settings', { 
        title: 'Profile/' + req.params.username, 
        css: 'Account_Settings',
        Type: req.params.type, 
        Username: req.params.username,
        SQL: sql,
        message: req.flash('message')
    })
}); 

router.post('/:type/:username', async(req, res) => {

    var sql="";

    if(req.params.type === ' instructor')
    {
        const query= "SELECT * FROM instructors where Username ='"+req.params.username+"'";
        sql =await getfromDB(query);
    }
    if(req.params.type === ' it_administrator')
    {
        const query= "SELECT * FROM it_administrator where Username ='"+req.params.username+"'";
        sql =await getfromDB(query);
    }
    if(req.params.type === ' owner')
    {
        const query= "SELECT * FROM owners where Username ='"+req.params.username+"'";
        sql =await getfromDB(query);
    }
    console.log(req.params.type);
    if(req.params.type === ' student')
    {
        const query= "SELECT * FROM students where Username ='"+req.params.username+"'";
        sql =await getfromDB(query);
        console.log("first created");
        console.log(sql);

    } 
    var firstname= "" ;
    var lastname= "" ;
    var username= ""; 
    var email="";
    var pass="";   
    var confPass="";

    firstname= req.body.FirstName ;
    lastname= req.body.LastName ;
    username= req.body.Username;
    email=req.body.Email;
    pass=req.body.Password;
    confPass=req.body.ConfPassword;

    console.log("second created");
    console.log(sql);

 
    if(firstname == "") 
        firstname= sql[0].Fname;
        console.log("third created");
        console.log(sql);


    if(lastname == "")
        lastname= sql[0].Lname;
        console.log("fourth created");
        console.log(sql);

    console.log(lastname);

    if(username == "") 
        username= sql[0].myUsername; 
        console.log("fifth created");
        console.log(sql);


    if(email == "")
        email= sql[0].email;
    if(pass == "")
        pass= sql[0].Password;
    else{
        if(confPass  == "")
            return res.render('Account_Settings', { 
                title: 'Profile/' + req.params.username, 
                css: 'Account_Settings',
                Type: req.params.type, 
                Username: req.params.username,
                message: "You must confirm Password"
            })
        
    }
    var allsql="";
    if(req.params.type == 'instructor')
    {
        const query= "INSERT INTO instructors (Fname,Lname,Username,Password,Email) ('"+ firstname +"','" + lastname+"','" +username +"','" + pass +"','" + email +"')";
        allsql =await getfromDB(query);
    }
    if(req.params.type == 'it_administrator')
    {
        const query= "INSERT INTO it_administrator (Fname,Lname,Username,Password,Email) ('"+ firstname +"','" + lastname+"','" +username +"','" + pass +"','" + email +"')";
        allsql =await getfromDB(query);
    }
    if(req.params.type == 'owner')
    {
        const query= "INSERT INTO owners (Fname,Lname,Username,Password,Email) ('"+ firstname +"','" + lastname+"','" +username +"','" + pass +"','" + email +"')";
        allsql =await getfromDB(query);
    }
    if(req.params.type == 'student')
    {
        const query= "INSERT INTO students (Fname,Lname,Username,Password,Email) ('"+ firstname +"','" + lastname+"','" +username +"','" + pass +"','" + email +"')";
        allsql =await getfromDB(query);
    }
    // console.log(allsql);
    return res.render('Account_Settings', { 
        title: 'Profile/' + req.params.username, 
        css: 'Account_Settings',
        Type: req.params.type, 
        Username: req.params.username,
        SQL: sql,
        message: "Changes are applied successfully"
    });
    
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