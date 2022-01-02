# Generated by Django 3.0.8 on 2022-01-02 17:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='platform',
        ),
        migrations.CreateModel(
            name='ProductPlatform',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('platform', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='web.Platform')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='web.Product')),
            ],
        ),
    ]