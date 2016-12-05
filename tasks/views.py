from django.shortcuts import render
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect


class TasksViewSet(viewsets.ModelViewSet):

    queryset = Task.objects.all().order_by('title')
    serializer_class = TaskSerializer


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            return HttpResponseRedirect('')
    else:
        form = UserCreationForm()
    context = {'form': form}
    return render(request, 'registration/register.html', context)
