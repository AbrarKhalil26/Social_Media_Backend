import { useContext, useState } from "react";
import { Avatar, Card, Label } from "flowbite-react";
import { AuthContext } from "../../context/AuthContext";
import ModalWrapper from "../shared/ModalWrapper";
import CreatePostModal from "./CreatePostModal";
import CreatePostHeaderModal from "./CreatePostHeaderModal";

export default function CreatePost() {
  const { userData } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [availableCurrent, setAvailableCurrent] = useState("public");
  const [allowCommentCurrent, setAllowCommentCurrent] = useState("allow");

  return (
    <Card className="dark:bg-base dark:border-none shadow-[0px_0px_15px_-1px_var(--color-yellow-100),0px_0px_15px_5px_var(--color-neutral-800)]">
      <div className="flex flex-col gap-4">
        <div className="mb-2 block">
          <Label htmlFor="Post" className="text-xl">
            Create Post
          </Label>
        </div>
        <div className="flex gap-4 items-center">
          <Avatar
            alt="User settings"
            img={
              userData?.photo ||
              "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            }
            rounded
          />
          <div
            color
            id="content"
            placeholder="Start a Post..."
            className="border border-gray-400 w-full rounded-full py-1.5 px-4 select-none"
            onClick={() => setOpenModal(true)}
          >
            Start a Post...
          </div>

          {openModal && (
            <ModalWrapper
              header={
                <CreatePostHeaderModal
                  userData={userData}
                  availableCurrent={availableCurrent}
                  setAvailableCurrent={setAvailableCurrent}
                  allowCommentCurrent={allowCommentCurrent}
                  setAllowCommentCurrent={setAllowCommentCurrent}
                />
              }
              body={
                <CreatePostModal
                  availableCurrent={availableCurrent}
                  allowCommentCurrent={allowCommentCurrent}
                  setOpenModal={setOpenModal}
                />
              }
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          )}
        </div>
      </div>
    </Card>
  );
}
