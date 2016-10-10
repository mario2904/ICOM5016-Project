module.export = class Event {
  constructor (id, name, association, startDate, endDate, startHour, endHour, location, image) {
    this.name = name;
    this.association = association;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startHour = startHour;
    this.endHour = endHour;
    this.location = location;
    this.image = image;
  }
}
