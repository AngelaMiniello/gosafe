"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { UserRound, LogOutIcon, Text, LogInIcon, UserPen,  X, Menu  } from "lucide-react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role?: string;
}

export default function Navbar() {
  const { userData, handleLogout } = useAuth();
  
  let userRole = "";

  if (userData?.token) {
    try {
      const decoded = jwtDecode<DecodedToken>(userData.token);
      userRole = (decoded.role || "").toLowerCase();
    } catch {
      userRole = "";
    }
  }

  const avatarSrc = userData?.user?.profilePic?.trim();
  const displayName = userData?.user?.name?.trim() || "Usuario";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  //menú desplegable
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navBtn =
  "flex items-center justify-center gap-1 lg:gap-2 py-2 border border-black rounded hover:bg-[#b8b1a6] px-2 lg:px-3 xl:px-4 text-center text-xs lg:text-sm xl:text-base min-w-[90px] lg:min-w-[105px] xl:min-w-[150px]";

  const mobileNavBtn =
  "flex items-center gap-3 px-3 py-2 rounded-md active:bg-black/10 transition-colors text-sm";

  return (
    <nav className=" bg-[#EDE1CF] px-3 md:px-6 xl:px-10 py-2 md:py-3 w-full">
      <div className="flex items-center justify-between gap-2 md:gap-4">
        <Link href="/" className="cursor-pointer shrink-0">
          <Image
            src="/logo.png"
            alt="GoSafe logo"
            width={80}
            height={80}
            className="w-16 h-auto md:w-20"
          />
        </Link>

      {userData?.token ? (
        <>
        <div className="flex items-center gap-6 w-full justify-end">
          {/* Buscador */}
          <div className="flex flex-1 min-w-0 justify-center">
            <input
              type="text"
              placeholder="Busca por aventura"
              className="w-full max-w-[200px] sm:max-w-[220px] md:max-w-[220px] lg:max-w-[300px] xl:max-w-md 
              px-3 md:px-4
              py-2 md:py-2.5 
              rounded-2xl bg-gray-50 border border-gray-200 
              focus:bg-white focus:ring-2 focus:ring-[#EAB308]/20 focus:border-[#EAB308] 
              outline-none transition-all duration-300 
              text-xs md:text-sm shadow-sm"
            />
          </div>

          {/* Acciones */}
          <div className="hidden md:flex items-center gap-1 md:gap-2 lg:gap-4 shrink-0">
            <Link
              href="/dashboard"
              className="group"
              title="Ir al dashboard"
              aria-label="Ir al dashboard"
            >
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={`Foto de perfil de ${displayName}`}
                  className="h-11 w-11 rounded-full border-2 border-[#1a3d2b] object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1a3d2b] bg-[#dce6de] text-sm font-bold text-[#1a3d2b] transition group-hover:scale-105">
                  {avatarInitial}
                </div>
              )}
            </Link>
            <Link
            href="/blogs"
            className="px-4 py-2 border border-black rounded hover:bg-[#b8b1a6] w-37.5 flex items-center justify-center gap-2 text-center"
            >
            <Text size={18} />
            <span>Blog</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-1 lg:gap-2 py-2 border border-black rounded hover:bg-[#b8b1a6] px-2 lg:px-3 xl:px-4 text-center text-xs lg:text-sm xl:text-base min-w-[90px] lg:min-w-[105px] xl:min-w-[150px]"
            >
              <UserRound size={18} />
              <span>Dashboard</span>
            </Link>
            <button
              onClick={handleLogout}
              className={navBtn}
            >
              <LogOutIcon size={18} />
              <span>Salir</span>
            </button>
          </div>
        </div>

        {/* Mobile button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center p-1.5 border border-black rounded-md shrink-0"
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </>
      ) : (
        <>
          <div className="hidden md:flex gap-4 ml-auto">
          <Link
            href="/login"
            className={navBtn}
          >
            <LogInIcon size={18} />
            <span>Ingresar</span>
          </Link>

          <Link
            href="/RegisterForBoth"
            className={navBtn}
          >
            <UserPen size={18} />
          <span>Registrarme</span>
          </Link>
          </div>

          {/* Mobile button sin login */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center p-1 border border-black rounded shrink-0"
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </>
      )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />

        {/* Side drawer */}
        <div className="fixed top-0 right-0 h-full w-[280px] bg-[#EDE1CF] z-50 md:hidden shadow-lg p-4 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-md font-normal text-center">MENÚ</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center p-1.5 border border-black rounded-md shrink-0"
              aria-label="Cerrar menú"
            >
              <X size={18} />
            </button>
          </div>

      <div className="border-t border-black/20 mb-4" />

      <div className="flex flex-col gap-2">
        {userData?.token ? (
          <>
            <Link
              href="/blogs"
              onClick={() => setMenuOpen(false)}
              className={mobileNavBtn}
            >
              <Text size={18} />
              <span>Blog</span>
            </Link>

            {showCart && (
              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className={mobileNavBtn}
              >
                <ShoppingCart size={18} />
                <span>Carrito</span>
              </Link>
            )}

            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className={mobileNavBtn}
            >
              <UserRound size={18} />
              <span>Dashboard</span>
            </Link>

            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className={mobileNavBtn}
            >
              <LogOutIcon size={18} />
              <span>Salir</span>
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className={mobileNavBtn}
            >
              <LogInIcon size={18} />
              <span>Ingresar</span>
            </Link>

            <Link
              href="/RegisterForBoth"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 border border-black rounded hover:bg-[#b8b1a6]"
            >
              <UserPen size={18} />
              <span>Registrarme</span>
            </Link>
          </>
        )}
      </div>
    </div>
  </>
)}
    </nav>
  );
}