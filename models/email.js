const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  recipientEmail: { type: String, required: true },
  subject: { type: String},
  body: { type: String },
  time: { type: Date },
  attachments: [
    { type: String, default: null },
  ],
  userId:{ type: Schema.Types.ObjectId, ref: "users"},
  isRecurrent:{type:Boolean},
  recurrentInterval:{type:String},
  
  isActive: {
    type: Boolean,
    default: true,
  },

});

module.exports = mongoose.model("Email", EmailSchema);
