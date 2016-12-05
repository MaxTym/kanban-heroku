from django.db import models

# Create your models here.



class Task(models.Model):

    STATUS_CHOICES = (
    ('N', 'New'),
    ('P', 'In progress'),
    ('C', 'Completed')
    )


    PRIORITY_CHOICES = (
    ('L', 'Low'),
    ('M', 'Medium'),
    ('H', 'High')
    )


    title = models.CharField(max_length=255)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)
    priority = models.CharField(max_length=1, choices=PRIORITY_CHOICES)
