import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Rocket, CheckCircle, Sparkles, Users, Trophy, Globe } from "lucide-react";

// Components
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";

// Hooks & Utilities
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// ============================================================================
// Types & Schemas
// ============================================================================

interface Sector {
  id: string;
  name: string;
}

const applicationSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  schoolClass: z.string().trim().min(1).max(50),
  sectorIds: z.array(z.string().uuid()).min(1, "Select at least 1 sector").max(2, "Select maximum 2 sectors"),
  reasonToJoin: z.string().trim().min(20).max(2000),
});

// ============================================================================
// Constants
// ============================================================================

const benefits = [
  {
    icon: Users,
    title: "Join a Community",
    description: "Connect with like-minded STEM enthusiasts",
  },
  {
    icon: Trophy,
    title: "Compete Globally",
    description: "Represent Uganda at international competitions",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access to STEM USA and international partners",
  },
];

const initialFormData = {
  fullName: "",
  email: "",
  schoolClass: "",
  sectorId: "",
  reasonToJoin: "",
};

// ============================================================================
// Main Component
// ============================================================================

const JoinUsPage = () => {
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState(initialFormData);

  // ========================================================================
  // Effects
  // ========================================================================

  useEffect(() => {
    const fetchSectors = async () => {
      const { data, error } = await supabase
        .from("sectors")
        .select("id, name")
        .order("display_order");

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load sectors.",
          variant: "destructive",
        });
      } else {
        setSectors(data ?? []);
      }
    };

    fetchSectors();
  }, [toast]);

  // ========================================================================
  // Handlers
  // ========================================================================

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSectorChange = (value: string[]) => {
    setFormData((p) => ({ ...p, sectorId: value[0] || "" }));
    if (errors.sectorId) setErrors((p) => ({ ...p, sectorId: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = applicationSchema.safeParse(formData);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        map[err.path[0] as string] = err.message;
      });
      setErrors(map);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        full_name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        school_class: formData.schoolClass.trim(),
        sector_id: formData.sectorId, // ✅ Just the UUID string
        reason_to_join: formData.reasonToJoin.trim(),
        status: "pending",
      };

      const { error } = await supabase
        .from("members")
        .insert([payload]);

      if (error) {
        console.error("Supabase error:", error);
        toast({
          title: "Submission failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Unexpected error",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData(initialFormData);
  };

  // ========================================================================
  // Conditional UI
  // ========================================================================

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center pt-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <Button onClick={resetForm}>Submit Another</Button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  // ========================================================================
  // Render
  // ========================================================================
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden pointer-events-none">
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
              Become a <span className="gradient-text">STEM Pioneer</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Take the first step towards joining Uganda's premier STEM organization. Your
              journey to innovation and excellence starts here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              <h3 className="font-display font-semibold text-foreground mb-1">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="section-container relative z-50 isolate pointer-events-auto">
        <div className="max-w-2xl mx-auto">
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
            {/* Form Header */}
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Registration Form
                </h2>
                <p className="text-sm text-muted-foreground">Fill out the form below to apply</p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 relative z-50"
              style={{ pointerEvents: "auto" }}
            >
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`bg-muted/30 border-border/50 focus:border-primary select-text ${
                      errors.fullName ? "border-red-500" : ""
                    }`}
                    style={{ position: "relative", zIndex: 50 }}
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
                    className={`bg-muted/30 border-border/50 focus:border-primary select-text ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    style={{ position: "relative", zIndex: 50 }}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              {/* School Class and Sector */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="schoolClass">School ID / Class *</Label>
                  <Input
                    id="schoolClass"
                    name="schoolClass"
                    placeholder="e.g., S6A or Student ID"
                    value={formData.schoolClass}
                    onChange={handleInputChange}
                    className={`bg-muted/30 border-border/50 focus:border-primary select-text ${
                      errors.schoolClass ? "border-red-500" : ""
                    }`}
                    style={{ position: "relative", zIndex: 50 }}
                  />
                  {errors.schoolClass && (
                    <p className="text-sm text-red-500">{errors.schoolClass}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sectorId">Sector of Interest *</Label>
                  <MultiSelect
                    options={sectors.map((sector) => ({
                      label: sector.name,
                      value: sector.id,
                    }))}
                    onValueChange={handleSectorChange}
                    defaultValue={formData.sectorId ? [formData.sectorId] : []}
                    placeholder="Select a sector"
                    maxCount={1}
                    className={errors.sectorId ? "border-red-500" : ""}
                  />
                  {errors.sectorId && <p className="text-sm text-red-500">{errors.sectorId}</p>}
                </div>
              </div>

              {/* Reason to Join */}
              <div className="space-y-2">
                <Label htmlFor="reasonToJoin">Why do you want to join? *</Label>
                <Textarea
                  id="reasonToJoin"
                  name="reasonToJoin"
                  placeholder="Tell us about your interest in STEM and what you hope to achieve..."
                  value={formData.reasonToJoin}
                  onChange={handleInputChange}
                  rows={5}
                  className={`bg-muted/30 border-border/50 focus:border-primary resize-none select-text ${
                    errors.reasonToJoin ? "border-red-500" : ""
                  }`}
                  style={{ position: "relative", zIndex: 50 }}
                />
                {errors.reasonToJoin && <p className="text-sm text-red-500">{errors.reasonToJoin}</p>}
              </div>

              {/* Submit Button */}
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

            {/* Terms */}
            <p className="mt-6 text-xs text-muted-foreground text-center relative z-10">
              By submitting this form, you agree to our terms and conditions. We'll contact you
              via email with next steps.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JoinUsPage;