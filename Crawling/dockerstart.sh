#!/bin/bash
sudo echo '172.17.0.4        master1' >> /etc/hosts
python manage.py runserver --noreload
