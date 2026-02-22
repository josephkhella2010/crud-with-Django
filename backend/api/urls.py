from django.urls import path

from .api_routes.register_user import register_user
from .api_routes.get_users import get_users
from .api_routes.login_user import login_user
from .api_routes.delete_user import delete_user
#from .api_routes.delete_user import delete_user
from .api_routes.update_user import update_user
from .api_routes.add_item import add_item
from .api_routes.get_user_item import get_user_item
from .api_routes.delete_user_item import delete_user_item
from .api_routes.update_user_item import update_user_item

urlpatterns = [
    path('users/',get_users),
    path('register-user/',register_user),
    path('login-user/',login_user),
    path('delete-user/<int:user_id>/',delete_user),
    #path('delete-user/<int:user_id>/', delete_user),
     path('update-user/<int:user_id>/',update_user),
     path('add-item/<int:user_id>/',add_item),
     path('get-user-item/<int:user_id>/',get_user_item),
     path('update-user-item/userId=<int:user_id>/itemId=<int:item_id>/', update_user_item),
     path('delete-user-item/userId=<int:user_id>/itemId=<int:item_id>/', delete_user_item),
]
