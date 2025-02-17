// src/components/common/Logo.tsx
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src="/logo1.png" alt="Tadweer" className="w-auto h-10" />
      <span className="text-2xl font-bold text-[#5F7053]">Tadweer</span>
    </Link>
  );
};

export default Logo;