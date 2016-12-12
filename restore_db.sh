#!/usr/bin/env bash

# Props to this article: https://www.calebwoods.com/2015/05/05/vagrant-guest-commands/
# https://community.webfaction.com/questions/5352/comand-line-dump-restore-postgresql-database-in-place

# Make sure vagrant vm is running
vagrant up

# Restore DB from dump file
vagrant ssh -c 'sudo -u postgres pg_restore -c -d postgres < /vagrant/e-spotter.dump'
