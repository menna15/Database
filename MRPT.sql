
USE mrpt;
create table IF NOT exists Owners
(
Fname varchar(50) not null,
Lname varchar(50) not null,
primary key (Username),
prifile_Pic varchar(1024),
Password varchar(50),
Email varchar(50),
Username varchar(50) not null,
Head_username varchar(50),
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
IT_Username varchar(50),
primary key (PName),
foreign key (IT_Username) references IT_Adminstrators(Username)
);
-- --
create table IF NOT exists Categories
(
CName varchar(100) not null,
IT_Username varchar(50),
Category_image varchar(1024),
primary key (CName),
foreign key (IT_Username) references IT_Adminstrators(Username)
);


create table if Not exists Instructors
(
Fname varchar(50) not null,
Lname varchar(50) not null,
Username varchar(50) not null,
IT_Username varchar(50),
Profile_Pic varchar(1024),
Password varchar(50),
Email varchar(50),
Total_Income float,
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
primary key (Email)
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
-- Categories -- 
INSERT INTO Categories (CName, IT_Username, Category_image) VALUES ("Data Science", null,"images/dataScience.png");
INSERT INTO Categories (CName, IT_Username, Category_image) VALUES ("IOT", null,"images/IOT.jpeg");
INSERT INTO Categories (CName, IT_Username, Category_image) VALUES ("Quantum", null,"images/quantum.jpg");
INSERT INTO Categories (CName, IT_Username, Category_image) VALUES ("Web Development", null,"images/quantum.jpg");
-- Programs --
INSERT INTO Programs (PName, Cost, Level, Duration, Program_info, Program_image) VALUES ("AI", 15000, "Beginner", 3, "", "images/ML.jpeg");
INSERT INTO Programs (PName, Cost, Level, Duration, Program_info, Program_image) VALUES ("Web Development", 15000, "Beginner", 3, "", "images/Web_Dev.png");


-- Courses -- 
INSERT INTO Courses (Course_ID, Course_Name, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_image) VALUES (1,"Probability", "Data Science", "AI", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_image) VALUES (2,"Statistics", "Data Science", "AI", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_image) VALUES (3,"Data Analysis", "Data Science", "AI", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_image) VALUES (4,"Machine Learning", "Data Science", "AI", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_image) VALUES (5,"HTML Basics", "Web Development", "Web Development", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_image) VALUES (6,"CSS Basics", "Web Development", "Web Development", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_image) VALUES (7,"JavaScript Basics", "Web Development", "Web Development", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_image) VALUES (8,"PHP Basics", "Web Development", "Web Development", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "images/course_5.jpg");

-- Copouns -- 
INSERT INTO Coupons (Coupon_ID, SDate, EDate, discount_percentage, Category_Name) VALUES ("MNO1234TR","2021-01-05","2021-01-15",15, "Data Science");
INSERT INTO Coupons (Coupon_ID, SDate, EDate, discount_percentage, Category_Name) VALUES ("lsey12wre","2021-01-07","2021-01-20",15, "IOT");
INSERT INTO Coupons (Coupon_ID, SDate, EDate, discount_percentage, Category_Name) VALUES ("ERE87KDMS","2021-01-22","2021-02-05",15, "Quantum");

-- Owners --
INSERT INTO Owners (Fname, Lname, Username) VALUES ("Will", "Smith", "willsmith");

-- instructors --
select * from instructors;
insert  into Instructors values ('Omar','Kamal','OmarA',null,null,null,null,900);
insert  into Instructors values ('Emad','Atalah','EmadA',null,null,null,null,1000);

select * from courses;
update courses set course_small_info= 'Learn with Us now!' where Course_ID=1;
select Username,Fname,Lname from courses,instructors where Username= Instructors_Username