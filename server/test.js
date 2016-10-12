// Models
const Association = require('./association');
const Student = require('./student');
const Event = require('./event');

// Utils
const uuid = require('node-uuid');

exports.fillDummyData = function (db) {
  // Create Associations
  for (let association of associations) {
    const { name, initials, location, link, email, password, image } = association;
    const id = uuid.v4();
    db.association[id] = new Association(id, name, initials, location, link, email, password, image);
  }
  // Create Students
  for (let student of students) {
    const { firstName, lastName, age, gender, hometown, college, major, email, password } = student;
    const id = uuid.v4();
    db.student[id] = new Student(id, firstName, lastName, age, gender, hometown, college, major, email, password);
  }
  // Create events
  for (let event of events) {
    for (let association of associations) {
      if (event.associationName === association.name) {
        console.log('MEH');
        const { name, associationName, startDate, endDate, startHour, endHour, location, image, description } = event;
        const id = uuid.v4();
        //console.log(association.id);
        db.event[id] = new Event(id, name, association.id, associationName, startDate, endDate, startHour, endHour, location, image, description);
        // Update activeEvents list for that association
        db.activeEvents[association.id] = [id].concat(db.activeEvents[association.id] || []);
      }
    }
  }
}

const associations = [
  {
    name: 'IEEE Women in Engineering - UPRM',
    initials: 'WIE',
    location: 'University of Puerto Rico, Mayagüez Campus, Stefani Building, IEEE Office S-211A',
    link: 'http://wie.uprm.edu/',
    email: 'wie@uprm.edu',
    password: 'password',
    image: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/1620402_678979328807039_689288368_n.png?oh=c6adf4b93a16348fba226e12967c533e&oe=58745346'
  },
  {
    name: 'UPRM Golden Key',
    initials: 'GK',
    location: 'University of Puerto Rico, Mayagüez Campus, Stefani Building, S-404',
    link: 'http://uprm.goldenkey.org/',
    email: 'goldenkeyuprm@uprm.edu',
    password: 'password',
    image: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/257088_128567813892684_4897113_o.jpg'
  },
  {
    name: 'IEEE Eta Kappa Nu - Lambda Tau Chapter',
    initials: 'HKN',
    location: 'University of Puerto Rico, Mayagüez Campus, Stefani Building, IEEE Office S-211A',
    link: 'http://hkn.ece.uprm.edu/',
    email: 'hkn@ece.uprm.edu',
    password: 'password',
    image: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/1617293_584946991590451_185988420_o.png'
  },
  {
    name: 'Idea Platform',
    initials: 'IP',
    location: 'University of Puerto Rico, Mayagüez Campus, Student Center, 1st Floor',
    link: 'http://ideaplatform.org/',
    email: 'idea.platform@uprm.edu',
    password: 'password',
    image: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/11075167_628822830553054_4682981240345315035_n.png?oh=8c50c6447d46bf9d6a4d61f8974cf279&oe=58A3632B'
  },
  {
    name: 'IEEE Circuits and Systems Society - UPRM',
    initials: 'CAS',
    location: 'University of Puerto Rico, Mayagüez Campus, Stefani Building, IEEE Office S-211A',
    link: 'http://cas.uprm.edu/',
    email: 'ieeecas.uprm@gmail.com',
    password: 'password',
    image: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/183118_193619493990036_1420352_n.jpg?oh=798eff36e082d94c33e887b37af9ca14&oe=58A3C9B9'
  },
  {
    name: 'Society of Hispanic Professional Engineers',
    initials: 'SHPE',
    location: 'University of Puerto Rico, Mayagüez Campus, Stefani Building, S-101',
    link: 'http://shpeuprm.tumblr.com/',
    email: 'shpe.rum@gmail.com',
    password: 'password',
    image: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/1511592_794103793953169_1204815244615871931_n.png?oh=055f9de551f64f95a901ff880a6c5126&oe=58A573F7'
  },
  {
    name: 'Association for Computing Machinery - Electrical and Computer Engineering Department',
    initials: 'ACM-ECE',
    location: 'University of Puerto Rico, Mayagüez Campus, Stefani Building, S-301',
    link: 'http://ece.uprm.edu/acm',
    email: 'acm@ece.uprm.edu',
    password: 'password',
    image: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/534293_720750617940260_16455008_n.png?oh=7b2782d5a89bb97f54f8f4340fbb641b&oe=5876855A'
  },
  {
    name: 'National Society of Professional Engineers - UPRM Chapter',
    initials: 'NSPE',
    location: 'University of Puerto Rico, Mayagüez Campus, Stefani Building, S-500',
    link: 'http://www.nspeuprm.com/',
    email: 'nspe.uprm@gmail.com',
    password: 'password',
    image: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/13975419_1146447655422895_4142955561913595977_o.png'
  },
  {
    name: 'IncludeGirls - UPRM',
    initials: 'IG',
    location: 'University of Puerto Rico, Mayagüez Campus, Luchetti Building, L-170',
    link: 'http://includegirls.com/',
    email: 'includegirls.uprm@gmail.com',
    password: 'password',
    image: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/11130142_1642967139265898_9055604660996095507_n.jpg?oh=60ac8b1ff83a95dd75e545261fd93219&oe=586CFBF1'
  },
  {
    name: 'HackPR - UPRM Chapter',
    initials: 'HackUPRM',
    location: 'University of Puerto Rico, Mayagüez Campus, Stefani Building, S-470',
    email: 'uprm@hackpr.io',
    link: 'https://twitter.com/HackPRUPRM',
    password: 'password',
    image: 'https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/12891069_666961816777108_9186838969744859359_o.jpg'
  },
  {
    name: 'Association of Computer Machinery – College of Business Administration',
    initials: 'ACM-BA',
    location: 'University of Puerto Rico, Mayagüez Campus, Stefani Building, S-404',
    email: 'acmba.upr.rum@gmail.com',
    link: 'https://acmba.uprm.edu/',
    password: 'password',
    image: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/14440967_1323900054295475_4978721172919437033_n.jpg?oh=55dbb3e6c5f0ad45e54e659e931056c9&oe=5872220B'
  },
  {
    name: 'American Institute of Chemical Engineers – CUPRM',
    initials: 'AIChE',
    location: 'University of Puerto Rico, Mayagüez Campus, Stefani Building, S-100',
    email: 'aiche.inqu@gmail.com',
    link: 'http://aiche-iiqpr.com/',
    password: 'password',
    image: 'http://engineering.uprm.edu/wp-content/uploads/2015/02/AiChE.jpg'
  },
  {
    name: 'Tau Beta Pi - Puerto Rico Alpha',
    initials: 'TBP-PRA',
    location: 'University of Puerto Rico, Mayagüez Campus, Stefani Building, S-550',
    email: 'taubetapi.pra@gmail.com',
    link: 'https://taubetapi.uprm.edu/',
    password: 'password',
    image: 'https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/10635790_1405695263010619_50773097753679512_n.jpg?oh=36e735bc4675f0a006b98b4975e30d39&oe=585FC100'
  }
]

