"""  
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .add_user import users  # your in-memory user list

@csrf_exempt
def delete_user(request, user_id):
    try:
        # Only allow DELETE requests
        if request.method != "DELETE":
            return JsonResponse({"error": "Method not allowed"}, status=405)

        # Convert to int just to be safe
        user_id = int(str(user_id).strip())


        # Find the user with this ID
        find_user = next(filter(lambda u: u["id"] == user_id, users), None)

        if not find_user:
            return JsonResponse({"sms": "User not found"}, status=404)

        # Remove the user from the list
        users.remove(find_user)

        return JsonResponse({"sms": "Successfully deleted", "users": users})

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
def delete_user(req,user_id):
    try:
        if req.method !="DELETE":
            return JsonResponse({"error":" Method doesnot Allow"},status=400)
        auth_header = req.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JsonResponse({"error": "Authorization token required"}, status=401)
         # 🔓 Extract token
        token = auth_header.split(" ")[1]
        payload = decode_jwt(token)
        if not payload:
            return JsonResponse({"error": "Invalid or expired token"}, status=401)
                # 👤 User from token
        token_user_id = payload.get("user_id")
        token_user = User.objects.filter(id=token_user_id).first()

        if not token_user:
            return JsonResponse({"error": "User not found"}, status=404)

        # 🔒 Only allow self-delete
        if token_user.id != int(user_id):
            return JsonResponse({"error": "Permission denied"}, status=403)
                # 🗑️ Delete user
        token_user.delete()
        return JsonResponse(              
                         {
        "sms": "User deleted successfully",
        "user": {
            "id": token_user.id,
            "username": token_user.username,
            "email": token_user.email,
            "password":token_user.password
        },
       },
    status=200
)

    except Exception as e:
        return JsonResponse({"error":str(e)},status=400)

