import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

export default function AirportDigitalTwinFooter() {
  return (
    <footer className="py-14 border-t border-white/[0.06] bg-[#03060E]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#00E5FF] text-black font-black flex items-center justify-center font-mono text-sm shadow-[0_0_15px_rgba(0,229,255,0.4)]">
              <Plane size={16} />
            </div>
            <div>
              <span className="font-bold tracking-tight text-lg text-white font-mono">
                Airport Digital Twin
              </span>
              <span className="text-xs text-neutral-400 block font-mono">
                Kempegowda (VOBL / BLR) • A Namma Universe Product
              </span>
            </div>
          </div>

          {/* Universe Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs font-mono text-neutral-400">
            <Link to="/#products" className="hover:text-white transition-colors">Products</Link>
            <Link to="/products/aiva" className="hover:text-[#A66B8E] transition-colors">Aiva</Link>
            <Link to="/products/casamoto" className="hover:text-[#FF6B00] transition-colors">CasaMoto</Link>
            <Link to="/products/ev-copilot" className="hover:text-[#6D5EF7] transition-colors">EV Copilot</Link>
            <Link to="/products/wellora" className="hover:text-[#2ECC71] transition-colors">Wellora</Link>
            <Link to="/products/namma-hood" className="hover:text-[#10b981] transition-colors">Namma Hood</Link>
            <Link to="/#philosophy" className="hover:text-white transition-colors">Philosophy</Link>
          </div>

          {/* Copyright */}
          <div className="text-xs font-mono text-neutral-400 text-center md:text-right">
            &copy; {new Date().getFullYear()} Airport Digital Twin • Namma Universe. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}
