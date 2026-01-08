const whatsappNumber = [
  6285135430916,
  6285135421781,
  6285147210466,
  6285147210614,
  6285147211091,
  6285135424831,
  6285147211084,
  6285147028870,
  6285135425663,
  6285135421719,
  6285147028878,
  6285147210588,
  6285135430929,
  6285147211104,
  6285134815459,
  6285147210585,
  6285135421718,
  6285135421704,
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