module.export = class Event {
  constructor (id, name, name, associationId, associationName, startDate, endDate, startHour, endHour, location, image) {
    this.name = name;
    this.associationId = associationId;
    this.associationName = associationName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startHour = startHour;
    this.endHour = endHour;
    this.location = location;
    this.image = image;
  }
}
