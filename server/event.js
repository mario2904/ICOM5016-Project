module.exports = class Event {

  constructor (id, name, associationId, associationName, startDate, endDate, startHour, endHour, location, image, description) {
    this.id = id;
    this.name = name;
    this.associationId = associationId;
    this.associationName = associationName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startHour = startHour;
    this.endHour = endHour;
    this.location = location;
    this.image = image;
    this.description = description;
  }
}
