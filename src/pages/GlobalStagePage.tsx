import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Trophy, Globe, Calendar, ExternalLink, MapPin, Award, Users, Star } from "lucide-react";

const majorCompetitions = [
  {
    name: "Earth Prize",
    description: "A global eco-innovation award for teenagers whereby they can win up to $50,000 .",
    date: "Reg: Sep 2025 - Jan 2026",
    location: "Geneva, Switzerland",
    link: "https://www.theearthprize.org/",
    categories: ["All Sciences", "Mathematics", "Technology"],
  },
  {
    name: "American Computer Science League",
    description: "A non-profit organization running international online programming contests for K-12 students",
    date: "October 2025-MaY 2026",
    location: "United States",
    link: "https://www.acsl.org/",
    categories: ["Mathematics", "Problem Solving","Computer skills"],
  },
  {
    name: "Stockholm Junior Water Prize",
    description: "A global competition that honors young innovators in water-related science and engineering.",
    date: "August 2025",
    location: "Stockholm, Sweden",
    link: "https://www.siwi.org/prizes/stockholmjuniorwaterprize/",
    categories: ["Water Science", "Environmental Engineering"],
  },
  {
    name: "Microsoft Imagine Cup",
    description: "A global technology competition for student innovation in AI, cloud, and emerging tech.",
    date: "March 2025",
    location: "Virtual & USA Finals",
    link: "https://imaginecup.microsoft.com/",
    categories: ["Technology", "AI", "Software"],
  },
  {
    name: "IBBC (USA)",
    description: "The world's largest pre-college science competition.",
    date: "May 2025",
    location: "Arizona(USA)",
    link: "https://www.societyforscience.org/isef/",
    categories: ["Science", "Engineering", "Technology"],
  },
  {
  name: "Earth Prize",
    description: "A global eco-innovation award for teenagers whereby they can win up to $50,000 .",
    date: "Reg: Sep 2025 - Jan 2026",
    location: "Geneva, Switzerland",
    link: "https://www.theearthprize.org/",
    categories: ["All Sciences", "Mathematics", "Technology"],
  }
];

const stats = [
  { icon: Globe, value: "80+", label: "Countries Represented" },
  { icon: Users, value: "1700+", label: "Students at ISEF" },
  { icon: Trophy, value: "$8M+", label: "Prizes Awarded" },
  { icon: Star, value: "20+", label: "Nobel Laureates Alumni" },
];

const GlobalStagePage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
              Global Competitions
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Compete on the{" "}
              <span className="gradient-text">World Stage</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our students represent Uganda in the most prestigious international STEM competitions, 
              standing alongside the world's brightest young minds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-container bg-card/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Competitions */}
      <section className="section-container">
        <SectionHeading
          badge="Major Competitions"
          title="Where Champions Are Made"
          subtitle="These world-renowned competitions are our targets for student achievement and global recognition."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {majorCompetitions.map((comp, index) => (
            <motion.a
              key={comp.name}
              href={comp.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="glass-card h-full p-6 hover:border-primary/40 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {comp.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {comp.description}
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    {comp.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {comp.location}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {comp.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-1 rounded-md text-xs bg-muted/50 text-muted-foreground"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* World Map Section */}
      <section className="section-container bg-card/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 text-center"
        >
          <Globe className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Our Global Reach
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            From Uganda to the world stage, our students are making their mark. We're building partnerships 
            across continents to provide more opportunities for STEM excellence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["Africa", "North America", "Europe", "Asia", "Australia"].map((continent, index) => (
              <motion.span
                key={continent}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium text-sm"
              >
                {continent}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default GlobalStagePage;
