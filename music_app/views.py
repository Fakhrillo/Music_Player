from django.shortcuts import render
from django.core.paginator import Paginator
from .models import Song
# Create your views here.


def index(request):
    paginator= Paginator(Song.objects.all(),1)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    first_page = paginator.page_range[0]
    last_page = paginator.page_range[-1]
    context={
        "page_obj":page_obj,
        'first_page': first_page,
        'last_page': last_page,
        }
    return render(request,"music_app/index.html",context)