""" from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .add_user import users


@csrf_exempt
def get_users(req):
    try:
        if req.method=="GET":
           return  JsonResponse({"users":users})

    except Exception as e:
        return JsonResponse({"error":str(e)},status=500)
 """


from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..models import User
@csrf_exempt
def get_users(req):
    try:
        if req.method=="GET":
            users = User.objects.all()
            users_list = [u.to_dict() for u in users]  
            return JsonResponse({"users": users_list}, status=200)
    except Exception as e:
        return JsonResponse({"error":str(e)},status=400)