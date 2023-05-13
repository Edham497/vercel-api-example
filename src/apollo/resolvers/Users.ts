import consola from "consola";
import { UserModel } from "../../models";

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

async function RegisteredStats(_, params) {
  try {
    const { year } = params;
    const users = await UserModel.find(
      {
        createdAt: {
          $gte: new Date(year, 1, 1),
          $lt: new Date(year, 12, 31),
        },
      },
      { createdAt: 1 }
    );

    const stats = Array(12).fill(0);
    users.forEach((e) => {
      const date = new Date(e.createdAt);
      const month = date.getMonth();
      stats[month] += 1;
    });
    return {
      name: `Accounts created`,
      data: stats,
      total: users.length,
    };
  } catch (error) {}
}
async function RegisteredStatsBetweenDates(_, params) {
  try {
    const { start, end } = params;
    const sd = new Date(start);
    const ed = new Date(end);

    const users = await UserModel.find(
      {
        createdAt: {
          $gte: sd,
          $lt: ed,
        },
      },
      { createdAt: 1 }
    );

    const stats = Array(12).fill(0);
    users.forEach((e) => {
      const date = new Date(e.createdAt);
      const month = date.getMonth();
      stats[month] += 1;
    });
    return {
      name: `Accounts created`,
      data: stats,
      total: users.length,
    };
  } catch (error) {}
}

const UserResolvers = {
  Query: { User, RegisteredStats, RegisteredStatsBetweenDates },
  Mutation: { CreateUser, UpdateUserData },
};

export default UserResolvers;
