import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Leaf, Cpu, Building, Droplets, Calculator, User, Calendar, FileText, HammerIcon } from "lucide-react";

const sectors = [
  {
    id: "sustainability",
    name: "Sustainability Sector",
    head: "Eng. Womuhayi Conrad",
    icon: Leaf,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-500/10",
    description: "The Sustainability Sector focuses on eco-friendly innovations and sustainable engineering solutions. We tackle climate change, renewable energy, and environmental conservation through innovative projects.",
    competitions: [
      { name: "Pitch for the Future",date: "May-Oct 2025" },
      { name: "The Earth Prize",  date: "September 2025-January 2026" },
      { name: "Oxford SAID Climate Challenge", date: "January 2025-November 2025" },
      { name: "Xylem & Egis",date: "Apr-Jun 2025" },
    ],
    focus: ["Renewable Energy", "Waste Management", "Conservation", "Green Technology"],
  },
  {
    id: "technology",
    name: "Technology Sector",
    head: "Eng. Nkono Jeremie",
    icon: Cpu,
    color: "from-primary to-secondary",
    bgColor: "bg-primary/10",
    description: "The Technology Sector explores cutting-edge innovations from artificial intelligence to robotics. We prepare students for the digital future through hands-on projects and competitions.",
    competitions: [
      { name: "ACSL(American Computer Science League)", date: "October 2025- May 2026" },
      { name: "ICSC", date: "Qualification:Aug-Sept 2025 and Finals:Nov 2025" },
      { name: "Langflow AI Hackathon", date: "Aug-Sept 2025" },
    ],
    focus: ["Artificial Intelligence", "Robotics", "Software Development"],
  },
  {
    id: "bridge-building",
    name: "Bridge Building Sector",
    head: "Eng. Wasswa Paul",
    icon: HammerIcon,
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-500/10",
    description: "The Bridge Building Sector focuses on structural engineering and architectural design challenges. Students learn to design, build, and test load-bearing structures.",
    competitions: [
      { name: "SAICE Bridge Building (Johannesbourg)", date: "August 2025" },
      { name: "IBBC(USA)", date: "March-April 2025" },
    ],
    focus: ["Structural Engineering", "Load Analysis", "Material Science", "CAD Design"],
  },
  {
    id: "aqualibrium",
    name: "Aqualibrium Sector",
    head: "Dr. Aris Semujju Favor",
    icon: Droplets,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    description: "The Aqualibrium Sector specializes in water conservation and hydraulic engineering projects. We address water scarcity and develop innovative water management solutions.",
    competitions: [
      { name: "SAICE Aquilibrium", date: "May 2025" },
      { name: "Stockholm Junior Water Prize", date: "June-August 2025" },
      { name: "ISEF", date: "May 2025" },
      { name: "imagine Cup (Microsoft)",date: "Jan-May 2025" },
      { name: "iGEM",date: "Oct 2025" },
      { name: "UNESCO World Water Day Contest & AquaChallenge",date: "March-varying 2025" },
    ],
    focus: ["Water Conservation", "Hydraulic Systems",  "Sustainable Irrigation"],
  },
  {
    id: "mathematics",
    name: "Mathematics Sector",
    head: "Eng. Aliwali",
    icon: Calculator,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10",
    description: "The Mathematics Sector prepares students for mathematical olympiads and computational challenges. We develop problem-solving skills and mathematical thinking.",
    competitions: [
      { name: "AMC 8/10/12", date: "AMC8: Jan 2026; AMC10/12: Nov 2025" },
      { name: "IYMC 2025", date: "Finals:Nov-Dec 2025" },
      { name: "Math Kangaroo", date: "March 2026" },
      { name: "SMT(Stanford) & FISO",date: "SMT:Apr 2025; FISO:Dec -March 2026" },
      { name: "Path to IMO 2026",date: "Nov-Apr 2026; IMO: Jul 2026" },
    ],
    focus: ["Number Theory", "Geometry", "Algebra"],
  },
];

const SectorsPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
              Specialized Sectors
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Five Pillars of{" "}
              <span className="gradient-text">STEM Excellence</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Each sector is led by dedicated engineers and scientists who guide students 
              through hands-on projects and international competitions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section-container">
        <div className="space-y-16">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              id={sector.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="scroll-mt-24"
            >
              <div className="glass-card overflow-hidden">
                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <sector.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                        {sector.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-2 text-primary">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{sector.head}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                    {sector.description}
                  </p>

                  {/* Focus Areas */}
                  <div className="mb-8">
                    <h4 className="font-display font-semibold text-foreground mb-3">Focus Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {sector.focus.map((area) => (
                        <span
                          key={area}
                          className={`px-3 py-1.5 rounded-lg text-sm ${sector.bgColor} text-foreground border border-border/50`}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Competitions */}
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-4">Upcoming Competitions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {sector.competitions.map((comp) => (
                        <div
                          key={comp.name}
                          className="p-4 rounded-xl bg-muted/30 border border-border/50"
                        >
                          <div className="flex items-center gap-2 text-xs text-primary mb-2">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{comp.date}</span>
                          </div>
                          <p className="text-sm font-medium text-foreground">{comp.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default SectorsPage;
