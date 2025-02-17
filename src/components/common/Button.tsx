// src/components/common/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
  }
  
  const Button = ({ 
    variant = 'primary', 
    children, 
    className = '', 
    ...props 
  }: ButtonProps) => {
    const baseStyles = "px-4 py-2 rounded-full font-medium transition-all";
    const variants = {
      primary: "bg-[#5F7053] text-white hover:bg-[#5F7053]/90",
      secondary: "bg-white text-[#5F7053] border-2 border-[#5F7053] hover:bg-[#5F7053]/5"
    };
  
    return (
      <button 
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;