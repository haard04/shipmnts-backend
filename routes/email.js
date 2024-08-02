const express = require('express');

const fs = require('fs')

const router = express.Router();

const multer = require("multer");
const { createEmail, getAllEmails, getEmailById, deleteEmail } = require('../controller/email');


const multerStorageForAttachments = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/attachments");
    },
    filename: (req, file, cb) => {

      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  
const Multer = multer({ storage: multerStorageForAttachments })


router.post('/schedule-email',Multer.any("attachment"), createEmail)
router.get('/scheduled-emails',getAllEmails)
router.get('/scheduled-emails/:id',getEmailById)
router.delete('/scheduled-emails/:id',deleteEmail)


module.exports = router;
