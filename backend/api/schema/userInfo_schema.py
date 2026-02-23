
from django.db import models
class User(models.Model):
    username = models.CharField(max_length=150)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    items=models.JSONField(default=list, blank=True)

    def __str__(self):
                return self.username
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "password":self.password,
            "items": list(self.items_rel.values("id", "title", "task", "complete"))

        }





