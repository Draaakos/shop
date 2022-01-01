from django.views.generic import TemplateView
from web.models import Customer
from web.dto import historylist


class ProfileView(TemplateView):
    template_name = 'profile.html'

    def get_context_data(self, *args, **kwargs):
        session_active = self.request.session.get('uuid')
        customer = Customer.objects.get(uuid=session_active)
        context = super().get_context_data(*args, **kwargs)
        dto = historylist.DTO(customer)
        context['serializedContent'] = dto.to_json()
        return context

