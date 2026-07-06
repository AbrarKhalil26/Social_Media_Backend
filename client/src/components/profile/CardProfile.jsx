import { Avatar, Card } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { formatDate } from "../../lib/formateDate";
import Loader from "../shared/Loader";
import Model from "../shared/Model";
import { MdEdit } from "react-icons/md";
import UploadFile from "./UploadFile";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import ChangePassword from "./ChangePassword";

export default function CardProfile() {
  const { userData } = useContext(AuthContext);
  const [openChangePhotoModal, setOpenChangePhotoModal] = useState(false);
  const [openChangePassModal, setOpenChangePassModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm();
  const queryClient = useQueryClient();
  const { mutate: handleChangePhoto, isPending } = useMutation({
    mutationFn: changePhoto,
    onSuccess: () => {
      toast.success(`Photo Updated successfully`, {
        theme: "dark",
        autoClose: 2000,
      });

      queryClient.invalidateQueries(["details-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["user-data"]);
      setOpenChangePhotoModal(false);
      reset();
    },
    onError: () => {
      toast.error(`Something went wrong`, {
        theme: "dark",
        autoClose: 2000,
      });
    },
  });

  async function changePhoto(data) {
    const formData = new FormData();
    formData.append("photo", data.photo[0]);
    return await axios.put(
      `${import.meta.env.VITE_BASE_URL}/users/upload-photo`,
      formData,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  }
  console.log(userData);
  
  return (
    <Card>
      {userData ? (
        <div className="flex flex-col gap-2 p-4">
          <div className="relative w-fit m-auto">
            <Avatar
              className="profile-picture mb-3"
              img={userData?.photo}
              alt="profile-picture"
              rounded
            />
            <div
              className="absolute bottom-2 end-0 w-8 h-8 bg-gray-700/60 cursor-pointer rounded-full flex justify-center items-center"
              onClick={() => setOpenChangePhotoModal(true)}
            >
              <MdEdit />
            </div>
          </div>
          <h5 className="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
            {userData?.name}
          </h5>
          <p className="text-md text-gray-500 dark:text-gray-400 truncate">
            <span className="me-4">Email:</span>
            {userData?.email}
          </p>
          <p className="text-md text-gray-500 dark:text-gray-400">
            <span className="me-4">Created At:</span>
            {formatDate(userData?.createdAt)}
          </p>
          <p className="text-md text-gray-500 dark:text-gray-400 capitalize">
            <span className="me-4">Gender:</span>
            {userData?.gender}
          </p>
          <a
            href="#"
            className="mt-4 items-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            onClick={() => setOpenChangePassModal(true)}
          >
            Change Password
          </a>
        </div>
      ) : (
        <Loader count={1} />
      )}
      {openChangePhotoModal && (
        <Model openModal={openChangePhotoModal} setOpenModal={setOpenChangePhotoModal}>
          <UploadFile
            register={register}
            onSubmit={handleSubmit(handleChangePhoto)}
            isPending={isPending}
            isValid={isValid}
          />
        </Model>
      )}
      {openChangePassModal && (
        <Model openModal={openChangePassModal} setOpenModal={setOpenChangePassModal}>
          <ChangePassword setOpenChangePassModal={setOpenChangePassModal}/>
        </Model>
      )}
    </Card>
  );
}
