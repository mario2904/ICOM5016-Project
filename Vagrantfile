# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  # Set default Provider to be VirtualBox
  ENV['VAGRANT_DEFAULT_PROVIDER'] = 'virtualbox'

  # Use Ubuntu 14.04 VirtualBox
  config.vm.box = "ubuntu/trusty64"

  # PostgreSQL
  config.vm.network "forwarded_port", guest: 5432, host: 8000

  # Installations and Configurations
  config.vm.provision :shell, path: "./bootstrap.sh"
end
