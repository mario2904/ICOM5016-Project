module.exports = class Event {

  constructor (id, name, associationId, associationName, startDate, endDate, startTime, endTime, location, image, description, registrationLink='') {
    this.id = id;
    this.name = name;
    this.associationId = associationId;
    this.associationName = associationName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
    this.image = image;
    this.description = description;
    this.registrationLink = registrationLink;
  }
}
