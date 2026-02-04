import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import peptideVialSyringe from "@/assets/peptide-vial-syringe.jpg";
interface StepCardProps {
  number: string;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}
const StepCard = ({
  number,
  title,
  description,
  isActive,
  onClick
}: StepCardProps) => {
  return <div className={cn("rounded-xl p-6 cursor-pointer transition-all duration-500 border", isActive ? "bg-white shadow-elegant border-pulse-200" : "bg-white/50 hover:bg-white/80 border-transparent")} onClick={onClick}>
      <div className="flex items-start">
        <div className={cn("flex items-center justify-center rounded-full w-10 h-10 mr-4 flex-shrink-0 transition-colors duration-300", isActive ? "bg-pulse-500 text-white" : "bg-gray-100 text-gray-500")}>
          {number}
        </div>
        <div>
          <h3 className={cn("text-lg font-semibold mb-2 transition-colors duration-300", isActive ? "text-pulse-600" : "text-gray-800")}>
            {title}
          </h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>;
};
const HowItWorks = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsData = [{
    number: "01",
    title: "Browse Our Catalog",
    description: "Explore our complete selection of research-grade peptides. Each product page includes detailed specifications, purity data, and relevant research references to help you find exactly what you need.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
  }, {
    number: "02",
    title: "Place Your Order",
    description: "Add peptides to your cart and check out securely. All orders include a Certificate of Analysis (COA) documenting purity and composition from independent third-party testing.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
  }, {
    number: "03",
    title: "Receive & Research",
    description: "Your order ships quickly from our USA facility with proper cold-chain handling. Each shipment includes storage guidelines and reconstitution instructions for optimal research results.",
    image: peptideVialSyringe
  }];
  useEffect(() => {
    // Auto-cycle through steps
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % stepsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [stepsData.length]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    const elements = document.querySelectorAll(".fade-in-stagger");
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${0.1 * (index + 1)}s`;
      observer.observe(el);
    });
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  return <section className="py-20 bg-white relative" id="how-it-works" ref={sectionRef}>
      {/* Background decorative elements */}
      <div className="absolute -top-20 right-0 w-72 h-72 bg-pulse-50 rounded-full opacity-60 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-gray-50 rounded-full opacity-70 blur-3xl -z-10"></div>

      
    </section>;
};
export default HowItWorks;