import nodemailer from "nodemailer";

const Mail = async (
  userEmail,
  crushEmail,
  userMsg,
  crushMsg,
  userName,
  crushName
) => {
  const emailContent = () => {
    return `
    <html>
      <head>
      </head>
        <body>
          <div>
          <h2><b>${userName}</b> <i style='color:'red';font-size:'20px'>+</span>  <b>${crushName}</b> </h2>
          <h3><b>${userName} Message:</b> ${userMsg}</h3>
          <h3><b>${crushName} Message:</b> ${crushMsg}</h3>
          </div>
        </body>
    </html>
    `;
  };
  // Abinash Sūb abirajcomp@gmail.com
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yograjsubedi33@gmail.com",
      pass: "aficqfnrcgqzrfwf",
    },
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});

await new Promise((resolve, reject) => {
   transporter.sendMail({
    from: `<Loveconnector@gmail.com>`, // sender address
    to: `${userEmail} `, // list of receivers
    subject: "Love accepted", // Subject line
    text: `${userName} + ${crushName}`, // plain text body
    html: emailContent(),
  }, (err, info) => {
    if(err) {
      console.log(err);
      reject(err);
    }else{
      console.log(info);
      resolve(info);
    }
  });
})
  
await new Promise((resolve, reject) => {
   transporter.sendMail({
    from: `<Love@connector.com>`, // sender address
    to: `${crushEmail} `, // list of receivers
    subject: "Love accepted", // Subject line
    text: `${userName} + ${crushName}`, // plain text body
    html: emailContent(),
  },(err, info) => {
    if(err) {
      console.error(err);
      reject(err);
    }else{
      console.log(info);
      resolve(info)
    }
  });

})

 
  res.status(200).json({status:'ok'});
};

export default Mail;
