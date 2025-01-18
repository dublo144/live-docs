"use client";

import { updateDocument } from "@/lib/actions/room.actions";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { useState } from "react";
import ActiveCollaborators from "./ActiveCollaborators";
import { Editor } from "./editor/Editor";
import Header from "./Header";
import Loader from "./Loader";
import { Input } from "./ui/input";

const DocRoom = ({ roomId, roomMetadata, userId }: DocRoomProps) => {
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);

  const currentUserAccess = "editor";

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
            <div className="flex w-fit items-center justify-center gap-2">
              <Input
                disabled={currentUserAccess !== "editor"}
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
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />
            </div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default DocRoom;
