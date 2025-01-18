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
  userEmail: string;
};

declare type NewDocumentBtnProps = {
  userId: string;
  userEmail: string;
};