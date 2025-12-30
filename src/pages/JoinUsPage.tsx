import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
// import { GlassCard } from "@/components/ui/GlassCard"; // Temporarily commented out to fix click issue
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { useToast } from "@/hooks/use-toast";
import { Rocket, CheckCircle, Sparkles, Users, Trophy, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  schoolClass: z.string().trim().min(1, "School ID/Class is required").max(50, "School ID must be less than 50 characters"),
  sectorIds: z.array(z.string().uuid()).min(1, "Please select at least one sector").max(2, "You can select a maximum of two sectors"),
  motivation: z.string().trim().min(20, "Please write at least 20 characters").max(2000, "Motivation must be less than 2000 characters"),
});

interface Sector {
  id: string;
  name: string;
}

const benefits = [
  { icon: Users, title: "Join a Community", description: "Connect with like-minded STEM enthusiasts" },
  { icon: Trophy, title: "Compete Globally", description: "Represent Uganda at international competitions" },
  { icon: Globe, title: "Global Network", description: "Access to STEM USA and international partners" },
];

const JoinUsPage = () => {
  console.log("JoinUsPage rendered or remounted");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    schoolClass: "",
    sectorIds: [],
    motivation: "",
  });

  useEffect(() => {
    console.log("Sectors effect is running");
    const fetchSectors = async () => {
      const { data, error } = await supabase
        .from("sectors")
        .select("id, name")
        .order("display_order");
      
      if (error) {
        console.error("Error fetching sectors:", error);
        toast({
          title: "Error",
          description: "Failed to load sectors. Please refresh the page.",
          variant: "destructive",
        });
      } else {
        setSectors(data || []);
      }
    };

    fetchSectors();
  }, [toast]);

  useEffect(() => {
    console.log("formData changed:", formData);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit pressed"); // Debug log
    setErrors({});

    const result = applicationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("members").insert({
        full_name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        school_class: formData.schoolClass.trim(),
        sector_interest: formData.sectorIds,
        motivation: formData.motivation.trim(),
        status: "pending",
      });

      if (error) {
        console.error("Submission error:", error);
        toast({
          title: "Submission already exists",
          description: "You cannot send an application more than once,please contact Jeremie incase you want to send another one",
          variant: "destructive",
        });
      } else {
        setIsSubmitted(true);
        toast({
          title: "Application Submitted!",
          description: "We'll review your application and get back to you soon.",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // If you see this log, the input is working!
    console.log("handleInputChange called for:", name, "with value:", value);
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Application Submitted!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your interest in joining UMSSN STEM Club. We'll review your application 
              and contact you soon.
            </p>
            <Button variant="hero" onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: "",
                email: "",
                schoolClass: "",
                sectorIds: [],
                motivation: "",
              });
            }}>
              Submit Another Application
            </Button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden pointer-events-none">
        {/* Background blobs are now strictly pointer-events-none */}
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
              Join the Club
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Become a{" "}
              <span className="gradient-text">STEM Pioneer</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Take the first step towards joining Uganda's premier STEM organization. 
              Your journey to innovation and excellence starts here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      {/* NUCLEAR OPTION: High Z-Index, Isolation, and bypassing GlassCard */}
      <section className="section-container relative z-50 isolate pointer-events-auto">
        <div className="max-w-2xl mx-auto">
          
          {/* REPLACED GLASSCARD WITH STANDARD DIV TO FIX CLICK ISSUE */}
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">Registration Form</h2>
                <p className="text-sm text-muted-foreground">Fill out the form below to apply</p>
              </div>
            </div>

            <form 
              onSubmit={handleSubmit} 
              className="space-y-6 relative z-50"
              style={{ pointerEvents: 'auto' }} // Inline style force override
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`bg-muted/30 border-border/50 focus:border-primary select-text ${errors.fullName ? "border-red-500" : ""}`}
                    style={{ position: 'relative', zIndex: 50 }}
                  />
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`bg-muted/30 border-border/50 focus:border-primary select-text ${errors.email ? "border-red-500" : ""}`}
                    style={{ position: 'relative', zIndex: 50 }}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="schoolClass">School ID / Class *</Label>
                  <Input
                    id="schoolClass"
                    name="schoolClass"
                    placeholder="e.g., S6A or Student ID"
                    value={formData.schoolClass}
                    onChange={handleInputChange}
                    className={`bg-muted/30 border-border/50 focus:border-primary select-text ${errors.schoolClass ? "border-red-500" : ""}`}
                    style={{ position: 'relative', zIndex: 50 }}
                  />
                  {errors.schoolClass && <p className="text-sm text-red-500">{errors.schoolClass}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sectorIds">Sector of Interest (Max 2) *</Label>
                  <MultiSelect
                    options={sectors.map(sector => ({ label: sector.name, value: sector.id }))}
                    onValueChange={(value) => {
                      setFormData({ ...formData, sectorIds: value });
                      if (errors.sectorIds) {
                        setErrors({ ...errors, sectorIds: "" });
                      }
                    }}
                    defaultValue={formData.sectorIds}
                    placeholder="Select up to two sectors"
                    maxCount={2}
                    className={`${errors.sectorIds ? "border-red-500" : ""}`}
                  />
                  {errors.sectorIds && <p className="text-sm text-red-500">{errors.sectorIds}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to join? *</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  placeholder="Tell us about your interest in STEM and what you hope to achieve..."
                  value={formData.motivation}
                  onChange={handleInputChange}
                  rows={5}
                  className={`bg-muted/30 border-border/50 focus:border-primary resize-none select-text ${errors.motivation ? "border-red-500" : ""}`}
                  style={{ position: 'relative', zIndex: 50 }}
                />
                {errors.motivation && <p className="text-sm text-red-500">{errors.motivation}</p>}
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full relative z-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Rocket className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
            
            <p className="mt-6 text-xs text-muted-foreground text-center relative z-10">
              By submitting this form, you agree to our terms and conditions. 
              We'll contact you via email with next steps.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JoinUsPage;