const students = [
  {
    firstName: "John",
    lastName: "Doe",
    age: "11",
    gender: "Male",
    hometown: "Mayaguez",
    college: "RUM",
    email: "john.doe@upr.edu",
    major: "ICOM",
    password: "password"
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    age: "19",
    gender: "Female",
    hometown: "Utuado",
    college: "RUM",
    email: "jane.doe@upr.edu",
    major: "INEL",
    password: "password"
  },
  {
    firstName: "Tom",
    lastName: "Hank",
    age: "20",
    gender: "Male",
    hometown: "San Francisco",
    college: "Berkely",
    email: "tom.hunk@berkely.edu",
    major: "CCOM",
    password: "password"
  },
  {
    firstName: "Hilary",
    lastName: "Clinton",
    age: "50",
    gender: "Female",
    hometown: "Georgia",
    college: "MIT",
    email: "hilary.clinton@mit.edu",
    major: "INGL",
    password: "password"
  },
  {
    firstName: "Donald",
    lastName: "Trump",
    age: "57",
    gender: "Male",
    hometown: "China",
    college: "Harvard",
    email: "donald.drumpf@harvard.edu",
    major: "INQU",
    password: "password"
  },
  {
    firstName: "Benito",
    lastName: "Camela",
    age: "40",
    gender: "Male",
    hometown: "Arecibo",
    college: "UPRA",
    email: "benito.camela@upr.edu",
    major: "INME",
    password: "password"
  }
];

const events = [
  {
    name: "Hackathon",
    associationName: "HackPR - UPRM Chapter",
    startDate: "Oct. 15, 2016",
    endDate: "Oct. 16, 2016",
    startHour: "9:00 am",
    endHour: "5:00 pm",
    location: "Roberto Clemente",
    image: "http://hack.pr/wp-content/uploads/2016/09/Facebook-Banner-HackPR-1.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Recogido de Alimentos",
    associationName: "Organización Estudiantil de Protección de Animales",
    startDate: "Oct. 13, 2016",
    endDate: "Oct. 13, 2016",
    startHour: "8:00 am",
    endHour: "11:00 am",
    location: "Universidad de Puerto Rico, Recinto Mayaguez",
    image: "https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/14590297_542744765930783_7339776675739874149_n.jpg?oh=8ad85c8fcb55d4fe6404c3aaf64ce685&oe=58A83C20",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Fundraiser Neuro-RUM",
    associationName: "Neuro-RUM",
    startDate: "Sept. 28, 2016",
    endDate: "Sept. 28, 2016",
    startHour: "3:30 pm",
    endHour: "8:30 pm",
    location: "Cold Stone Creamery de Mayaguez",
    image: "https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14242492_1122310254512514_1702488471920293701_o.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Circuits Lab Workshop",
    associationName: "IEEE Circuits and Systems Society - UPRM",
    startDate: "Oct. 5, 2016",
    endDate: "Oct. 5, 2016",
    startHour: "7:00 pm",
    endHour: "9:00 pm",
    location: "University of Puerto Rico, Mayaguez Campus - S-104A",
    image: "https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14543654_1328305037188137_8919927744200733943_o.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Smash Bros. Tournament",
    associationName: "Idea Platform",
    startDate: "Oct. 5, 2016",
    endDate: "Oct. 5, 2016",
    startHour: "6:00 pm",
    endHour: "9:00 pm",
    location: "University of Puerto Rico, Mayaguez Campus - S-228",
    image: "https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14500634_881246661977335_7362168074202245899_o.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
];
