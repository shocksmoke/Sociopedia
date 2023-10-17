import User from "../models/User.js";

export const getUser = async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  res.status(200).json(user);
};

export const getFriends = async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);
  res.status(200).json(user.friends);
};

export const addRemoveFriend = async (req, res) => {
  const userId = req.body.userId;
  const friendId = req.body.friendId;


  const user = await User.findById(userId);

  const friend = await User.findById(friendId);

  
  const areFriends = user.friends
    ? user.friends.some((element) => element._id == friendId)
    : false;

  if (areFriends) {
    user.friends = user.friends.filter((friend) => friend._id != friendId);
    friend.friends = friend.friends.filter((friend) => friend._id != userId);
  } else {
    user.friends.push({
      _id: friend._id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      picturePath: friend.picturePath,
      occupation: friend.occupation,
      location: friend.location,
    });
    friend.friends.push({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      picturePath: user.picturePath,
      occupation: user.occupation,
      location: user.location,
    });
  }

  await user.save();
  await friend.save();

  res.status(200).json(user.friends);
};
