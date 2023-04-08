import { catchAsync } from '../utils/catchAsnyc';
import prisma from '../services/prisma';

const getAllMatchForUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  console.log(userId);
  const matches = await prisma.match.findMany({
    where: {
      OR: [
        {
          userId1: userId,
        },
        {
          userId2: userId,
        },
      ],
    },
    include: {
      user1: {
        select: {
          id: true,
          username: true,
          photoUrl: true,
        },
      },
      user2: {
        select: {
          id: true,
          username: true,
          photoUrl: true,
        },
      },
    },
  });

  console.log('matches', matches);

  // Extract the IDs of all other users involved in the chats
  const matchedUserIds = matches.map((match) => {
    if (match.userId1 === userId) {
      return match.userId2;
    } else {
      return match.userId1;
    }
  });

  console.log(matchedUserIds);

  // Retrieve the user information for all matched users
  const matchedUsers = await prisma.$transaction(
    matchedUserIds.map((matchedUserId) =>
      prisma.user.findUnique({
        where: { id: matchedUserId },
        select: { username: true, photoUrl: true, id: true },
      })
    )
  );

  console.log('matchedUsers', matchedUsers);

  const latestMessagesInChats = await prisma.$transaction(
    matches.map((match) =>
      prisma.message.findFirst({
        where: {
          matchId: match.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          text: true,
        },
      })
    )
  );

  console.log(latestMessagesInChats);

  const matchedUsersData = matchedUsers.map((matchedUser, index) => {
    const matchId = matches[index].id;
    return {
      id: matchedUser.id,
      username: matchedUser.username,
      photo: matchedUser.photoUrl,
      matchId: matchId,
      // latestMessage: latestMessagesInChats[index][0]?.message || '',
    };
  });

  console.log('matchedUsersData', matchedUsersData);
  return res.status(200).json({
    message: 'Matched Users Data',
    data: { matchedUsersData },
  });
});

const createMessage = catchAsync(async (req, res, next) => {
  const { sentByUserId, matchId, text } = req.body;

  console.log('create chat', req.body);
  if (!text)
    return res.status(400).json({ message: 'Please Fill the Required Fields' });

  const chatMessage = await prisma.message.create({
    data: {
      text: text,
      matchId: matchId,
      senderId: sentByUserId,
    },
  });

  return res.status(200).json({
    message: 'Message Created',
    data: chatMessage,
  });
});

const getMessages = catchAsync(async (req, res, next) => {
  const { matchId } = req.params;

  const messages = await prisma.message.findMany({
    where: {
      matchId: matchId,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          photoUrl: true,
        },
      },
    },
  });

  return res.status(200).json({
    message: 'Messages',
    data: messages,
  });
});

export { getAllMatchForUser, createMessage, getMessages };
