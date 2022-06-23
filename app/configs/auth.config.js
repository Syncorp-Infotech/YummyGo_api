module.exports = {
  secret: "foodie-secret-key",

  linkedin: {
    CLIENT_ID: "81ipigom0ew1jn",
    CLIENT_SECRET: "Vxi3z1EG4HGCzxOV",
    CALLBACK_URL:
      "http://ec2-13-229-117-231.ap-southeast-1.compute.amazonaws.com/auth/linkedin/callback",
    CALLBACK_URL_L: "http://localhost:3000/auth/linkedin/callback",
  },

  smtp: {
    sender: "syncorpenquiry@gmail.com", // enquiry@careerin.care', syncorpinfo
    password: "foodie@2021", // syncorpinfo2021
    host: "smtpout.secureserver.net",
    port: 587,
  },
};
