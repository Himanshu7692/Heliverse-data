import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    trim: true,
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  available: {
    type: String,
    required: true,
  },
});

export default mongoose.model("users", userSchema);

//  id":2,
// "first_name":"Honoria",
// "last_name":"Caughte",
// "email":"hcaughte1@google.com.br",
// "gender":"Female",
// "avatar":"https://robohash.org/temporibusporrolaboriosam.png?size=50x50&set=set1",
// "domain":"Finance",
// "available":true
// },
