# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models

# Create your models here.

store_types = (
    ('R', 'Restaurants'),
    ('SM', 'SuperMarkets'),
    ('SS', 'Salon & Spa'),
    ('P', 'Pharmacies'),
    ('AS', 'Apparel Stores'),
    ('T', 'Taxi'),
    ('H', 'Hotel'),
    ('M', 'Movie'),
)

payment_types = (
    ('PayTm', 'PayTm'),
    ('PhonePe', 'PhonePe'),
    ('Mobikwik', 'Mobikwik'),
    ('Card', 'Card'),
)

ratings = (
    ('1', 1),
    ('2', 2),
    ('3', 3),
    ('4', 4),
    ('5', 5),
    ('NA', 'NA'),
)


class Store(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    store_type = models.CharField(
        max_length=255, blank=True, null=True, choices=store_types)
        max_length = 255, blank = True, null = True, choices = store_types)
    image_url=models.CharField(max_length = 255, blank = True, null = True)
    rating=models.CharField(max_length = 2, choices = ratings)
    address=models.CharField(max_length = 255, blank = True, null = True)
    description=models.CharField(max_length = 255, blank = True, null = True)
    distance=models.CharField(max_length = 255, blank = True, null = True)
    lat=models.DecimalField(decimal_places = 20, max_digits = 25)
    long=models.DecimalField(decimal_places = 20, max_digits = 25)
    vpa=models.CharField(max_length = 100, blank = True, null = True)

    class Meta:
        verbose_name='Store'
        verbose_name_plural='Stores'

    def __unicode__(self):
        return str(self.name)


class PaymentType(models.Model):
    payment_type=models.CharField(
        max_length = 255, blank = True, null = True, choices = payment_types)
    payment_type=models.CharField(
        max_length = 255, blank = True, null = True, choices = payment_types)

    def __unicode__(self):
        return str(self.get_payment_type_display())
