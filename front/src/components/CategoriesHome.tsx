"use client";
import { CATEGORIES } from '@/lib/categoriesHome';
import { useRouter } from 'next/navigation';

export default function CategoriesHome() {
  const router = useRouter();

  // Recibe el slug (ej: 'Training', 'Kayak')
  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/experiences/${categorySlug}`);
  };

  return (
  <section className="py-8 sm:py-10 md:py-12 bg-white text-center relative overflow-hidden">
    
    {/* Decoraciones */}
    <div className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#D6755B] rounded-br-2xl md:rounded-br-3xl -translate-x-2 -translate-y-2 sm:-translate-x-3 sm:-translate-y-3 md:-translate-x-4 md:-translate-y-4" />
    <div className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#D6755B] rounded-bl-2xl md:rounded-bl-3xl translate-x-2 -translate-y-2 sm:translate-x-3 sm:-translate-y-3 md:translate-x-4 md:-translate-y-4" />

    {/* HEADER */}
    <header className="mb-6 sm:mb-8 md:mb-10">
      <span className="text-gray-400 uppercase tracking-widest text-[10px] sm:text-xs md:text-sm font-semibold">
        Categories
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-2">
        Our Services
      </h2>
    </header>

    {/* GRID */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-3 sm:px-4">
  {CATEGORIES.map((cat) => {
    const IconComponent = cat.icon;
    return (
      <button
        key={cat.id}
        onClick={() => handleCategoryClick(cat.slug)}
        className="flex items-center justify-start gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 border border-gray-200 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 group active:scale-95"
      >
        <span className="group-hover:scale-110 transition-transform flex items-center justify-center">
          <IconComponent size={20} className="text-gray-700 sm:size-[22px] md:size-[24px]" />
        </span>
        <span className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
          {cat.name}
        </span>
      </button>
    );
  })}
</div>

    {/* BOTÓN */}
    <button 
      onClick={() => router.push('/experiences')}
      className="mt-8 sm:mt-10 md:mt-12 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 bg-[#F2B705] active:bg-amber-400 text-black text-sm sm:text-base font-semibold rounded-lg hover:bg-[#CA8A04] transition-colors"
    >
      Ver todas
    </button>

    {/* Decoraciones abajo */}
    <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#D6755B] rounded-tr-2xl md:rounded-tr-3xl -translate-x-2 translate-y-2 sm:-translate-x-3 sm:translate-y-3 md:-translate-x-4 md:translate-y-4" />
    <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#D6755B] rounded-tl-2xl md:rounded-tl-3xl translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 md:translate-x-4 md:translate-y-4" />
    
  </section>
);
}