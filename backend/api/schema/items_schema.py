from django.db import models
from ..models import User
class Items(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="items_rel",
         null=True,  
         blank=True
    )
    title = models.CharField(max_length=255)
    task = models.CharField(max_length=255)
    complete = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "task": self.task,
            "complete": self.complete
        }