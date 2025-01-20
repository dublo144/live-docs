// Header
declare type HeaderProps = {
  children?: React.ReactNode;
  className?: string;
};

declare type UserType = "creator" | "editor" | "viewer";

declare type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};

// DocRooms
declare type DocRoomMetadata = {
  creatorId: string;
  email: string;
  title: string;
};

declare type DocRoomProps = {
  roomId: string;
  roomMetadata: DocRoomMetadata;
  userId: string;
  users: User[];
  currentUserType: UserType;
};


declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type CreateDocumentParams = {
  userId: string;
  userEmail: string;
};

declare type NewDocumentBtnProps = {
  userId: string;
  userEmail: string;
};