from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import User, Items
from .jwt import decode_jwt

@csrf_exempt

def delete_user_item(req,user_id,item_id):
    try:
        if req.method !="DELETE":
           return JsonResponse({"msg":"method is not valid"},status=405)
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

        #get user by id
        user = User.objects.filter(id=user_id).first()
        item = Items.objects.filter(id=item_id, user=user).first()

        if not user:
            return JsonResponse({"msg":"User is not found"},status=404)
        if not item:
            return JsonResponse({"msg":"Item not found"},status=404)
        item.delete()
        items=Items.objects.all()
        users_obj=User.objects.all()
        user_items=list(map(lambda item:{
            "id":item.id,
            "title":item.title,
            "task":item.task,
            "complete":item.complete

        },items))
        users=list(map(lambda u:{
            "id":u.id,
            "username": u.username,
            "email": u.email,
            "password":u.password,
            "items": list(u.items_rel.values("id", "title", "task", "complete"))
        }, users_obj))
        return JsonResponse({"msg":"successfully Delete","users":users,"items":user_items},status=200)

    except Exception as e:
        return JsonResponse({"error":str(e)},status=400)