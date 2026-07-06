import axios from "axios";
import { Textarea, TextInput } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppButton from "../shared/AppButton";
import { AuthContext } from "../../context/AuthContext";
import { IoMdImages } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { customTheme } from "../../lib/flowbiteTheme";
import { MdDelete } from "react-icons/md";
import PostImagePreview from "./PostImagePreview";
import { BASE_URL, PREFIX_USER } from "../../config/config";
import { QUERY_KEYS } from "../../config/queryKeys";
import { createPost } from "../../services/post.service";
import { useCreatePost } from "../../hooks/mutations/useCreatePost";
import EmojiPicker from "emoji-picker-react";

export default function CreatePostModal({
  availableCurrent,
  allowCommentCurrent,
  setOpenModal
}) {
  const { userData } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [preview, setPreview] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  // const [emojiCurrent, setEmojiCurrent] = useState(null);
  const fileInputRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const { mutate, isPending } = useCreatePost({
    reset,
    setPreview,
    fileInputRef,
    setOpenModal
  });
  const onSubmit = (data) => {
    mutate({
      content: data.content,
      availability: availableCurrent,
      allowComments: allowCommentCurrent,
      attachments: fileInputRef.current?.files?.[0],
    });
  };

  // Handle Add & Remove Img ------------>
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };
  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="grid gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Textarea
          raw={3}
          color="dark"
          theme={customTheme.textarea}
          {...register("content", { required: true })}
          placeholder="What do you want to talk about?"
        />
        {preview && (
          <PostImagePreview preview={preview} onRemove={handleRemoveImage} />
        )}
        <TextInput
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex items-center gap-5 text-white">
          <IoMdImages
            size={25}
            onClick={() => fileInputRef.current.click()}
            className="text-3xl cursor-pointer"
          />
          <div>
            <BsEmojiSmile
              size={20}
              onClick={() => setOpenEmoji(!openEmoji)}
              className={`cursor-pointer ${openEmoji && "text-yellow-300"}`}
            />
            {/* {openEmoji && (
              <div className="absolute left-0 z-9999 m-3">
                <EmojiPicker
                  theme="dark"
                  onEmojiClick={(emojiObject) => console.log(emojiObject)}
                  width={300}
                  height={400}
                  lazyLoadEmojis
                />
              </div>
            )} */}
          </div>
          <AppButton
            isLoading={isPending}
            disabled={!isValid || isPending}
            type="submit"
            className="btn-yellow"
          >
            Create Post
          </AppButton>
        </div>
      </form>
    </div>
  );
}
