"use client";

import { useState } from "react";
import Icons from "../General/Icons";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { FollowRequest } from "./FollowAction";
import {deleteFriendship} from "./UnFollowAction";

function FollowButton( { user, userOnSession } ) {
  const [isFollowing, setIsFollowing] = useState(Array.isArray(userOnSession.following) && userOnSession.following.includes(user.id));

  const handleFollowToggle = async () => {
    // Llama a FollowRequest solo cuando el icono sea clickeado
    try {
      FollowRequest(user, userOnSession); // Realiza la solicitud de seguimiento
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
      {isFollowing ? <div onClick={handleUnFollowToggle} style={{ cursor: "pointer" }}><Icons IconName={HiUserRemove} /></div> : <div onClick={handleFollowToggle} style={{ cursor: "pointer" }}><Icons IconName={HiUserAdd} /></div>}
    </div>
  );
}

export default FollowButton;
