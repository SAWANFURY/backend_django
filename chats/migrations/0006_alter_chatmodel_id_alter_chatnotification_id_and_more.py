# Generated by Django 5.1.5 on 2025-01-18 21:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0005_chatnotification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmodel',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='chatnotification',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='userprofilemodel',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
