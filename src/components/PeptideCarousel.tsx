import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { getAllUniquePeptides } from "@/data/peptides";
import peptideVial from "@/assets/peptide-vial-syringe.jpg";
const PeptideCarousel = () => {
  const peptides = getAllUniquePeptides();
  const [isHovering, setIsHovering] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return <div className="py-8 md:py-12">
      <h3 className="text-xl md:text-2xl font-bold text-center mb-6">Our Peptide Catalog</h3>
      
      {/* Break out of container to full width */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <div ref={scrollContainerRef} className={`relative ${isHovering ? 'overflow-x-auto' : 'overflow-hidden'}`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} style={{
        scrollbarWidth: 'thin'
      }}>
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
          <div className={`flex w-max gap-0 ${isHovering ? '' : 'animate-peptide-scroll'}`}>
            {/* First set of cards */}
            {peptides.map(peptide => <Link key={`first-${peptide.slug}`} to={`/${peptide.slug}`} className="flex-shrink-0 px-3 group">
                <div className="w-56 h-56 bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col">
                  <div className="w-full h-32 mb-3 flex items-center justify-center">
                    <img src={peptide.image || peptideVial} alt={peptide.name} loading="lazy" width="128" height="128" className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground truncate">{peptide.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{peptide.benefit}</p>
                </div>
              </Link>)}
            
            {/* Duplicate set for seamless loop - only show when animating */}
            {!isHovering && peptides.map(peptide => <Link key={`second-${peptide.slug}`} to={`/${peptide.slug}`} className="flex-shrink-0 px-3 group">
                <div className="w-56 h-56 bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col">
                  <div className="w-full h-32 mb-3 flex items-center justify-center">
                    <img src={peptide.image || peptideVial} alt={peptide.name} loading="lazy" width="128" height="128" className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground truncate">{peptide.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{peptide.benefit}</p>
                </div>
              </Link>)}
          </div>
        </div>
      </div>
    </div>;
};
export default PeptideCarousel;