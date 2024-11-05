"use client";

import { useState } from "react";
import Icons from "../General/Icons";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { FollowRequest } from "./FollowAction";

function FollowButton({ user, userOnSession }) {
  const [isFollowing, setIsFollowing] = useState(userOnSession.following.includes(user.id));

  const handleFollowToggle = async () => {
    // Llama a FollowRequest solo cuando el icono sea clickeado
    try {
      FollowRequest(user, userOnSession); // Realiza la solicitud de seguimiento/des-seguimiento
      setIsFollowing((prev) => !prev); // Cambia el estado solo después de la solicitud exitosa
    } catch (error) {
      console.error("Error al actualizar el estado de seguimiento:", error);
    }
  };

  return (
    <div>
      {isFollowing ? <Icons IconName={HiUserRemove} /> : <div onClick={handleFollowToggle} style={{ cursor: "pointer" }}><Icons IconName={HiUserAdd} /></div>}
    </div>
  );
}

export default FollowButton;
