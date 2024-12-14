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

### JWT Tokens
 Now lets understand how JWT tokens works and then implement it them in the rest_framework which is the first thing.What is JWT tokens ,it stand for **Json Web Tokens**  and it acts as the permissions or **authentication** everytime we access a website. The idea is ,we have a frontend and the frontend is separate from the backend . So every time a request is made to the backend , the backend **needs to know who "we" are** and do we have permissions to do . So what to do is that need to include a token along with the request to the bakend and that token can be decoded and understood to represent a certain set of permissions. For example , if a person sign in as user "XYZ " then that user will be granted a token and then the token will be used with all the future requests to tell the backend ,who's actually interacting it and what permissions they have. 

The basic flow is that their a frontend and the frontend is communicating with the backend , its  doing that through a "request". The frontend will send a request to the backend and then the frontend will recieve a response from the backend .It means first visit the frontend , the first thing that is need to do is to get access to JWT tokens . So the user is able to interact with the backend and perform some operations now in order to do that what will be need to do is pass some credentials to the frontend ,username or a password. The frontend will then take those credentials and send it to the backend and it will ask the backend , take this credentials and grant me a token based on these credentials , so assuming the username and the password is correct then two tokens will be granted , **an access token** and **refresh token**. The access token is it will allow us to access all out requests or service on behalf of a user and the refresh token is what will be used to refresh the access token . Now what the frontend will do at that time is it will store both the access token and the refresh token. It will store them so that it can continue to use them with future requests and it does not require to constantly signin into the application. if a user is using this access token and all of a sudden it expires maybe its been 30 mins and the token is no longer valid then what frontend will do is it will simply submit the refresh token to a specific route to the backend and if the refesh token is valid a new access token will be sent back to the frontend and it will store it and continue using that token . And the reason to do this is because if an access token were to be leaked ,we want that access token to expire in a certain amount of time so it cannot be used permanently and give someone else access to the one's account.The concept is need to expire the token quickly and can be kept refreshing it and then after the refresh token expires , the user need to actually sign back into the website to get a new set of refresh and access token.

Now in order to actually grant an access token is need to have a set of credentials , so for that the first thing to do is to create a new user , once new user is created then their username and password can be stored and use their credentials , so use the username and their password to log in and access the access token for that user.

###JWT Setup

Inside the main api folder create  a new file called **serializers.py** and then import "from django.contrib.auth.models import User and from rest_framework import serializers". Next is to create something know as **serializer** and what django does is it uses something known as **ORM** , an ORM is an object relational mapping what this does is it maps python objects to the corresponding code that needs to be executed to make a change in the database so the idea is from the developer perspective , just a normal python code can be written and django in the backend will automaticaly handle all of the database operations that need to be performed now where a serializer comes in is that with the API , use something know as **Json** . Json is javascript object notation and it is the standard format for communicating with web applications ,so from the API , we are accepting json data that contains things like the username and the password for a new user and alsom returning json data with information about the response that this API is giving to whoever made a request so what is needed to do is to create a serializer which is something that can take this python object and convert it into json data.

#### Creating a Serializer for Authentication

Make a class UserSerializer and it is going to inherit from serializers.Modelserializer then a meta class then variable name model taking the User which we have imported ,variable name  fields taking an array with id , username , password next variable is extra_kwargs = {"password":{"write-only":True}} what this does here is it tells django that we want to accept password when we are creating a new user but we dont want to return the password when we are giving the information about a user in simple words no one can read the password. Next after the class meta create  a funciton def create(self,validated_data): taking a variable name  user which is equals to user that is imported .objects.create_user(**validated_data)) return user. This is implementing a method that will be called when we want to create a new version of this user in this case to create a new version of user is the function will accept the validated data which are the fields we have pass in class meta then checks if its valid then it will pass the data in the object.

#### Creating a view for New User Register 

Next is go to views.py file in api folder , creating a simple view that allows us to create a new user , so we have the serializer ,then import the serializer. and User ,generics,IsAuthenticated ,AllowAny . Then making a class based view that will allow us to implement creating a new user or kind of like a registration . Creating a class with name CreateUserView inherit generics.CreateAPIView then variable queryset having all user objects so that we have check whether the user exists or not , serializer_class having UserSerializer that is imported , this says that what kind of  data is need like username and password and permission_classes having[AllowAny] it will allow anyone to create this user even a not authenticated person .

