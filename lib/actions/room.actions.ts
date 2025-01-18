'use server';
import { RoomAccesses } from '@liveblocks/node';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { parseStringify } from '../utils';
import { liveblocks } from './../liveblocks';

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

export const getDocuments = async (userEmail: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: userEmail });

    return parseStringify(rooms);
  } catch (error) {
    console.error('Error while fetching documents', error);
  }
};

export const updateDocument = async ({ roomId, userId, title }: { roomId: string, userId: string, title: string }) => {

  try {
    const room = await liveblocks.getRoom(roomId);
    const userPermissions: string[] = room.usersAccesses[userId];
    if (!userPermissions?.includes("room:write")) {
      throw new Error('User does not have access to write to this document');
    }

    liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      }
    })
  } catch (error) {
    console.error('Error while updating document', error);

  }
};