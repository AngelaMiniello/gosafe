"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface IMyBlogPost {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
}

export default function MyBlogsView() {
  const router = useRouter();
  const { userData } = useAuth();

  const [blogs, setBlogs] = useState<IMyBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        if (!userData?.token) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/blogs/my`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });

        const data = await res.json();

        console.log("MIS BLOGS:", data);

        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else if (Array.isArray(data.data)) {
          setBlogs(data.data);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error cargando mis blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [userData]);

  return (
    <section className="min-h-screen bg-[#f7f4ee] px-3 py-6 sm:px-6 sm:py-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-wide text-gray-500">
              Blog
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3d2b] leading-tight">
              Mis publicaciones
            </h1>
          </div>

          <button
            onClick={() => router.push("/blogs/create")}
            className="inline-flex self-start rounded-xl bg-[#e7b52c] px-4 py-2.5 text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#d7a61e] sm:px-5 sm:py-3 sm:text-base"
          >
            Crear publicación
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : blogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white  p-6 text-center sm:p-10">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1a3d2b]">
              Todavía no publicaste nada
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Cuando crees una publicación, va a aparecer acá.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm border border-[#ece7df]"
              >
                <img
                  src={post.imageUrl || "https://via.placeholder.com/400"}
                  alt={post.title}
                  className="h-44 w-full object-cover sm:h-52"
                />

                <div className="p-4 sm:p-5">
                  <h2 className="mb-2 text-lg sm:text-xl font-bold text-[#1a3d2b]">
                    {post.title || "Sin título"}
                  </h2>

                  <p className="mb-4 line-clamp-3 text-sm text-gray-600 leading-6">
                    {post.text}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push(`/blogs/${post.id}`)}
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:px-4"
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}