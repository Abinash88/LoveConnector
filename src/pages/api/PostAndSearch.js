import { ErrorHandler, MiddleHandler } from "../../middleware/Error";
import { User } from "../../models/UserModel";
import Mail from "./EmailSender";
import { MongoDb } from "./features";

const handler = MiddleHandler(async (req, res) => {
  if (req.method !== "POST")
    return ErrorHandler(res, 400, "Post method only allowed");

  const { name, email, crushName, message } = req.body;

  if (!name || !email || !crushName || !message)
    return ErrorHandler(res, 400, "Please Fill in the required fields");

  await MongoDb();

  const isExist = await User.findOne({ email });
  // const isExistName = await User.findOne({ name });

  if (isExist) return ErrorHandler(res, 400, "Email Already Exists");
  // if (isExistName) return ErrorHandler(res, 400, "UserName Already Exists");

  const doesConnect = await User.findOne({ name: crushName, crushName:name });

  if (doesConnect) {
    Mail(
      email,
      doesConnect.email,
      message,
      doesConnect.message,
      name,
      doesConnect.name
    );
    await User.create({
      name,
      email,
      crushName,
      message,
    });

    res
      .status(200)
      .send({
        success: true,
        message: "Your Love founded! check email for info",
      });
  } else {
    await User.create({
      name,
      email,
      crushName,
      message,
    });

    res.status(200).send({ success: true, message: "successfully submitted" });
  }
});

export default handler;
