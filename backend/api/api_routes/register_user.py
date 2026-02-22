""" from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

users=[]

# post request
@csrf_exempt
def add_user(req):
    try:
        if req.method=="POST":

            data=json.loads(req.body)
            id=len(users)+1
            username=data["username"]
            email=data["email"]
            password=data["password"]
            repassword=data["repassword"]
            if not username or not  email or not password or not repassword:
                return JsonResponse({"error":"Please fill all fields"},status=400)
            if password != repassword:
                return JsonResponse({"error":"password doesnot match"})
            newUser={
                "id":id,
                "username":username,
                "email":email,
                "password":password
            }
            findUser=next(filter(lambda u:u["username"]==username or u["email"] ==email,users),None)
            if findUser:
                return JsonResponse({"sms":"user is already exist"},status=400)


            users.append(newUser)
            return JsonResponse({"sms":"sucessfully registered","user":newUser})
        

    except Exception as e:
        return JsonResponse({"error":str(e)},status=500) """

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import User
from django.db.models import Q


# post request
@csrf_exempt
def register_user(req):
    try:
          if req.method=="POST":
                data=json.loads(req.body)
                username=data.get("username")
                email=data.get("email")
                password=data.get("password")
                repassword=data.get("repassword")
                if not username or not email or not password or not repassword:
                    return JsonResponse({"sms":"Please fill all fields"},status=400)
                if password !=repassword:
                    return JsonResponse({"sms":"Password doesnot match"},status=400)
                exist_user = User.objects.filter(Q(username=username) | Q(email=email)).first()
                if exist_user:
                    return JsonResponse({"sms":"User already exists"},status=409)
                new_user={
                     "username":username,
                     "email":email,
                     "password":password,
                     "items":[],
                }
                User.objects.create(**new_user)
                return JsonResponse({"sms":"User created successfully","user":new_user},status=201)   
    except Exception as e:
            return JsonResponse({"error":str(e)},status=400)

 