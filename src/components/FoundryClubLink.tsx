import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FoundryClubTransition from './FoundryClubTransition';

interface FoundryClubLinkProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const FoundryClubLink = ({ children, className, style, onClick }: FoundryClubLinkProps) => {
  const [showTransition, setShowTransition] = useState(false);
  const navigate = useNavigate();

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    setShowTransition(true);
  }, [onClick]);

  const handleTransitionComplete = useCallback(() => {
    navigate('/foundry-club');
    setShowTransition(false);
  }, [navigate]);

  return (
    <>
      <button onClick={handleClick} className={className} style={style}>
        {children}
      </button>
      <FoundryClubTransition 
        isActive={showTransition} 
        onComplete={handleTransitionComplete} 
      />
    </>
  );
};

export default FoundryClubLink;
