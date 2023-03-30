import consola from "consola";
import UserModel from "../../models/users";

async function Profile(_, params) {
  try {
    if (!params.id) {
      throw new Error("No id provided");
    }
    consola.info(`ProfileQuery for: ${params.id}`);
    const profile = await UserModel.findById(params.id, {
      username: 1,
      fcmid: 1,
      provider: 1,
      email: 1,
      picture: 1,
    });

    if (!profile) {
      throw new Error("User doesn't exists");
    }
    return profile;
  } catch (error) {
    consola.error(error);
  }
}

const ProfileResolvers = {
  Query: {
    Profile,
  },
};

export default ProfileResolvers;
