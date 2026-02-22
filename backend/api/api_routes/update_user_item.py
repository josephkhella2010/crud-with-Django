from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import User, Items
from .jwt import decode_jwt

@csrf_exempt
def update_user_item(req,user_id,item_id):
    try:
        if req.method !="PUT":
            return JsonResponse({"error": "Invalid method"}, status=405)
                           # 🔐 Authentication
        auth_header = req.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JsonResponse({"error": "Authorization token required"}, status=401)

        token = auth_header.split(" ")[1]
        payload = decode_jwt(token)
        if not payload:
            return JsonResponse({"error": "Invalid or expired token"}, status=401)

        # assign token user ID first
        token_user_id = payload.get("user_id")

        # 🔒 Authorization check
        if token_user_id != user_id:
            return JsonResponse({"error": "You are not allowed to delete items for this user"}, status=403)
        # get user and item by id
        find_user=User.objects.filter( id=user_id).first()
        find_item=Items.objects.filter( id=item_id,user=find_user).first()
       
        if not find_user:
            return JsonResponse({"error":"user not found"})
        if not find_item:
            return JsonResponse({"sms":"item not found"})
        # update items
        data=json.loads(req.body)
        if "title" in data:
            find_item.title=data["title"]
        if "task" in data:
            find_item.task=data["task"]
        if "complete" in data:
            find_item.complete=data["complete"]

        find_user.save()
        find_item.save()

    
        updated_user = {
            "id": find_user.id,
            "username": find_user.username,
            "email": find_user.email,
            "password": find_user.password,
            "items": list(find_user.items_rel.values("id", "title", "task", "complete"))
        }

        return JsonResponse({"sms":"successfully updated","user": updated_user},status=200)

    except   Exception as e:
        return JsonResponse({"error":str(e)},status=400) 




     
