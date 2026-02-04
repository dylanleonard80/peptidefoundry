import { 
  Shield, Activity, Target, Users, Zap, Brain, Heart, Flame, TrendingDown, 
  Droplets, Bone, Workflow, Signal, Sparkles, Eye, Moon, Sun, Pill, Syringe, 
  TestTube, Dna, Atom, Beaker, CircleDot, Gauge, LineChart, Layers, Clock, 
  BarChart3, Leaf, Dumbbell, Utensils, CheckCircle, Ban, TrendingUp, Baby, 
  Waves, Apple, Scale, Battery, Lightbulb, Smile, LucideIcon
} from "lucide-react";

// Central icon mapping
const iconComponents: Record<string, LucideIcon> = {
  Shield, Activity, Target, Users, Zap, Brain, Heart, Flame, TrendingDown,
  Droplets, Bone, Workflow, Signal, Sparkles, Eye, Moon, Sun, Pill, Syringe,
  TestTube, Dna, Atom, Beaker, CircleDot, Gauge, LineChart, Layers, Clock,
  BarChart3, Leaf, Dumbbell, Utensils, CheckCircle, Ban, TrendingUp, Baby,
  Waves, Apple, Scale, Battery, Lightbulb, Smile
};

interface IconOptions {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-6 h-6", 
  lg: "w-8 h-8 text-primary"
};

export const getIcon = (iconName: string, options: IconOptions = {}): React.ReactNode => {
  const { size = 'sm', className = '' } = options;
  const IconComponent = iconComponents[iconName];
  
  if (!IconComponent) {
    return <Activity className={`${sizeClasses[size]} ${className}`} />;
  }
  
  return <IconComponent className={`${sizeClasses[size]} ${className}`} />;
};

// Pre-built icon maps for backward compatibility during transition
export const getSmallIcon = (iconName: string): React.ReactNode => getIcon(iconName, { size: 'sm' });
export const getLargeIcon = (iconName: string): React.ReactNode => getIcon(iconName, { size: 'lg' });
