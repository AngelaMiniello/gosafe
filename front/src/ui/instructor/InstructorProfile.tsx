"use client";

import { IInstructor } from "@/types/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getInstructorById } from "@/service/authService";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/AuthContext";
import InstructorSidebar from "@/components/dashboard/InstructorSidebar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

import { Mountain } from "lucide-react";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

export default function InstructorProfile() {
  const { userData } = useAuth();
  const [instructor, setInstructor] = useState<IInstructor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        if (!userData?.token) {
          setLoading(false);
          return;
        }

        // 1. Decodifico el token para obtener id y rol
        const decoded = jwtDecode<DecodedToken>(userData.token);

        console.log("ID token:", decoded.id);
        console.log("ROLE token:", decoded.role);

        // 2. Llamo al endpoint del backend
        const data = await getInstructorById(decoded.id, userData.token);

        console.log("RESPUESTA INSTRUCTOR:", data);

        // 3. El backend puede devolver un objeto o un array con un solo instructor
        // Lo normalizo para trabajar siempre con un solo objeto
        const instructorData = Array.isArray(data) ? data[0] : data;

        // 4. Adapto lo que viene del back a lo que espera el front
        const formattedInstructor = instructorData
          ? {
              ...instructorData,
              instructorProfile: instructorData.instructor || {},
            }
          : null;

        // 5. Guardo en el estado
        setInstructor(formattedInstructor);

      } catch (error) {
        console.error("Error cargando perfil:", error);
        setInstructor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [userData]);

  return (
    <DashboardLayout sidebar={<InstructorSidebar />}>
      <div className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 lg:py-10">
        {loading ? (
          <p className="p-6">Cargando perfil...</p>
        ) : !instructor ? (
          <p className="p-6">No hay datos del instructor</p>
        ) : (
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 items-start">
              <div className="md:col-span-2 space-y-6">
                {/* PERFIL */}
                <div className="bg-white rounded-3xl border border-[#ece7df] shadow-sm p-4 sm:p-6 md:p-8 sm:w-md xl:w-3xl">
                  <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4 sm:gap-4">
                    <Image
                      src={instructor.profilePic || "/default.jpg"}
                      alt="Instructor"
                      width={180}
                      height={180}
                      className="h-32 w-32 sm:h-40 sm:w-40 md:h-45 md:w-45 rounded-3xl object-cover"
                    />

                    <div className="flex-1">
                      <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3d2b]">
                        {instructor.firstName} {instructor.lastName}
                      </h1>

                      <p className="text-gray-600 mt-2 text-sm sm:text-base">
                        {instructor.city}, {instructor.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* VALOR HORA MOBILE/TABLET */}
                <div className="md:hidden rounded-[28px] p-4 sm:p-6 bg-[#e7b52c]">
                  <h2 className="text-lg sm:text-xl font-bold">
                    Valor hora: ${instructor.instructorProfile?.price ?? 0}
                  </h2>
                </div>

                {/* SOBRE MI */}
                <div className="bg-white rounded-[28px] p-4 sm:p-6">
                  <h2 className="text-xl font-bold mb-3">Sobre mí</h2>
                  <p>
                    {instructor.instructorProfile?.about ||
                      "Sin descripción disponible."}
                  </p>
                </div>

                {/* ACTIVIDADES */}
                <div className="bg-white rounded-[28px] p-4 sm:p-6">
                  <h2 className="text-xl font-bold mb-3">Actividades</h2>

                  {instructor.instructorProfile?.activities?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {instructor.instructorProfile.activities.map((act) => (
                        <div key={act} className="p-4 border rounded-xl">
                          <Mountain size={18} />
                          <p>{act}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No hay actividades cargadas.</p>
                  )}
                </div>

                {/* RESEÑAS */}
                <div className="bg-white rounded-[28px] p-4 sm:p-6">
                  <h2 className="text-xl font-bold mb-3">Reseñas</h2>

                  {instructor.reviews?.length ? (
                    instructor.reviews.map((r) => (
                      <div key={r.id} className="border p-3 rounded mb-2">
                        <p>{r.text}</p>
                      </div>
                    ))
                  ) : (
                    <p>No hay reseñas aún</p>
                  )}
                </div>
              </div>

              {/* SIDEBAR DERECHO */}
              <div className="hidden md:block">
                <div className="rounded-[28px] p-6 bg-[#e7b52c] max-w-3xs">
                  <h2 className="text-xl font-bold">
                    Valor hora: ${instructor.instructorProfile?.price ?? 0}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}