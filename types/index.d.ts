// Header
declare type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

// DocRooms
declare type DocRoomMetadata = {
  creatorId: string;
  email: string;
  title: string;
};


declare type CreateDocumentParams = {
  userId: string;
  email: string;
};