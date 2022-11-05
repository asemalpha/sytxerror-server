const { Router } = require("express");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.PROD_USER_EMAIL,
    password: process.env.PROD_USER_PW,
  },
});

const applicationRouter = new Router();

const Application = require("../models/Application.model");

applicationRouter.get("/:id", async (req, res, next) => {
  const jobID = req.params.jobIDtry;
  try {
    const application = await Application.find({ jobID });
    res.json({ applicant: application });
  } catch (err) {
    next(err);
  }
});

applicationRouter.post("/submitApplication", async (req, res, next) => {
  const {
    applicantName,
    applicantEmail,
    applicantLocation,
    cvUpload,
    linkdInURL,
    gitHubURL,
    photo,
    jobID,
  } = req.body;
  try {
    const application = await Application.create({
      applicantName,
      applicantEmail,
      applicantLocation,
      cvUpload,
      linkdInURL,
      gitHubURL,
      photo,
      jobID,
    });
    transporter.sendMail({
      from: process.env.PROD_USER_EMAIL,
      to: applicantEmail,
      subject: "Thank you for using Syntax Error!",
      html: `<html>
        <head>
        <title>Application Submitted</title>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">  
          </head>  
          <style>  
          body  {font-family:arial;font-size: 9pt; background-color: orange }  
           </style>
          <body bgcolor="#FFFFFF" text="#000000">
          <h1>Application submitted!!</h1>
          <h3>Thank you for choosing Syntax Error!</h3>
          <p> Your application is on its way, Please be patient while we take care of sending your information to the company, and in the mean time please do not forget to code. thank you and a good luck!</p>
          <p> Your Syntax Error Team </p>
          </body>
          </html>`,
    });
    res.json({
      application: {
        _id: application._id,
        applicantName: application.applicantName,
        applicantEmail: application.applicantEmail,
        applicantLocation: application.applicantLocation,
        cvUpload: application.cvUpload,
        linkdInURL: application.linkdInURL,
        gitHubURL: application.gitHubURL,
        photo: application.photo,
        jobID: application.jobID,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = applicationRouter;
