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
    return `<div>
      <h2><b>${userName}</b> <i>loves</i>  <b>${crushName}</b> </h2>
      <h5><b>${userName} Message:</b> ${userMsg}</h5>
      <h5><b>${crushName} Message:</b> ${crushMsg}</h5>
    </div>`
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yograjsubedi33@gmail.com",
      pass: "aficqfnrcgqzrfwf",
    },
  });

  const firstUser = await transporter.sendMail({
    from: `Loveconnector@gmail.com`, // sender address
    to: `${userEmail} `, // list of receivers
    subject: "Love accepted", // Subject line
    text: `${userName} + ${crushName}`, // plain text body
    html: emailContent(),
  });

  const secUser = await transporter.sendMail({
    from: `<Love@connector.com>`, // sender address
    to: `${crushEmail} `, // list of receivers
    subject: "Love accepted", // Subject line
    text: `${userName} + ${crushName}`, // plain text body
    html: emailContent(),
  });

  console.log("Message sent: %s", firstUser.messageId, secUser.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(firstUser));
  res.json(firstUser, secUser);
};

export default Mail;
