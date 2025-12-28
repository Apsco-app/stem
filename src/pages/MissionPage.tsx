import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Target, Eye, Rocket, Globe, Award, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Innovation",
    description: "Pushing boundaries through creative problem-solving and cutting-edge technology.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working together across disciplines to achieve extraordinary results.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Striving for the highest standards in everything we do.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Making a difference that extends beyond borders.",
  },
];



const MissionPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
              Our Mission
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Empowering the Next Generation of{" "}
              <span className="gradient-text">Innovators</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              UMSSN STEM Club empowers students in Science, Technology, Engineering, and Mathematics 
              through innovation and global competition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-container bg-card/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassCard className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To be Africa's leading STEM organization, nurturing world-class scientists, engineers, 
              and innovators who compete globally and solve humanity's greatest challenges.
            </p>
          </GlassCard>

          <GlassCard className="p-8" delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <Rocket className="h-7 w-7 text-white" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To provide students with hands-on STEM experiences, mentorship from industry professionals, 
              and opportunities to compete on the international stage.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Values */}
      <section className="section-container">
        <SectionHeading
          badge="Core Values"
          title="What Drives Us"
          subtitle="Our values guide everything we do, from daily activities to international competitions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <GlassCard key={value.title} delay={index * 0.1} className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      

      {/* Quote */}
      <section className="section-container">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-relaxed">
            "The future belongs to those who believe in the beauty of their{" "}
            <span className="gradient-text">dreams</span>."
          </p>
          <footer className="mt-6 text-muted-foreground">
            — Inspired by Eleanor Roosevelt
          </footer>
        </motion.blockquote>
      </section>
    </Layout>
  );
};

export default MissionPage;
