from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import User, Items
from .jwt import decode_jwt

@csrf_exempt
def get_user_item(req,user_id):

    try:
        if req.method !="GET":
           JsonResponse({"msg":"this is not valid method"},status=405)
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
            return JsonResponse({"error": "You are not allowed to add items for this user"}, status=403)
        #get user by id
        user=User.objects.filter(id=token_user_id).first()
        if not user:
            return JsonResponse({"msg":"User is not found"})
          

        user_items = list(
             map(
             lambda item: {
            "id": item.id,
            "title": item.title,
            "task": item.task,
            "complete": item.complete,
             },
            user.items_rel.all()   # queryset ✅
              )
          )
    
        return JsonResponse({"msg":"sucessfully find User items",
                      "items":user_items},status=200)
        

    except  Exception as e:
        return JsonResponse({"error":str(e)},status=400)