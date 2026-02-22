""" from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .add_user import users  
import json

@csrf_exempt
def update_user(req, user_id):
    try:
        if req.method != "PUT":
            return JsonResponse({"error": "Only PUT method allowed"}, status=405)

        data = json.loads(req.body)

        user_id = int(user_id)
        # Find original user object
        findUser = next(filter(lambda u: u["id"] == user_id, users), None)
        print("Original User object:", findUser)

        if not findUser:
            return JsonResponse({"error": "User not found"}, status=404)

        # Update the original object
        for key in ["username", "email", "password"]:
            if key in data:
                findUser[key] = data[key]

        updated_user = {**findUser}  
        print("Updated User object to return:", updated_user)

        return JsonResponse({"sms": "Successfully updated", "user": updated_user})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
 """


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db.models import Q
from ..models import User
from .jwt import decode_jwt

@csrf_exempt
def update_user(req, user_id):
    try:
        if req.method !="PUT":
           return JsonResponse({"sms":" not valid method"},status=405)
        auth_header = req.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JsonResponse({"error": "Authorization token required"}, status=401)
         # 🔓 Extract token
        token = auth_header.split(" ")[1]
        payload = decode_jwt(token)
        if not payload:
            return JsonResponse({"sms":"Expired Token"},status=401)
        token_user_id=payload.get("user_id")

        if  token_user_id != int(user_id):
            return JsonResponse({"error": "Permission denied"}, status=403)
        exist_user=User.objects.filter(id=user_id).first()
        if not exist_user:
            return JsonResponse({"sms":"User is not found"},status=401)
        
        data=json.loads(req.body)
  
        # ✅ SAFE updates (no KeyError)
        if "username" in data:
            exist_user.username = data["username"]

        if "email" in data:
            exist_user.email = data["email"]

        if "password" in data:
            exist_user.password=data["password"]
        user_items= exist_user.items_rel.all()
        update_user={
            "id":exist_user.id,
            "username": exist_user.username,
            "email":exist_user.email,
            "password":exist_user.password,
             "items":[
                 {
                      "id": item.id,
                       "title": item.title,
                       "task": item.task,
                       "complete": item.complete,
                 }
                 for item in user_items
             ],
        }

        exist_user.save()
        return JsonResponse({"sms":"sucessfully updated","user":update_user},status=200)
    

    except Exception as e:
        return JsonResponse({"error":str(e)},status=400)
    





    
