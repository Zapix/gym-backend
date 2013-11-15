# -*- coding: utf-8 -*-
import creole

from django.forms import widgets
from django.forms.util import flatatt
from django.utils.html import format_html
from django.utils.encoding import force_text


class ReStructuredTextarea(widgets.Textarea):
    def render(self, name, value, attrs=None):
        if value is None:
            value = ''
        final_attrs = self.build_attrs(attrs, name=name)
        return format_html(
            """<textarea{0}>\r\n{1}</textarea>
                <div class="restructered-preview">%s</div>
            """ % creole.creole2html(unicode(value)),
            flatatt(final_attrs),
            force_text(value)
        )
