'use server';

import { RoomAccesses } from '@liveblocks/node';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { liveblocks } from '../liveblocks';
import { parseStringify } from '../utils';

export const createDocument = async ({ userId, userEmail }: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata: DocRoomMetadata = {
      creatorId: userId,
      email: userEmail,
      title: 'Untitled document',
    };

    const usersAccesses: RoomAccesses = {
      [userEmail]: ['room:write'],
    }

    const docRoom = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ['room:write'], // TODO - revoke access to room:write
    });

    revalidatePath('/');

    return parseStringify(docRoom);

  } catch (error) {
    console.error('Error while creating a room', error);
  }

};

export const getDocument = async ({ roomId, userId }: { roomId: string, userId: string }) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    // TODO - implement
    // const userHasAccess = Object.keys(room.usersAccesses).includes(userId);

    // if (!userHasAccess) {
    //   throw new Error('User does not have access to this document');
    // }

    return parseStringify(room);
  } catch (error) {
    console.error('Error while fetching document', error);
  }
}