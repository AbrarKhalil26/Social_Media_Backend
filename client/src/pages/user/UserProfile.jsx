import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { QUERY_KEYS } from "../../config/queryKeys";
import useFetch from "../../hooks/useFetch";
import UserAvatar from "../../components/shared/userAvatar";
import AppButton from "../../components/shared/AppButton";
import { BsPersonFillAdd } from "react-icons/bs";
import { BiSolidUserCheck } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillCake2Fill } from "react-icons/bs";
import { BsHearts } from "react-icons/bs";



export default function UserProfile() {
  const { id } = useParams();
  const { userData } = useAuth();
  const { data: person } = useFetch({
    queryKey: [QUERY_KEYS.USER_DATA],
    endPoint: `users/${id}`,
    options: { select: (data) => data.data },
  });
  const isMyFriend = person?.friends?.some((friend) => {
    console.log(friend);
  });

  const details = [
    { value: person?.address, label: "location", icon: FaLocationDot },
    { value: person?.DOB, label: "birthday", icon: BsFillCake2Fill },
    { value: person?.status, label: "status", icon: BsHearts },
  ];
  console.log(person);

  return (
    <div>
      <div className="flex flex-col gap-5 items-center sm:flex-row ">
        <UserAvatar owner={person} size="xl" />
        <div className="grid gap-2 mt-3 text-center">
          <h3 className="text-2xl">{person?.userName}</h3>
          <div className="flex gap-4 text-sm text-gray-400">
            <p>{person?.friends?.length} friends</p>
            <p>{person?.posts?.length} posts</p>
          </div>
          <p className="text-sm text-gray-400">{person?.bio}</p>
        </div>
        <div className="flex gap-2">
          <AppButton className="btn-yellow">
            <BsPersonFillAdd className="mr-2" /> Friends{" "}
          </AppButton>
          <AppButton className="btn-outline-yellow">
            <BiSolidUserCheck className="mr-2" /> Friends{" "}
          </AppButton>
        </div>
        <div className="self-start">
          <h4 className="mb-2">Personal details</h4>
          <ul className="text-gray-400 grid gap-2 ml-2">
            {details.map((item, idx)=>( item.value &&
              <li key={idx} className="flex items-center gap-2">
                <item.icon/>
                <span className="capitalize text-[15px]">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}
