import DocRoom from "@/components/DocRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Document = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const userId = clerkUser.emailAddresses[0].emailAddress;

  const room = await getDocument({
    roomId: id,
    userId,
  });

  if (!room) redirect("/"); // TODO - Unauthorized page

  // TODO asses permission level

  return (
    <main className="flex w-full flex-col items-center">
      <DocRoom roomId={id} roomMetadata={room.metadata} userId={userId} />
    </main>
  );
};

export default Document;
