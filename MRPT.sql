CREATE DATABASE MRPT;
USE MRPT;
create table IF NOT exists Owners
(
Fname varchar(50) not null,
Lname varchar(50) not null,
primary key (Username),
profile_Pic varchar(1024),
Password varchar(50),
Email varchar(50),
Username varchar(50) not null,
Head_username varchar(50) ,
Gender varchar(6),
FOREIGN KEY (Head_username) REFERENCES Owners(Username)
);

--  --
create table IF NOT exists IT_Adminstrators
(
Fname varchar(50) not null,
Lname varchar(50) not null,
Username varchar(50) not null,
Profile_Pic varchar(1024),
Owner_Username varchar(50),
Password varchar(50),
Email varchar(50),
Gender varchar(6),
primary key (Username),
Foreign key (Owner_Username) references Owners (Username)
);

-- --
create table IF NOT exists Programs
(
PName varchar(100) not null ,
Cost float,
Level varchar(50),
Duration int,
Program_info TEXT,
Program_image varchar(1024),
IT_Username varchar(50) not null,
primary key (PName),
foreign key (IT_Username) references IT_Adminstrators(Username)
);
-- --
create table IF NOT exists Categories
(
CName varchar(100) not null,
IT_Username varchar(50) not null,
Category_image varchar(1024),
primary key (CName),
foreign key (IT_Username) references IT_Adminstrators(Username)
);


create table if Not exists Instructors
(
Fname varchar(50) not null,
Lname varchar(50) not null,
Username varchar(50) not null,
IT_Username varchar(50) not null,
Profile_Pic varchar(1024),
Password varchar(50),
Email varchar(50),
Total_Income float,
Gender varchar(6),
primary key (Username),

Foreign key (IT_Username) references IT_Adminstrators(Username)
);
-- -- 
-- --
create table IF NOT exists Courses
(
Course_ID int not null,
Course_Name varchar(100) not null,
Instructors_Username varchar(50),
Category_Name varchar(100),
Programe_Name varchar(100),
Cost float,
Duration int,
Course_image varchar(1024),
Course_info MEDIUMTEXT,
Course_small_info TINYTEXT,
Course_content MEDIUMTEXT,
Primary key (Course_ID),
foreign key (Category_Name) references Categories(CName),
foreign key (Programe_Name) references Programs(PName),
foreign key (Instructors_Username) references Instructors (UserName)
);

-- --
create table if not exists Teaches
(
Instructor_Username varchar(50),
Course_ID int,
primary key (Instructor_Username,Course_ID),
rate float,
foreign key (Instructor_Username) references Instructors(Username),
foreign key (Course_ID) references Courses(Course_ID)
);
-- --
create table if not exists Students
(
Fname varchar(50) not null,
Lname varchar(50) not null,
Username varchar(50) not null,
Password varchar(50),
Email varchar(50),
Profile_Pic varchar(1024),
Gender varchar(6),
primary key (Username)

);

create table if not exists Quizzes
(
Course_ID int,
Quiz_ID   int,
Date date,
Max_Grade int,
primary key (Quiz_ID),
foreign key (Course_ID) references Courses(Course_ID)

);

create table if not exists Taken_Quizzes
(
Course_ID int,
Quiz_ID   int,
Student_Username varchar(50),
Grade float,
primary key (Quiz_ID,Course_ID,Student_Username),
foreign key (Course_ID) references Courses(Course_ID),
foreign key (Quiz_ID  ) references Quizzes (Quiz_ID),
foreign key (Student_Username) references Students (Username)
);

create table if not exists Coupons
(
Coupon_ID varchar(20),
Owner_Username varchar(50),
SDate date,
EDate date,
discount_percentage int,
Category_Name varchar(100),
primary key (Coupon_ID),
foreign key (Owner_Username) references Owners(Username),
foreign key (Category_Name) references Categories(CName)
);
-- --
create table if not exists Income_Analysis
(
Course_ID int,
Total_enrollement  int,
Total_income float,
Net_profit float,
Instructors_fees float,
primary key (Course_ID),
foreign key (Course_ID) references Courses(Course_ID)

);
--
create table if not exists Enroll_into_course
(
Course_ID int,
Student_Username varchar(50),
Date date,
primary key (Course_ID,Student_Username),
foreign key (Course_ID) references Courses(Course_ID),
foreign key (Student_Username) references Students(Username)

);
--
create table if not exists Enroll_into_program
(
Pname varchar(100),
Student_Username varchar(50),
Date date,
primary key (Pname,Student_Username),
foreign key (Pname) references Programs(PName),
foreign key (Student_Username) references Students(Username)

);
-- 
create table if not exists Donors
(
Dname varchar(100) not null,
Email  varchar(100),
Date date,
Amount float,
primary key (Email,Date,Amount)
);
-- --
create table if not exists Included  -- courses in each program
(
Course_ID int ,
Pname varchar(100),
primary key (Course_ID,Pname),
foreign key (Course_ID) references Courses (Course_ID),
foreign key (Pname  ) references Programs(PName)
);

