"use client";

import { updateDocument } from "@/lib/actions/room.actions";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { useState } from "react";
import { Editor } from "./editor/Editor";
import Header from "./Header";
import Loader from "./Loader";
import { Input } from "./ui/input";

const DocRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
  userId,
}: DocRoomProps) => {
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);

  const updateTitle = async (title: string) => {
    try {
      if (documentTitle !== roomMetadata.title) {
        setDocumentTitle(title);
        await updateDocument({ roomId, userId, title });
      }
    } catch (error) {
      console.error(error);
      setDocumentTitle(roomMetadata.title);
    }
  };

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="doc-room">
          <Header>
            <div className="flex items-center justify-center gap-2">
              <Input
                disabled={currentUserType !== "editor"}
                type="text"
                className="document-title-input"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  }
                }}
                onBlur={(e) => {
                  updateTitle(e.target.value);
                }}
              />
            </div>
          </Header>
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default DocRoom;
