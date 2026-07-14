import React from "react";

export default function UserAvatar({owner, size}) {
  return (
    <>
      {owner?.profilePic ? (
        <Avatar
          img={owner?.profilePic}
          alt="profile-person"
          className="me-4"
          rounded size={size}
        />
      ) : (
        <div className={`${size ? `w-${36} h-${36}`:'me-4 w-10 h-10'}  rounded-full bg-zinc-300 flex items-center justify-center text-neutral-950 font-bold shrink-0`}>
          {owner?.userName?.slice(0, 2)}
        </div>
      )}
    </>
  );
}
