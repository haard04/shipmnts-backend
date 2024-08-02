const express = require('express');

const fs = require('fs')

const router = express.Router();

const multer = require("multer");
const { createEmail, getAllEmails, getEmailById, deleteEmail } = require('../controller/email');
const { createUser, loginUser } = require('../controller/user');


const multerStorageForAttachments = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/attachments");
    },
    filename: (req, file, cb) => {

      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  
const Multer = multer({ storage: multerStorageForAttachments })

router.get('',(req,res)=>res.json({status:"server is alive"}))
router.post('/schedule-email',Multer.any("attachment"), createEmail)
router.get('/scheduled-emails',getAllEmails)
router.get('/scheduled-emails/:id',getEmailById)
router.delete('/scheduled-emails/:id',deleteEmail)

router.post('/create/user', createUser);
router.post('/login/user',loginUser);

module.exports= router;   
