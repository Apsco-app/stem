import { motion } from "framer-motion";
import { Target, Users, Globe, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const features = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Fostering innovation and critical thinking through hands-on STEM experiences.",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Students work together across disciplines to solve real-world problems.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Connected with STEM USA and expanding to Asia for international opportunities.",
  },
  {
    icon: Award,
    title: "Competition Ready",
    description: "Preparing students for Regeneron ISEF, Olympiads, and more.",
  },
];

export function AboutSection() {
  return (
    <section className="section-container relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative">
        <SectionHeading
          badge="About Us"
          title="Shaping Tomorrow's Innovators"
          subtitle="At UMSSN STEM Club, we believe every student has the potential to change the world through science and technology."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <GlassCard key={feature.title} delay={index * 0.1}>
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Partnership Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-card p-8 md:p-12 text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Global Partnerships
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Proudly linked with <span className="text-primary font-semibold">STEM USA</span>, 
            with ambitions to connect with STEM organizations in India, South Korea, Japan, and China.
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["STEM USA", "STEM India", "STEM Japan", "STEM Korea"].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`px-6 py-3 rounded-lg border ${
                  index === 0
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-muted/30 border-border/50 text-muted-foreground"
                }`}
              >
                <span className="font-display font-semibold text-sm">{partner}</span>
                {index !== 0 && (
                  <span className="ml-2 text-xs opacity-60">(Coming Soon)</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
