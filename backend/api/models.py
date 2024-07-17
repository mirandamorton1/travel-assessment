from django.db import models

class MyModel(models.Model):
    # Define your fields here
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

