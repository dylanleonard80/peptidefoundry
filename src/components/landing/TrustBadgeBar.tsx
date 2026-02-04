import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Clock, UserCheck, Flag } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    label: 'FDA-Registered Pharmacies',
  },
  {
    icon: Shield,
    label: 'HIPAA Compliant',
  },
  {
    icon: Award,
    label: '>99% Purity Verified',
  },
  {
    icon: UserCheck,
    label: 'Licensed Physicians',
  },
  {
    icon: Flag,
    label: 'U.S. Compounded',
  },
];

const TrustBadgeBar: React.FC = () => {
  return (
    <section className="relative z-10 py-8 px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="max-w-6xl mx-auto"
      >
        <div className="trust-badge-glass rounded-2xl py-6 px-4 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="flex items-center gap-2 text-white/80"
              >
                <badge.icon className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium whitespace-nowrap">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TrustBadgeBar;
