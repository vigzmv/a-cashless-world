from rest_framework import serializers

from rest_api.models import Store, PaymentType


class PaymentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentType
        fields = '__all__'


class StoresSerializer(serializers.ModelSerializer):
    store_type = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    payment_types = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field='payment_type')
        many = True, read_only = True, slug_field = 'payment_type')

    class Meta:
        model=Store
        fields='__all__'

    def get_store_type(self, obj):
        return obj.get_store_type_display()

    def get_rating(self, obj):
        return obj.get_rating_display()
