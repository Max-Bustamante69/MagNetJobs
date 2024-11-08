"use client";

import { useState } from "react";
import Icons from "../General/Icons";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { FollowRequest } from "./FollowAction";
import {deleteFriendship} from "./UnFollowAction";
import { useUser } from "../../SessionProvider";


function FollowButton( { user } ) {

  const userOnSession = useUser();


  const handleFollowToggle = async () => {
    // Llama a FollowRequest solo cuando el icono sea clickeado
    try {
      FollowRequest(user); // Realiza la solicitud de seguimiento
      setIsFollowing((prev) => !prev); // Cambia el estado solo después de la solicitud exitosa
    } catch (error) {
      console.error("Error al actualizar el estado de seguimiento:", error);
    }
  };

  const handleUnFollowToggle = async () => {
    try {
      deleteFriendship(userOnSession, user); // Realiza la solicitud de des-seguimiento
      setIsFollowing((prev) => !prev); // Cambia el estado solo después de la solicitud exitosa
    } catch (error) {
      console.error("Error al actualizar el estado de seguimiento:", error);
    }
  };

  return (
    <div>
  { userOnSession.following.includes(user.id)? (
    <div onClick={handleUnFollowToggle} style={{ cursor: "pointer" }}>
      <Icons IconName={HiUserRemove} />
    </div>
  ) : (
    <div onClick={handleFollowToggle} style={{ cursor: "pointer" }}>
      <Icons IconName={HiUserAdd} />
    </div>
  )}
</div>

  );
}

export default FollowButton;
