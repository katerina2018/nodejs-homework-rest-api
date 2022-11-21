const { User } = require("../models/user.model");
const { User: UserModel } = require("../models/user.model");
const { uploadImage } = require("../services/avatar.service");

async function getContacts(req, res, next) {
  const { user } = req;

  const contacts = await UserModel.findOne({ email: user.email });

  return res.status(200).json({
    contacts: { email: contacts.email, subscription: contacts.subscription },
  });
}

async function subscriptionUsers(req, res, next) {
  const { user } = req;
  const id = user.id;

  const updatedSubscriptionUsers = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (updatedSubscriptionUsers) {
    return res.json({
      user: {
        email: updatedSubscriptionUsers.email,
        subscription: updatedSubscriptionUsers.subscription,
      },
    });
  }
  return next(createNotFoundHttpError());
}

async function updatedAvatarURL(req, res, next) {
  const { user } = req;
  const id = user.id;

  const avatarURL = await uploadImage(id, req.file);

  const updateAvatarURL = await User.findByIdAndUpdate(id, avatarURL, {
    new: true,
  });

  if (updateAvatarURL) {
    const { email, avatarURL } = updateAvatarURL;
    return res.json({
      user: {
        email,
        avatarURL,
      },
    });
  }
  return next(createNotFoundHttpError());
}

module.exports = {
  getContacts,
  subscriptionUsers,
  updatedAvatarURL,
};
