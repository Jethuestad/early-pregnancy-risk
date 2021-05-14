from django.db import models
import uuid


class Language(models.Model):
    code = models.CharField(max_length=2)
    language = models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.code


class ContentType(models.Model):
    content_type = models.CharField(max_length=30, primary_key=True)

    def __str__(self) -> str:
        return self.content_type


class LowerCaseField(models.CharField):
    def __init__(self, *args, **kwargs):
        super(LowerCaseField, self).__init__(*args, **kwargs)

    def get_prep_value(self, value):
        return str(value).lower()


class Content(models.Model):
    class Meta:
        unique_together = (("name", "content_type"))
    name = LowerCaseField(max_length=100)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.content_type}: {self.name}"


class Translation(models.Model):
    class Meta:
        unique_together = (("language_code", "belongs_to"))
    language_code = models.ForeignKey(Language, on_delete=models.CASCADE)
    belongs_to = models.ForeignKey(Content, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self) -> str:
        return f"{self.belongs_to} ({self.language_code})"


class AnswerType(models.Model):
    type = LowerCaseField(max_length=100, primary_key=True)

    def __str__(self) -> str:
        return self.type


class Reference(models.Model):
    reference_id = models.CharField(max_length=100, null=True, blank=True)
    reference_string = models.CharField(max_length=1000)
    related_complication = models.ForeignKey(Content, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return "{}, {} - {}".format(self.related_complication, self.reference_id, self.reference_string)


class Complication_Risk(models.Model):
    severity = models.CharField(max_length=10)
    related_complication = models.ForeignKey(Content, on_delete=models.CASCADE)
    percentage = models.CharField(max_length=10)

    def __str__(self) -> str:
        return "{} - {}".format(self.related_complication, self.severity)


class Factor(models.Model):
    factor_name = LowerCaseField(max_length=100, primary_key=True)
    question = models.ForeignKey(Content, on_delete=models.CASCADE)
    answertype = models.ForeignKey(AnswerType, on_delete=models.CASCADE)
    unit = models.CharField(max_length=10, null=True, blank=True, default=None)
    skippable = models.BooleanField(default=True)
    max_digits = models.PositiveIntegerField(null=True, blank=True)
    requirement = models.CharField(max_length=10, null=True, blank=True)
    complications = models.ManyToManyField(
        Content, blank=True, related_name="comp")
    parent_factor = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.factor_name} ({self.answertype})"


class FactorValue(models.Model):
    class Meta:
        unique_together = (("content", "value"))

    content = models.ForeignKey(Content, on_delete=models.CASCADE)
    value = models.IntegerField()
    belongs_to = models.ForeignKey(
        Factor, on_delete=models.CASCADE, default=None)

    def __str__(self) -> str:
        return f"{self.content} ({self.value}) is a choice in {self.belongs_to}"
