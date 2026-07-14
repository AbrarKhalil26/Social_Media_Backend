import { Card } from "flowbite-react";
import React from "react";
import { customTheme } from "../../lib/flowbiteTheme";
import useFetch from "../../hooks/useFetch";
import AppButton from "../shared/AppButton";
import imgUser from "../../assets/images/user.svg";

export default function SuggestedFriends() {
  const { data } = useFetch({
    queryKey: "suggested-friends",
    endPoint: "/users/suggested-friends",
    options: { select: (data) => data.data.suggestedFriends },
  });
  console.log(data);

  return (
    <div>
      <h3 className="mb-4 pt-7">Suggested Friends</h3>
      <div className="grid grid-cols-4 gap-3">
        {data?.map((item) => (
          <Card
            key={item._id}
            theme={{
              ...customTheme.card,
              root: { ...customTheme.card.root, children: "p-4" },
            }}
            className="max-w-sm"
            imgAlt="picture user"
            imgSrc={item.profilePic ? item.profilePic : imgUser}
          >
            <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              {item.userName}
            </h5>
            <AppButton type="submit" className="btn-yellow w-full h-8 text-sm" onClick={''}>
              Follow
            </AppButton>
          </Card>
        ))}
      </div>
    </div>
  );
}
