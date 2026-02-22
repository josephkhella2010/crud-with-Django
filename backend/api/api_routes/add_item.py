""" from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import User, Items
from .jwt import decode_jwt

@csrf_exempt
def add_item(req,user_id):
    try:
        if req.method !="POST":
           return JsonResponse({"msg":"this mesthod is not avaliable"},status=409)
        

        # authenitiations:

        auth_header = req.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JsonResponse({"error": "Authorization token required"}, status=401)
         # 🔓 Extract token
        token = auth_header.split(" ")[1]
        payload = decode_jwt(token)
        if not payload:
            return JsonResponse({"error": "Invalid or expired token"}, status=401)
        # 🔒 Authorization check
        if token_user_id != user_id:
            return JsonResponse(
                {"error": "You are not allowed to add items for this user"},
                status=403
            )
        #end authentication
        # find user
        token_user_id = payload.get("user_id")
        user = User.objects.filter(id=token_user_id).first()
        if not user:
            return JsonResponse({"error": "User not found"}, status=404)

        #

        data=json.loads(req.body)
        title=data.get("title")
        task=data.get("task")
        complete = bool(data.get("complete", False))
        new_task={
            "title":title,
            "task":task,
            "complete": complete,
        }
        Items.objects.create(user=user,** new_task)
        user.items.append(new_task)
        user.save()
        return JsonResponse({"msg":"sucessfully added","user":user.to_dict(),"task": new_task},status=200)

    

    except Exception as e:
        return JsonResponse({"error":str(e)},status=400) """


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import User, Items
from .jwt import decode_jwt

@csrf_exempt
def add_item(req, user_id):
    try:
        if req.method != "POST":
            return JsonResponse({"msg": "This method is not allowed"}, status=405)

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

        # fetch user from DB
        user = User.objects.filter(id=token_user_id).first()
        if not user:
            return JsonResponse({"error": "User not found"}, status=404)

        # parse request body
        data = json.loads(req.body)
        title = data.get("title")
        task = data.get("task")
        complete = bool(data.get("complete", False))
        item = Items.objects.create(user=user, title=title, task=task, complete=complete)

        new_task = {
            "id":item.id,
            "title": title,
            "task": task,
            "complete": complete
        }

        # 🗃 Save to Items table
        #item = Items.objects.create(user=user, **new_task)

        # optional: save to User JSONField
        user.items.append(new_task)
        user.save()

        return JsonResponse({
            "msg": "Successfully added",
            "user": user.to_dict(),
            "task": new_task
        }, status=201)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
