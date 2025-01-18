'use server';

import { RoomAccesses } from '@liveblocks/node';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { liveblocks } from '../liveblocks';
import { parseStringify } from '../utils';

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata: DocRoomMetadata = {
      creatorId: userId,
      email,
      title: 'Untitled document',
    };

    const usersAccesses: RoomAccesses = {
      [email]: ['room:write'],
    }

    const docRoom = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath('/');

    return parseStringify(docRoom);

  } catch (error) {
    console.error('Error while creating a room', error);
  }

};