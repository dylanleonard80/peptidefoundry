import React from 'react';
import { motion } from 'framer-motion';
import { FileText, UserCheck, Package, Home } from 'lucide-react';

const timelineSteps = [
  {
    day: 'Day 1',
    icon: FileText,
    title: 'Apply',
    description: '5-minute intake form',
  },
  {
    day: 'Day 1-2',
    icon: UserCheck,
    title: 'Review',
    description: 'Physician evaluates',
  },
  {
    day: 'Day 2',
    icon: Package,
    title: 'Ship',
    description: 'Prescription fulfilled',
  },
  {
    day: 'Day 4',
    icon: Home,
    title: 'Receive',
    description: 'Peptides at your door',
  },
];

const ProcessTimeline: React.FC = () => {
  return (
    <section id="how-it-works" className="section-premium px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4 heading-luxury">
            How It Works
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Your journey to optimized health, simplified
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connector Line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 timeline-connector" />

          <div className="grid grid-cols-4 gap-8 relative">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 1 }}
                className="flex flex-col items-center text-center"
              >
                {/* Day Badge */}
                <div className="bg-gold/20 border border-gold/40 rounded-full px-4 py-1 mb-4">
                  <span className="text-gold text-sm font-semibold">{step.day}</span>
                </div>

                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-6 relative z-10">
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-6">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="landing-glass p-6 rounded-xl flex items-center gap-4"
            >
              {/* Day Badge */}
              <div className="flex-shrink-0">
                <div className="bg-gold/20 border border-gold/40 rounded-full px-3 py-1">
                  <span className="text-gold text-xs font-semibold">{step.day}</span>
                </div>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                <step.icon className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-full px-6 py-3">
            <span className="text-gold text-lg font-semibold">Application to delivery in just 4 days</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
