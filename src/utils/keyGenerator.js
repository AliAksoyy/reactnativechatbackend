const generateUserId = () => {
  let value = "abcdefghijklmnopqrstuvwxyz1234567890";
  let userId = "";
  for (let i = 0; i < 10; i++) {
    userId += value[Math.floor(Math.random() * value.length)];
  }
  return userId;
};

module.exports = { generateUserId };
