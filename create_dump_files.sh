#!/usr/bin/env bash

# Props to this article: https://www.calebwoods.com/2015/05/05/vagrant-guest-commands/

echo "Start pre-commit script"

# Make sure vagrant vm is running
vagrant up

# Dump the database into a custom-format archive file
vagrant ssh -c 'sudo -u postgres pg_dump -Fc postgres > /vagrant/e-spotter.dump'

# Dump the database into a SQL-script file
vagrant ssh -c 'sudo -u postgres pg_dump postgres > /vagrant/e-spotter.sql'
