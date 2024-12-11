# Django-and-React-Project


This project demostrates creating of full stack web app using Django for backend and React for frontend. It also implements  authentication using JWT tokens and deployment of this application.

In this project , their a Register page in which new user have to register it contains username and passwords after the registeration the new account is created then their is a Login page so we can login into the account using the same username and password to get into that account . Then it brings a page where one is able to create some different notes  . So their a option for create note click it then you can see title and content just fill it and submit then refresh you can see that note in the top and you can even delete the note.

Starting with building the backened ,backend is going to be the API , its going to store the data and handle different users.

Once backend is build next is to build the frontend .The frontend is the user facing component of the application which will allow the people to interact with the API , in this case to ake new notes to sign in or to sign out .

Once that is done , the next step is to deploy a database then connect the database to the backend . So their is something that is more robust  and that is stored in the cloud that means we can access our database from other sources and thats typically the best practice . 

Deploy the backend and deploy the frontend and then connect both of them together.

### Backend Installation  

First begining with backened so is need to do here is to open up a directory in VS code . Create a folder of any name and open that in vscode .so the first thing is to create a virtual environment to install various python packages. So to do that the command is **python -m venv env**  run this ,its going to create  a new virtual environment  directory .now next step is to activate the virtual environment with commant **env/scripts/activate** then if the activation is correct then you will see a prefix like **env** before the terminal line. Now the virtual environment is activate now next is to install of the dependencies for the project.

### Install all the Dependencies

For installing all the dependencies , their an actual need to create a new file inside the main folder with name **requirements.txt**.
Paste all the python packages need in this project directly inside the requirements file.
The following is the required pacakges.

asgiref
Django
django-cors-headers
djangorestframework
djangorestframework-simplejwt
PyJWT
pytz
sqlparse
psycopg2-binary
python-dotenv

So need to install this packages for that write a commant in the terminal **pip install -r requirements.txt** and enter.

### Create a New Django Project and App

After installing all the packages need to do is create a Django Project.For making new django project need to write a  command **django-admin startproject backend** and run it. A new folder name backend can be seen inside the main folder . Now get inside the backend directory by **cd backend** .

Next is to create a new django app inside backend where we can write the own custom views and custom code . So inside the backend folder their another backend folder and this is kind of the main directory where their is settings but it is not where we write the custom code . We write the custom code is in an app and we can have mutliple apps for different types. Next go to terminal and add a command **python manage.py startapp api**,
this command means creating new app with name api , and run it.Now inside the main backend folder , the new folder can be seen name api, it is the same app that is been created.Next is go to backend folder then **settings.py** . Now inside this file we will put a bunch of settings need to be written .Starting right from the top  and importing  **from datetime import timedelta** then **from dotenv import load_dotenv** and **import os** . Then call the function **load_dotenv()**. Scrolldown and go to ALLOWED_HOSTS=["*"] ,soo writing * inside the string this willallow any different host to host the django application. The reason for doing this is that we dont get an error later on while deploying this application and its running on some host thats not aware .Now after allowed hosts paste this 
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

this is the configuration for JWT tokens to work properly.Now in installed apps , add "api" . Whenever an app is created ,mention it in the installed apps.then add "rest_framework", "corsheaders".Adding cors so that it wont give error .Then go to middleware and add "corsheaders.middleware.CorsMiddleware".At the bottom create variable CORS_ALLOW_ALL_ORIGINS = True and CORS_ALLOWS_CREDENTIALS = True . Next go to requirements.txt file and move it inside backend folder . So their are only 2 folders inside the main folder that is backend and env.

