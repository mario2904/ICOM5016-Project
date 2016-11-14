# [E-Spotter](https://e-spotter.herokuapp.com/)

## About

Currently, there are many student associations in the University of Puerto Rico at Mayaguez that have different activities every day. Nowadays, the most common way to learn about these activities is by either checking your emails sent by “el cartero” to see if you have received information about the activity or by checking the Facebook page of each corresponding association. This method is not efficient because students receive multiple emails every day and will probably skip over the emails announcing the associations’ activities. The other alternative is by checking Facebook for information about the event but you need to know the association’s name. Our product aims to ease these problems and help the student body by creating a web app that will consolidate and facilitate all of the associations’ announcements of their events and let the students track and discover events that they find attractive all in one place.

## Run It Locally

### Requirements:
* [Node.js v6](https://nodejs.org/en/download/)
* [Vagrant](https://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/)

### Installation and Setup:

###### Download project and change to the root directory
```sh
git clone https://github.com/mario2904/ICOM5016-Project.git
cd ICOM5016-Project
```
###### Install and configure the PostgreSQL database
This will instruct Vagrant to spin a new Ubuntu14.04 virtual machine with VirtualBox. It will also run some scripts to install and configure PostgreSQL in the newly created virtual machine.
```sh
vagrant up
```
###### Install Dependencies and Start the Application
```sh
npm install
npm start
```
###### Open your browser at [http://localhost:3000](http://localhost:3000)

## Project Members

* Mario Orbegoso - [mario2904](https://github.com/mario2904)
* Carlos Ojeda - [cojeda1](https://github.com/cojeda1)
* Graciany Lebron - [graciany](https://github.com/graciany)
