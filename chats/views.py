from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from chats.models import ChatModel

User = get_user_model()


@login_required
def index(request):
    # Exclude the currently logged-in user
    users = User.objects.exclude(username=request.user.username)
    return render(request, 'index.html', context={'users': users})


@login_required
def chatPage(request, username):
    # Safely get the user object or return a 404
    user_obj = get_object_or_404(User, username=username)

    # Exclude the currently logged-in user
    users = User.objects.exclude(username=request.user.username)

    # Compare user IDs only if both are not None
    if request.user.id and user_obj.id:
        if request.user.id > user_obj.id:
            thread_name = f'chat_{request.user.id}-{user_obj.id}'
        else:
            thread_name = f'chat_{user_obj.id}-{request.user.id}'
        
        # Fetch the messages for the thread
        message_objs = ChatModel.objects.filter(thread_name=thread_name)
    else:
        # Handle case where user IDs are invalid
        message_objs = []

    return render(request, 'main_chat.html', context={
        'user': user_obj,
        'users': users,
        'messages': message_objs
    })
