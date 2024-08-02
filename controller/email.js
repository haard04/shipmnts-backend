const nodemailer = require('nodemailer')
const Email = require('../models/email');
const User = require('../models/user');
const schedule = require('node-schedule');
const createEmail = async(req,res)=>{
    let {userId,recipientEmail,subject,body,time,isRecurrent,recurrentInterval} = req.body;
    let attachments;
    (req.file)?
    attachments = req.files.map(file=>{
      `uploads/attachments/${file.filename}`
    })
    :attachments=null
    
    try {
        console.log('date is',time);
        const curr = new Date(time);
        console.log('curr',curr);
        const email = await Email.create({recipientEmail,body,attachments,subject,time:curr,recurrentInterval,isRecurrent});
        res.status(200).json({"isOK":true,message:"Email Scheduled"});
        const user = await User.findById(userId);
        await User.findByIdAndUpdate(userId,{$push:{scheduledEmails:email._id}});
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: user.email,
              pass: user.emailPassword,
            },
          });
          const mailOptions = {
            from: user.email,
            to: recipientEmail,
            subject: subject,
            body:body,
            attachments:attachments 
          };
          const job = schedule.scheduleJob(new Date(time), () => {
            console.log('mail sent')
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
              return res.status(500).json({ message: "Failed to send email" });
            }
            console.log("Email sent:", info.response);
            if(isRecurrent){
                let newTime;
                if (recurrentInterval === 'Daily') {
                    newTime = new Date(currentTime.setDate(currentTime.getDate() + 1));
                } else if (recurrentInterval === 'Weekly') {
                    newTime = new Date(currentTime.setDate(currentTime.getDate() + 7));
                } else if (recurrentInterval === 'Monthly') {
                    newTime = new Date(currentTime.setMonth(currentTime.getMonth() + 1));
                } else if (recurrentInterval === 'Quarterly') {
                    newTime = new Date(currentTime.setMonth(currentTime.getMonth() + 3));
                }
                    
                Email.findByIdAndUpdate(email._id,{time:newTime});
            }
          });

        
          });



    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllEmails = async(req,res)=>{
    try{
    const emails = await Email.find();
    const totalEmails = await Email.countDocuments();
    res.status(200).json({isOK:true,totalEmails:totalEmails,emails:emails});

    }
    catch(e){
        res.status(500).json({isOK:false,message:e.message});
    }
}

const getEmailById = async(req,res) =>{
    try{
        const id = req.params.id;
        const email = await Email.findById(id);
        res.status(200).json({isOK:true,email:email});
    }
    catch(e){
        res.status(500).json({isOK:false,message:e.message});
    }

}

const deleteEmail = async(req,res) =>{
    try{
        const id = req.params.id;
        const email = await Email.findByIdAndDelete(id);
        res.status(200).json({isOK:true,message:"Email Deleted"});    
}
catch(e){
    res.status(500).json({isOK:false,message:e.message});
}
}


module.exports = {
    createEmail,
    getAllEmails,
    getEmailById,
    deleteEmail

}