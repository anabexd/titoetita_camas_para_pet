import Image from "next/image";

export default function Page() {
  return (
    <div>
      <header className="w-full flex items-center gap-5 pl-10 pt-10 pb-10">
        <Image src="/logo-titoetita.svg" alt="Logo" width={100} height={100} />
        <div className="text-2xl flex items-center gap-1">
          <h1 className="font-bold text-gray-700">Tito & Tita</h1>
          <h3 className="text-gray-700">| Camas para Pets</h3>
        </div>
      </header>
      <div className="pl-10 pt-10 flex flex-col gap-2">
        <h2>Meus projetos</h2>
        <button className="w-fit bg-gray-400 text-white font-semibold px-4 py-2 rounded inline-flex items-center gap-2 h-pointer">
          <span>Nova caminha</span>
          <span className="text-lg">+</span>
        </button>
      </div>
    </div>
  )
}
