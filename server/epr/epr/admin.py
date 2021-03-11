from django.contrib import admin
from .models import Language, Translation, ContentType, Content

admin.site.register(Language)
admin.site.register(Translation)
admin.site.register(ContentType)
admin.site.register(Content)