/*Insert Records*/
-- Owners --
INSERT INTO Owners (Fname, Lname, Username) VALUES ("Will", "Smith", "willsmith");

-- IT Adminstrators --
INSERT INTO IT_Adminstrators  VALUES ("Medhat","kamal","Mkamal" ,"Kamal.jpg","willsmith","999879","medhat55@gmail.com","Male");


-- Categories -- 
INSERT INTO Categories (CName, IT_Username, Category_image) VALUES ("Data Science", "Mkamal","images/dataScience.png");
INSERT INTO Categories (CName, IT_Username, Category_image) VALUES ("IOT", "Mkamal","images/IOT.jpeg");
INSERT INTO Categories (CName, IT_Username, Category_image) VALUES ("Quantum", "Mkamal","images/quantum.jpg");
INSERT INTO Categories (CName, IT_Username, Category_image) VALUES ("Web Development", "Mkamal","images/Web_Dev.png");

-- Programs --
INSERT INTO Programs (PName,IT_Username,Cost, Level, Duration, Program_info, Program_image) VALUES ("AI", "Mkamal", 15000, "Beginner", 3, "Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "images/ML.jpeg");
INSERT INTO Programs (PName,IT_Username, Cost, Level, Duration, Program_info, Program_image) VALUES ("Web Development", "Mkamal", 15000, "Beginner", 3, "Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "images/Web_Dev.png");
                                    

-- instructors --
insert  into Instructors values ('Omar','Kamal','OmarA',"Mkamal","images/author.jpg",null,null,900, "Male");
insert  into Instructors values ('Emad','Atalah','EmadA',"Mkamal","images/author.jpg",null,null,1000, "Male");
INSERT INTO Instructors VALUES ("Menna", "Ahmed", "mennaahmed","Mkamal", "images/author.jpg", null, null,null, "Female");
INSERT INTO Instructors VALUES ("Reem", "Attalah", "reemattalah", "Mkamal", "images/author.jpg", null, null, null,"Female");


-- Courses -- 
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image,Course_content) VALUES (1,"Probability", "reemattalah", "Data Science", "AI", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon","Learn with Us now!", "/images/course_5.jpg","https://drive.google.com/drive/folders/1hqmuFtbxwzDCaCEgrzEk3apL2C5150PE");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image,Course_content) VALUES (2,"Statistics", "reemattalah", "Data Science", "AI", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "Learn with Us now!","/images/course_5.jpg","https://drive.google.com/drive/folders/1hqmuFtbxwzDCaCEgrzEk3apL2C5150PE");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image,Course_content) VALUES (3,"Data Analysis", "reemattalah", "Data Science", "AI", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon","Learn with Us now!", "/images/course_5.jpg","https://drive.google.com/drive/folders/1hqmuFtbxwzDCaCEgrzEk3apL2C5150PE");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image,Course_content) VALUES (4,"Machine Learning", "mennaahmed", "Data Science", "AI", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon","Learn with Us now!", "/images/course_5.jpg","https://drive.google.com/drive/folders/1hqmuFtbxwzDCaCEgrzEk3apL2C5150PE");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image,Course_content) VALUES (5,"HTML Basics", "mennaahmed", "Web Development", "Web Development", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon","Learn with Us now!", "/images/course_5.jpg","https://drive.google.com/drive/folders/1hqmuFtbxwzDCaCEgrzEk3apL2C5150PE");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image,Course_content) VALUES (6,"CSS Basics", "mennaahmed","Web Development", "Web Development", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon","Learn with Us now!", "/images/course_5.jpg","https://drive.google.com/drive/folders/1hqmuFtbxwzDCaCEgrzEk3apL2C5150PE");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image,Course_content) VALUES (7,"JavaScript Basics", "mennaahmed","Web Development", "Web Development", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "Learn with Us now!", "/images/course_5.jpg","https://drive.google.com/drive/folders/1hqmuFtbxwzDCaCEgrzEk3apL2C5150PE");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username,Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image,Course_content) VALUES (8,"PHP Basics", "mennaahmed","Web Development", "Web Development", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon","Learn with Us now!", "/images/course_5.jpg","https://drive.google.com/drive/folders/1hqmuFtbxwzDCaCEgrzEk3apL2C5150PE");

-- Copouns -- 
INSERT INTO Coupons (Coupon_ID, SDate, EDate, discount_percentage, Category_Name) VALUES ("MNO1234TR","2021-01-05","2021-01-15",15, "Data Science");
INSERT INTO Coupons (Coupon_ID, SDate, EDate, discount_percentage, Category_Name) VALUES ("lsey12wre","2021-01-07","2021-01-20",15, "IOT");
INSERT INTO Coupons (Coupon_ID, SDate, EDate, discount_percentage, Category_Name) VALUES ("ERE87KDMS","2021-01-22","2021-02-05",15, "Quantum");


-- Teaches --
insert into Teaches values("OmarA",3,"5");
