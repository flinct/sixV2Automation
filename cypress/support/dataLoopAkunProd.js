const whatsappNumber = [
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  6280000000000,
  // tambahan
].map(String);

const whatsappName =[
  "Customer Experience SAPX"
]

const division =[
  
  // tambahan
];

const userName = [
  
// tambahan
].map(String);

const userEmail = [
  
  //tambahan
]

const priorityRun = whatsappNumber.map((whatsapp, index) => ({
  // name: names[index],
  // name: "Customer Experience SAPX",
  // userEmail : userEmail[index],
  whatsapp,  // Directly using the current whatsapp from the map iteration
  // division: division[index],
  // userName: userName[index]
}));

export default priorityRun;