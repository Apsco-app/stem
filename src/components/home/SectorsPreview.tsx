import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Cpu, Building, Droplets, Calculator, Hammer } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";

const sectors = [
  {
    id: "sustainability",
    name: "Sustainability",
    head: "Eng. Womuhayi Conrad",
    icon: Leaf,
    color: "from-emerald-500 to-green-600",
    description: "Eco-friendly innovations and sustainable engineering solutions.",
  },
  {
    id: "technology",
    name: "Technology",
    head: "Eng. Nkono Jeremie",
    icon: Cpu,
    color: "from-primary to-secondary",
    description: "Cutting-edge tech projects from AI to robotics.",
  },
  {
    id: "bridge-building",
    name: "Bridge Building",
    head: "Eng. Wasswa Paul",
    icon: Hammer,
    color: "from-orange-500 to-amber-600",
    description: "Structural engineering and architectural design challenges.",
  },
  {
    id: "aqualibrium",
    name: "Aqualibrium",
    head: "Dr. Aris Semujju Favor",
    icon: Droplets,
    color: "from-blue-500 to-cyan-500",
    description: "Water conservation and hydraulic engineering projects.",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    head: "Eng. Aliwali",
    icon: Calculator,
    color: "from-violet-500 to-purple-600",
    description: "Mathematical olympiads and computational challenges.",
  },
];

export function SectorsPreview() {
  return (
    <section className="section-container bg-card/50 relative overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative">
        <SectionHeading
          badge="Our Sectors"
          title="Five Pillars of Innovation"
          subtitle="Explore our specialized sectors, each led by dedicated engineers and scientists pushing the boundaries of STEM."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link to={`/sectors#${sector.id}`} className="block">
                <div className="glass-card h-full p-6 transition-all duration-300 hover:border-primary/40">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sector.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <sector.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    {sector.name}
                  </h3>
                  <p className="text-sm text-primary mb-3">{sector.head}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {sector.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/sectors">
              View All Sectors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
