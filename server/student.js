module.exports = class Student {

  constructor (id, firstName, lastName, age, gender, hometown, college, major, email, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.hometown = hometown;
    this.college = college;
    this.email = email;
    this.major = major;
    this.password = password;
    // Defaults
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
