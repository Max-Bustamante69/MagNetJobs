# Generated by Django 5.1 on 2024-09-26 06:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('magnetJobs', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='display_name',
        ),
    ]
