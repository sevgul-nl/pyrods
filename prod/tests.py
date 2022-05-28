from django.test import SimpleTestCase
from django.urls import reverse  # Create your tests here.


class prod_listpageTests(SimpleTestCase):

    def test_prod_list_status_code(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_prod_list_url_name(self):
        response = self.client.get(reverse('plist'))
        self.assertEqual(response.status_code, 200)

    def test_prod_list_template(self):  # new
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'prod_list.html')
