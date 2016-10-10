module.exports = class Student {

  constructor (id, firstName, lastName, email, department, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.department = department;
    this.password = password;
    // Defaults
    this.interestedEvents = [];       // List of event id's that student is interested in
    this.subscribedAssociations = []; // List of associations id's that student is subscribed to
    this.profileImage = "/images/defaults/default-profile.jpg";
    this.bio = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed \
    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \
    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex\
    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate \
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id \
    est laborum."
  }
}
