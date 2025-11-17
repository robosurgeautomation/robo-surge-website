import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Zap, Workflow, Sparkles, ArrowRight, CheckCircle, Target, Users, Award, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+92 321 3891041",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://localhost:3001/api/submit-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ 
          type: "success", 
          message: "✅ Demo request submitted successfully! We'll contact you soon." 
        });
        setFormData({
          name: "",
          email: "",
          phone: "+92 321 3891041",
          company: "",
          service: "",
          message: "",
        });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus({ 
          type: "error", 
          message: `❌ ${result.error || "Failed to submit form"}` 
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({ 
        type: "error", 
        message: "❌ Error submitting form. Make sure the backend server is running on http://localhost:3001" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: Bot,
      title: "AI Automation",
      description: "Intelligent automation that learns and adapts to your business needs",
      features: ["Smart decision making", "Predictive analytics", "24/7 operation"],
      useCases: [
        "Automated customer support with AI chatbots",
        "Intelligent document processing and data extraction",
        "Predictive maintenance and anomaly detection",
      ],
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Streamline your processes with custom automated workflows",
      features: ["Process optimization", "Integration ready", "Error reduction"],
      useCases: [
        "End-to-end invoice and payment processing",
        "Multi-system data synchronization",
        "Automated reporting and notifications",
      ],
    },
    {
      icon: Sparkles,
      title: "AI Tools Suite",
      description: "Comprehensive suite of AI-powered tools for modern businesses",
      features: ["Data processing", "Content generation", "Task automation"],
      useCases: [
        "AI-powered content creation and optimization",
        "Smart data analytics and insights",
        "Automated email and communication management",
      ],
    },
  ];

  const benefits = [
    "Reduce operational costs by up to 60%",
    "Increase productivity by 3x",
    "Minimize human errors",
    "Scale operations effortlessly",
    "Real-time insights & analytics",
    "24/7 automated operations",
  ];

  const whyChoose = [
    {
      icon: Target,
      title: "Precision & Accuracy",
      description: "99.9% accuracy in automated tasks with continuous learning and improvement",
    },
    {
      icon: TrendingUp,
      title: "Cost Efficiency",
      description: "Reduce operational costs by up to 60% while increasing output quality",
    },
    {
      icon: Zap,
      title: "Speed & Scale",
      description: "Process thousands of tasks in minutes, scaling effortlessly with your growth",
    },
    {
      icon: Award,
      title: "Enterprise Ready",
      description: "Built for businesses of all sizes with enterprise-grade security and support",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
        <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
        
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              AI Automation &{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Smart Workflows
              </span>{" "}
              for Modern Businesses
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your business operations with intelligent automation. Save time, reduce costs, 
              and scale effortlessly with AI-powered solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="#contact">
                <Button size="lg" className="w-full sm:w-auto shadow-glow group">
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Services
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-6 justify-center pt-8">
              {benefits.slice(0, 3).map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                About Robo Surge
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Robo Surge, we specialize in delivering cutting-edge AI automation and workflow solutions 
                that empower businesses to operate smarter, faster, and more efficiently. Our mission is to 
                eliminate repetitive tasks, reduce operational costs, and enable teams to focus on what truly 
                matters innovation and growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {whyChoose.map((item, index) => (
                <Card key={index} className="glass-card text-center p-6 hover:shadow-glow transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI and automation solutions designed to transform your business operations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="glass-card shadow-card hover:shadow-glow transition-all duration-300 group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-sm mb-3 text-foreground">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-3 text-foreground">Use Cases:</h4>
                    <ul className="space-y-2">
                      {service.useCases.map((useCase, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Why Choose Robo Surge?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We combine cutting-edge AI technology with deep industry expertise to deliver 
                automation solutions that drive real business results.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="glass-card p-6 text-center shadow-card">
                <p className="text-4xl font-display font-bold text-primary mb-2">60%</p>
                <p className="text-sm text-muted-foreground">Cost Reduction</p>
              </Card>
              <Card className="glass-card p-6 text-center shadow-card">
                <p className="text-4xl font-display font-bold text-primary mb-2">3x</p>
                <p className="text-sm text-muted-foreground">Productivity Boost</p>
              </Card>
              <Card className="glass-card p-6 text-center shadow-card">
                <p className="text-4xl font-display font-bold text-primary mb-2">24/7</p>
                <p className="text-sm text-muted-foreground">Operation</p>
              </Card>
              <Card className="glass-card p-6 text-center shadow-card">
                <p className="text-4xl font-display font-bold text-primary mb-2">99%</p>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground">
                Ready to transform your business? Book a free demo and discover how we can help.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="glass-card p-6">
                <h3 className="font-display font-semibold text-xl mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a href="mailto:robosurge.automation@gmail.com" className="text-primary hover:underline">
                      robosurge.automation@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <a href="tel:+923213891041" className="text-primary hover:underline">
                      +92 321 3891041
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">WhatsApp</p>
                    <a 
                      href="https://wa.me/923213891041" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Social</p>
                    <a
                      href="https://www.linkedin.com/in/robo-surge-638a09398/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline block mt-2"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://x.com/Robo_Surge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline block mt-2"
                    >
                      @Robo_Surge
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <h3 className="font-display font-semibold text-xl mb-4">Book a Demo</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Schedule a personalized demo to see how our AI automation solutions can transform your business.
                </p>
                <a href="#contact-form">
                  <Button className="w-full shadow-glow">
                    Schedule Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </Card>
            </div>

            <Card id="contact-form" className="glass-card p-8">
              <h3 className="font-display font-semibold text-2xl mb-6">Send us a Message</h3>
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === "success" 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {submitStatus.message}
                </div>
              )}
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+92 321 3891041"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a service</option>
                    <option value="ai-automation">AI Automation</option>
                    <option value="workflow-automation">Workflow Automation</option>
                    <option value="ai-tools">AI Tools Suite</option>
                    <option value="custom">Custom Solution</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us about your automation needs..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full shadow-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Send Message"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
