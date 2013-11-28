# -*- coding: utf-8 -*-
import json

from django import test
from django.test import client
from django.core.urlresolvers import reverse
from django.contrib.auth import get_user_model


User = get_user_model()


class RegistrationTestCase(test.TestCase):
    def setUp(self):
        self.client = client.Client()

    def test_registration_success(self):
        response = self.client.post(
            reverse('api_registration'),
            data=json.dumps({
                'username': 'test',
                'password1': 'test',
                'password2': 'test'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)

    def test_registration_some_error(self):
        response = self.client.post(
            reverse('api_registration'),
            data=json.dumps({
                'username': 'test',
                'password1': 'test',
                'password2': 'test2'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        error_list = json.loads(response.content)
        self.assertIsInstance(error_list, dict)


class LoginTestCase(test.TestCase):
    def setUp(self):
        self.client = client.Client()

    def test_success_login(self):
        User.objects.create_user(username='test', password='test')

        response = self.client.post(
            reverse('api_login'),
            data = json.dumps({
                'username': 'test',
                'password': 'test'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    def test_error_login(self):
        User.objects.create_user('test', 'anotherpassword')

        response = self.client.post(
            reverse('api_login'),
            data = json.dumps({
                'username': 'test',
                'password': 'test'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)


