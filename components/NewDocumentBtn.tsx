"use client";

import { createDocument } from "@/lib/actions/room.actions";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const NewDocumentBtn = ({ userId, userEmail }: NewDocumentBtnProps) => {
  const router = useRouter();

  const createDocumentHandler = async () => {
    try {
      const docRoom = await createDocument({ userId, userEmail });

      if (docRoom) router.push(`/documents/${docRoom.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      type="submit"
      onClick={createDocumentHandler}
      className="gradient-blue flex gap-1 shadow-md"
    >
      <Image
        src={"/assets/icons/add.svg"}
        alt="Create document"
        width={24}
        height={24}
      />
      <p className="hidden sm:block">Create a new document</p>
    </Button>
  );
};

export default NewDocumentBtn;
