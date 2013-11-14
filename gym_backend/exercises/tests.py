from django.test import TestCase


class SimpleTest(TestCase):
    def test_sum(self):
        self.assertEquals(5 + 5, 10)
