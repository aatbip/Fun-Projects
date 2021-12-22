const information = {
  name: "John",
  address: "Knocktown",
  email: "john@cityhall.com",
  interests: ["Football", "Music"],
  education: [
    {
      name: "Knocktown City School",
      enrolledDate: "1985",
    },
    {
      name: "City Primary Academy",
      enrolledDate: "1770",
    },
  ],
};

var counter = information.education.length;

for (let i = 0; i < counter; i++) {
  console.log(
    "Name:" +
      " " +
      information.education[i].name +
      "" +
      ", " +
      "Date:" +
      " " +
      information.education[i].enrolledDate
  );
}
