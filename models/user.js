const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  emailPassword: { type: String },
  scheduledEmails: [
    { type: Schema.Types.ObjectId, ref: "emails", default: null },
  ],
  
  isActive: {
    type: Boolean,
    default: true,
  },

});

module.exports = mongoose.model("User", UserSchema);
