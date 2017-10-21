# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from rest_api.models import Store, PaymentType


# Register your models here.

class PaymentTypeInline(admin.StackedInline):
    model = PaymentType
    extra = 1


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    inlines = [
        PaymentTypeInline,
    ]
