from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db.models import Q
from ..models import User
from .jwt import create_jwt

@csrf_exempt

def login_user(req):
    try:
        if req.method=="POST":
            data=json.loads(req.body)
            username=data.get("username")
            password=data.get("password")
            if not username or not password:
               return JsonResponse({"sms":"Please fill all fields"},status=409)
            existing_user=User.objects.filter(Q(username=username) | Q(email=username)).first()
            print(f"exist_user:{type(existing_user)}")
            if not existing_user:
               return JsonResponse({"sms":"User not found"},status=409)
            if existing_user.password !=password:
                return JsonResponse({"sms":"passowrd not correct"},status=409)
            token=create_jwt(existing_user)
            user = {
                   "id": existing_user.id,
                   "username": existing_user.username,
                   "email": existing_user.email,
                    "password": existing_user.password,
                    "items":existing_user.items
                   }

       
            #return JsonResponse({"sms":" successfully logged in","user":existing_user.to_dict(),"token":token},status=200)
            return JsonResponse({"sms":" successfully logged in","user": user,"token":token},status=200)
    except Exception as e:
        return JsonResponse({"error":str(e)},status=400)
    



""" from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db.models import Q
from ..models import User
from .jwt import create_jwt

@csrf_exempt
def login_user(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            if not username or not password:
                return JsonResponse({"sms": "Please fill all fields"}, status=409)

            existing_user = User.objects.filter(Q(username=username) | Q(email=username)).first()
            if not existing_user:
                return JsonResponse({"sms": "User not found"}, status=409)

            if existing_user.password != password:
                return JsonResponse({"sms": "Password not correct"}, status=409)

            token = create_jwt(existing_user)

            user_data = {
                "id": existing_user.id,
                "username": existing_user.username,
                "email": existing_user.email,
                # add more fields if needed
            }

            return JsonResponse({"sms": "Successfully logged in", "user": user_data, "token": token}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400) """

