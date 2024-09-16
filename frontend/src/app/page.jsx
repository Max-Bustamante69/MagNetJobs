

export default function Home() {
  return (
    <div>
      <h1 className="p-4  ">Home Page</h1>
      {/* boton para redireccionar a la pagina de perfil */}
      <a href="/profile" className="p-4 bg-blue-500 text-white rounded-md">
        Go to Profile
      </a>
    </div>
  );
}
