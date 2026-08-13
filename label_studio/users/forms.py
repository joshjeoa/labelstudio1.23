"""This file and its contents are licensed under the Apache License 2.0. Please see the included NOTICE for copyright information and LICENSE for a copy of the license.
"""
import logging

from django import forms
from django.conf import settings
from django.contrib import auth
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from users.models import User

EMAIL_MAX_LENGTH = 256
USERNAME_MAX_LENGTH = 30
DISPLAY_NAME_LENGTH = 100
USERNAME_LENGTH_ERR = f'请输入长度不超过{USERNAME_MAX_LENGTH}个字符的用户名'
DISPLAY_NAME_LENGTH_ERR = f'请输入长度不超过{DISPLAY_NAME_LENGTH}个字符的显示名称'
INVALID_USER_ERROR = "您输入的邮箱和密码不匹配。"

FOUND_US_ELABORATE = '其他'
FOUND_US_OPTIONS = (
    ('Gi', 'Github'),
    ('Em', '邮箱/资讯推送'),
    ('Se', '搜索引擎'),
    ('Fr', '朋友或同事推荐'),
    ('Ad', '广告'),
    ('Ot', FOUND_US_ELABORATE),
)

logger = logging.getLogger(__name__)


class LoginForm(forms.Form):
    """For logging in to the app and all - session based"""

    # use username instead of email when LDAP enabled
    email = forms.CharField(label='用户名') if settings.USE_USERNAME_FOR_LOGIN else forms.EmailField(label='邮箱')
    password = forms.CharField(widget=forms.PasswordInput(), label="密码")
    persist_session = forms.BooleanField(widget=forms.CheckboxInput(), required=False, label="记住登录")

    def clean(self, *args, **kwargs):
        cleaned = super(LoginForm, self).clean()
        email = cleaned.get('email', '').lower()
        password = cleaned.get('password', '')
        if len(email) >= EMAIL_MAX_LENGTH:
            raise forms.ValidationError('邮箱太长')

        # advanced way for user auth
        user = settings.USER_AUTH(User, email, password)

        # regular access
        if user is None:
            user = auth.authenticate(email=email, password=password)

        if user and user.is_active:
            persist_session = cleaned.get('persist_session', False)
            return {'user': user, 'persist_session': persist_session}
        else:
            raise forms.ValidationError(INVALID_USER_ERROR)


class UserSignupForm(forms.Form):
    email = forms.EmailField(label='工作邮箱', error_messages={'required': '请填写有效的邮箱地址'})
    password = forms.CharField(widget=forms.TextInput(attrs={'type': 'password'}), label="密码")
    allow_newsletters = forms.BooleanField(required=False, label="接收资讯推送")
    how_find_us = forms.CharField(required=False, label="您如何找到我们")
    elaborate = forms.CharField(required=False, label="补充说明")

    def clean_password(self):
        password = self.cleaned_data.get('password')
        try:
            validate_password(password)
        except DjangoValidationError as e:
            raise forms.ValidationError(e.messages)
        return password

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if username and User.objects.filter(username=username.lower()).exists():
            raise forms.ValidationError('用户名已存在')
        return username

    def clean_email(self):
        email = self.cleaned_data.get('email').lower()
        if len(email) >= EMAIL_MAX_LENGTH:
            raise forms.ValidationError('邮箱长度超出限制')

        if email and User.objects.filter(email=email).exists():
            raise forms.ValidationError('使用此邮箱的用户已存在')

        return email

    def save(self):
        cleaned = self.cleaned_data
        password = cleaned['password']
        email = cleaned['email'].lower()
        allow_newsletters = None
        how_find_us = None
        if 'allow_newsletters' in cleaned:
            allow_newsletters = cleaned['allow_newsletters']
        if 'how_find_us' in cleaned:
            how_find_us = cleaned['how_find_us']
        if 'elaborate' in cleaned and how_find_us == FOUND_US_ELABORATE:
            cleaned['elaborate']

        user = User.objects.create_user(email, password, allow_newsletters=allow_newsletters)
        return user


class UserProfileForm(forms.ModelForm):
    """This form is used in profile account pages"""

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'phone', 'allow_newsletters')
        labels = {
            "first_name": "名",
            "last_name": "姓",
            "phone": "手机号码",
            "allow_newsletters": "接收资讯推送"
        }