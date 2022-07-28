const usernames = [
    "aaa",
    "corey",
    "mollymoo",
  ];
  
  const emails = [
    "aaa@aol.com",
    "corey@gmail.com",
    "mollymoo@yahoomail.com",
  ];
  
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  const getRandomUsername = () => `${getRandomArrItem(usernames)}`;
  
  const getRandomEmail = () => `${getRandomArrItem(emails)}`;
  
  module.exports = { getRandomUsername, getRandomEmail };