#### Adding urls

Next is urls.py which in the backedn folder , here we configure all the different urls path .import the view that we have just created .Then import from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView this is for jwt access and refresh tokens. Lets us create a new user so once the user is created we can use access token and refresh token. so define a path "api/user/register/",CreateUserView.as_view(),name="register" it means in this path it will call the given view which will allow us to make new user next path is api/token , TokenObtainPairView.as_view() name="get_token" this to make token using pre built function.Next is api/token/refresh , TokenRefreshView.as_view(), name="refresh" this is for refresh token. "api-auth/",include("rest_framework.urls") this means include all the urls from the restframework so import include also beside path .

#### Running the code and Testing 

In the **Terminals** then in backend directory going to make migrations with command python manage.py makemigrations which is use when we make a change in the data model runing this command first time will create a file for makemigrations then migrate the changes python manage.py migrate and then finally run he server with python manage.py runserver. Then a path http://127.0.0.1:8000/   like this will dispplay so go to that path.You can see page not found because we have not gone to any of the paths that we have defined. Going to **api/user/register/** soo you can see a username and password field in the form type. So pass a username and password and create a new user  and see how we get access token . Im giving user as username and user123 as password.Once the user is created then go to **api/token/** it will ask the credentials once we pass our credentials it will give us our access and refresh tokens.Once the credentials are given you can see refresh and access tokens.If refresh token is copied and then go to refresh tokens route and paste it . It gives new acess token.

#### Creating a Model for Notes

Next is writing routes for authenticated users.Now making a new model inside of api , models.py . Then import from django.contrib.auth.models import User and make a new class name **Note** and parameters with models.Model.As said before django works or ORM model so it will automatically handle the python code converting it into correct daabase code.Then we want title as characterfield with max length 100 , content with textfield , created_at  with DateTime field with auto_now_add is True and author as foreignkey of user on_deleted=models.CASCADE related_name="notes" then defined __str__ with self then return self.title. So the author is a foreign key so I want to say is one author can have many notes ,author is linked with user model then it is said on delete if the author is delete then delete all th all the fields it has created and related_name notes means author is connected with notes.

#### Making a Serializer for Notes

Now make a serializer for the model we just created because it is an API and we need to be able to convert this into Json data so that we can recieve it and return it .So in serializers file import that model we just created . Then make a new class name **NoteSerializer** then same parameter as the above class then againn class Meta then model = Note ,fields =["id","title"] enter all the model fields that are just created then extra_kwargs , pass the author ans say read_only True . read_only because the author is not made manually it is created when the user is registered soo we want read only function.

#### Creating view for Adding and Deleting notes

Now going to the views.py to make view for creating a note and deleting a note. So import models and serializer we created . Then create a view name NoteListCreate then inherit generics.ListCreateAPIView then make a serializer_class which is equal to the serializer we just imported , permission_classes=IsAuthenticated means user cannot call this route unless the user is authenticated and pass a valid JWT token . Why using ListCreateAPIView because it will list all if the notes that the user has created .Then defined a function with name get_queryset with argument self then user = self.request.user this will give us the user object . Now if you want to list all of the notes then return Note.obejcts.all() but if you want to return the notes that are written by a specific user the return Note.objects.filter(author=user) .  Next function is perform_created with argument self and serializer then say if serializer is valid then serializer.save(author=self.request.user) else print serializer.errors.Now lets create a view for deleting note so make class NoteDelete with generics.DestroAPIView then same variables serialzer class and permission class then define a function get_query with same code as created before .

#### Adding the urls and connecting the routes

Now lets setup urls for this views so in api folder create a new file name urls.py. import django.urls import path then from. import views , urlpatterns=[path("notes/",views.NoteListCreate.as_view(), name="note-list"),path("notes/delete/<int:pk>",views.NoteDelete.as_view(), name ="delete-note")] int:pk stands for primary key .Now link the urls with the main urls.Now go to urls.py in the backend .path("",include("api.urls")).Now make migrations and run the code .Then go to api/token login then copy the access token . then go to api/notes it says authentication were not provided its because we didnt pass the access token. So for that we are just going to write the frontend and then pass that token and actually be aple to create the notes.

### Starting with React