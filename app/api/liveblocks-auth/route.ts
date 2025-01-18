import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST() {
  // Get the current user from your database
  const clerkUser = await currentUser();

  if (!clerkUser) redirect("/sign-in");

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  const user = {
    id,
    metadata: {
      id,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      avatar: imageUrl,
      email: emailAddresses[0].emailAddress,
      color: getUserColor(id),
    },
  }

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.metadata.email,
      groupIds: [], // Optional
    },
    { userInfo: user.metadata },
  );

  return new Response(body, { status });
}