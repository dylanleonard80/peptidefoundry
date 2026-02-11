import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const CategoryGrid = () => {
  const categories = [
    {
      title: "Repair & Regeneration",
      subtitle: "Tissue research peptides",
      image: "/category-tissue-repair.webp",
      link: "/recovery",
    },
    {
      title: "Muscle & Performance",
      subtitle: "Growth factor research",
      image: "/category-muscle-performance.jpg",
      link: "/build-muscle",
    },
    {
      title: "Metabolic Research",
      subtitle: "Energy & metabolism",
      image: "/category-fat-loss-metabolic.webp",
      link: "/lose-fat",
    },
    {
      title: "Cellular Health",
      subtitle: "Longevity research",
      image: "/category-cognition-longevity.jpg",
      link: "/anti-aging",
    },
    {
      title: "Cognition & Mood",
      subtitle: "Neurological research",
      image: "/category-cognition-mood.webp",
      link: "/libido",
      objectPosition: "center 70%",
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-charcoal">
              Research Categories
            </h2>
            <p className="mt-2 text-charcoal-light text-sm md:text-base">
              Explore our catalog by research application
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary link-refined"
          >
            View all peptides
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category grid - organic cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden card-organic"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  objectPosition:
                    (category as any).objectPosition || "center",
                }}
              />

              {/* Gradient Overlay - softer, more organic */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent transition-all duration-500 group-hover:from-charcoal/70" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                <div className="transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                  <h3 className="text-sm md:text-base font-medium text-white leading-tight">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.subtitle}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white/20">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="mt-6 sm:hidden">
          <Link
            to="/shop"
            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-primary border border-primary/20 rounded-full hover:bg-primary/5 transition-colors"
          >
            View all peptides
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
