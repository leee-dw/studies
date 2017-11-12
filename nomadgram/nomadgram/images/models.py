from django.db import models 
from nomadgram.users import models as user_models


class TimeStampedModel(models.Model):

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    abstract = True

class Image(TimeStampedModel):

# Image Model
  file = models.ImageField()
  location = models.CharField(max_length=140)
  caption = models.TextField()
  creator = models.Foreignkey(user_models.User, null=True)


class Comment(TimeStampedModel):

# Comment Model
  message = models.TextField()
  creator = models.Foreignkey(user_models.User, null=True)
  image = models.Foreignkey(Image)


class Like(TimeStampedModel):

# Like Model
  creator = models.Foreignkey(user_models.User, null=True)
  image = models.Foreignkey(Image)