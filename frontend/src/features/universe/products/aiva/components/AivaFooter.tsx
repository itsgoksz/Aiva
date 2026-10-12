import { Link } from "react-router-dom";

export default function AivaFooter() {
  return (
    <footer className="py-14 border-t border-white/[0.06]" style={{ backgroundColor: "#0E070C" }}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#A66B8E] text-white font-black flex items-center justify-center font-mono text-sm shadow-md">
              A
            </div>
            <div>
              <span className="font-bold tracking-tight text-lg text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Aiva
              </span>
              <span className="text-xs text-white/40 block font-mono">
                The Autonomous Business Teammate • Namma Universe
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-mono text-white/50">
            <Link to="/#products" className="hover:text-white transition-colors">Products</Link>
            <Link to="/products/wellora" className="hover:text-[#2ECC71] transition-colors">Wellora</Link>
            <Link to="/products/casamoto" className="hover:text-[#FF6B00] transition-colors">CasaMoto</Link>
            <Link to="/products/ev-copilot" className="hover:text-[#6D5EF7] transition-colors">EV Copilot</Link>
            <Link to="/products/airport-digital-twin" className="hover:text-[#00E5FF] transition-colors">Airport Twin</Link>
            <Link to="/#philosophy" className="hover:text-white transition-colors">Philosophy</Link>
            <Link to="/login" className="hover:text-white transition-colors">Sign in</Link>
          </div>

          <div className="text-xs font-mono text-white/30 text-center md:text-right">
            &copy; {new Date().getFullYear()} Aiva • Namma Universe. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
