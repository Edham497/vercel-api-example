import consola from "consola";
import { UserModel } from "../../models/users";

async function User(_, { id }) {
  const user = await UserModel.findById(id);
  return user;
}

async function CreateUser(_, params) {
  try {
    const { email, name, phoneNumber, username } = params.content;
    const doc = new UserModel({
      username,
      name,
      email,
      pass: "abcd",
    });
    doc.setFirebaseData(
      "aspdfjasfsjfpkjas[fkjsapofjpoasjfnoipsaj",
      "as;dkfjnhasoifjposjfpowsjfpoiswdjfpjsw"
    );
    await doc.save();
    return "user created";
  } catch (error) {
    consola.error(error);
  }
}

async function UpdateUserData(_, { id, content }) {
  try {
    let edited = false;
    const user = await UserModel.findById(id);
    if (content.username) {
      edited = true;
      user.username = content.username;
    }
    if (content.description) {
      edited = true;
      user.description = content.description;
    }
    if (content.name) {
      edited = true;
      user.name = content.name;
    }
    if (content.picture) {
      edited = true;
      user.picture = content.picture;
    }
    if (edited) {
      await user.save();
      return "changes saved.";
    }
    return "no changes to save.";
  } catch (error) {
    return "something went wrong";
  }
}

const UserResolvers = {
  Query: { User },
  Mutation: { CreateUser, UpdateUserData },
};

export default UserResolvers;
