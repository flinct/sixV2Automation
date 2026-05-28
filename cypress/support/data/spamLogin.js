// const userDataSpam = [
//     { number : "1", keyword : "god@devagent.com", password : "testpassword1"},
//     { number : "1", keyword : "god@devagent2.com", password : "testpassword1"},
//     { number : "1", keyword : "god@devagent3.com", password : "testpassword1"},
//     { number : "1", keyword : "god@devagent4.com", password : "testpassword1"},
//     { number : "1", keyword : "god@devagent5.com", password : "testpassword1"},
//     { number : "1", keyword : "god@devagent6.com", password : "testpassword1"},
//     { number : "1", keyword : "god@devagent7.com", password : "testpassword1"},
//     { number : "1", keyword : "god@devagent8.com", password : "testpassword1"},
//     { number : "1", keyword : "god@devagent9.com", password : "testpassword1"},
//     { number : "1", keyword : "god@devagent10.com", password : "testpassword1"}
//     // { number : "1", keyword : "god@devagent.com", password : "testpassword1"},
//     // { number : '123', keyword : 'rubi@mas.com', password : 'priu123'},
//     // { number : '6289', keyword : 'gan@settings.com', password : 'ghuasad11'},
//     // { number : '99731', keyword : 'empat@gasing.com', password : 'asdoo9877'},
//     // { number : '087612', keyword : 'key@jemuran.com', password : '123ioiasdfg'},
//     // { number : '020', keyword : 'remote@agent.com', password : '097bnnb6'},
//     // { number : '5', keyword : 'may@month.com', password : 'asd88761'},
//     // { number : '12876', keyword : 'kresek@sampah.com', password : 'asdiiii97'},
//     // { number : '33', keyword : 'hunt@ethan.com', password : 'vcxbmn86'},
//     // { number : '126756', keyword : 'sepuluh@toko.com', password : 'asdii7123mr'}
// ];


const numbers = [
    // "1", "123", "6289", "99731", "087612", 
    // "020", "5", "12876", "33", "126756"
    "1",
    // "2","3","4","5","6",
    // "1","2","3","4","5","6",
    // "1","2","3","4","5","6",
    // "1","2","3","4","5","6",
    // "1","2","3","4","5","6",
    // "1","2","3","4","5","6",
    // "1","2","3","4","5","6",
    // "1","2","3","4","5","6",
    // ,"7","8","9","10"
  ];
  
  const keywords = [
    // "god@dummy1.com", //prodlogin
    // "god@devagent.com","god@devagent11.com","goddevagent3","goddevagent4","god@devagent5.com",
    //"god@devagent6.com","god@devagent7.com","god@devagent8.com","god@devagent9.com",  "god@devagent10.com",
    // "bandungbaratcs@dev.com","bandungbaratcs2@dev.com",
    
    "goddevagent4","god@devagent5.com","god@devagent6.com",
    "god@devagent8.com","god@devagent9.com","god@devagent10.com", 
     
    "goddevagent4","god@devagent5.com","god@devagent6.com",
    "god@devagent8.com","god@devagent9.com","god@devagent10.com", 
    "goddevagent4","god@devagent5.com","god@devagent6.com",
    "god@devagent8.com","god@devagent9.com","god@devagent10.com", 
    "goddevagent4","god@devagent5.com","god@devagent6.com",
    "god@devagent8.com","god@devagent9.com","god@devagent10.com", 
    "goddevagent4","god@devagent5.com","god@devagent6.com",
    "god@devagent8.com","god@devagent9.com","god@devagent10.com", 
    "goddevagent4","god@devagent5.com","god@devagent6.com",
    "god@devagent8.com","god@devagent9.com","god@devagent10.com", 
    "goddevagent4","god@devagent5.com","god@devagent6.com",
    "god@devagent8.com","god@devagent9.com","god@devagent10.com", 
    "goddevagent4","god@devagent5.com","god@devagent6.com",
    "god@devagent8.com","god@devagent9.com","god@devagent10.com", 
    // "rubi@mas.com", "gan@settings.com", "empat@gasing.com", 
    // "key@jemuran.com", "remote@agent.com", "may@month.com", 
    // "kresek@sampah.com", "hunt@ethan.com", "sepuluh@toko.com"
  ];
  
  const passwords = [
    // "testpassword1", 
    "TestPassword1!"
    // "priu123", "ghuasad11", "asdoo9877", 
    // "123ioiasdfg", "097bnnb6", "asd88761", "asdiiii97", 
    // "vcxbmn86", "asdii7123mr"
  ];
  
  const userDataSpam = numbers.map((number, index) => ({
    number,
    keyword: keywords[index],
    // password: passwords[index]//kalo pass uniq pake ini
    password: 'testpassword1'
  }));
  

export default userDataSpam;