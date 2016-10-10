module.exports = class Association {

  constructor (id, name, initials, location, link, email, password) {
    this.id = id;
    this.name = name;
    this.initials = initials;
    this.location = location;
    this.link = link;
    this.email = email;
    this.password = password;
  }
}
