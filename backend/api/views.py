"""

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

users=[]
 def hello(request):
    try:
        return JsonResponse({"users":users})
    except Exception as e:
        return JsonResponse({"error":str(e)},status=500) 
# post request
@csrf_exempt
def add_user(req):
    try:
        if req.method=="POST":
            data=json.loads(req.body)
            username=data["username"]
            email=data["email"]
            password=data["password"]
            repassword=data["repassword"]
            if not username or not  email or not password or not repassword:
                return JsonResponse({"error":"Please fill all fields"},status=400)
            if password != repassword:
                return JsonResponse({"error":"password doesnot match"})
            newUser={
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
        return JsonResponse({"error":str(e)},status=500)
    
#get users
@csrf_exempt
def get_users(req):
    try:
        return JsonResponse({"users": users})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
"""