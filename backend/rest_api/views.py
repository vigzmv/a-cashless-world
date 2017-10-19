# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.response import Response
from rest_framework.views import APIView

from rest_api.models import Store
from rest_api.serializers import StoresSerializer


# Create your views here.


class GetStores(APIView):
    def get(self, request):

        store_type = request.GET.get('store_type', None)
        if store_type:
            store_type = store_type.split(',')

        payment_type = request.GET.get('payment_type', None)
        if payment_type:
            payment_type = payment_type.split(',')

        # lng = request.GET.get('lng', None)
        # lat = request.GET.get('lat', None)
        # radius = request.GET.get('radius', 5000)
        # limit = request.GET.get('limit', 50)
        #
        # lat = 1
        # lng = 1

        _stores_all = Store.objects.all()
        if store_type:
            _stores_all = _stores_all.filter(store_type__in=store_type)
        if payment_type:
            _stores_all = _stores_all.filter(payment_types__payment_type__in=payment_type).distinct()

        # radius = float(radius) / 1000.0
        #
        # query = """SELECT id, (6367*acos(cos(radians(%2f))
        #            *cos(radians(latitude))*cos(radians(longitude)-radians(%2f))
        #            +sin(radians(%2f))*sin(radians(latitude))))
        #            AS distance FROM rest_api_store HAVING
        #            distance < %2f ORDER BY distance LIMIT 0, %d""" % (
        #     float(lat),
        #     float(lng),
        #     float(lat),
        #     radius,
        #     limit
        # )
        #
        # _stores_all = _stores_all.raw(query)

        _stores = StoresSerializer(instance=_stores_all, many=True).data

        payload = {
            'stores': _stores
        }

        return Response(payload)
