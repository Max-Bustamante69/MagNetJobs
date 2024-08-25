import Image from "next/image";
import UserList from "./components/UserList";

export default function Home() {
  return (
    <div>
      <h1 className="p-4 ">Home Page</h1>
      <UserList />
    </div>
  );
}
