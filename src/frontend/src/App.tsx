import FeedbackWidget from "@/components/FeedbackWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowLeft,
  Award,
  CheckCircle2,
  ChevronDown,
  Flame,
  Globe,
  Leaf,
  Loader2,
  Menu,
  Package,
  Star,
  Truck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Product } from "./backend";
import { useSubmitInquiry } from "./hooks/useQueries";

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ onNavigateToQuote }: { onNavigateToQuote: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", ocid: "nav.home.link" },
    { label: "Products", href: "#products", ocid: "nav.products.link" },
    { label: "About", href: "#about", ocid: "nav.about.link" },
    { label: "Contact", href: "#contact", ocid: "nav.contact.link" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.18_0.04_155/0.97)] backdrop-blur-md shadow-warm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <img
            src="/assets/uploads/trader-logo-1.jpg"
            alt="AHA Traders Logo"
            className="w-10 h-10 rounded-full object-cover shadow-warm"
          />
          <span className="font-display text-xl font-bold tracking-tight text-white">
            AHA <span className="text-accent">Traders</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.ocid}
              href={link.href}
              data-ocid={link.ocid}
              className="text-sm font-medium text-white/80 hover:text-accent transition-colors duration-200 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <Button
            size="sm"
            data-ocid="nav.quote.button"
            onClick={onNavigateToQuote}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
          >
            Get a Quote
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[oklch(0.18_0.04_155)] border-t border-white/10"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.ocid}
                  href={link.href}
                  data-ocid={link.ocid}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-2 text-white/80 hover:text-accent font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onNavigateToQuote();
                }}
                className="mt-2 py-3 px-4 bg-accent text-accent-foreground font-semibold rounded-lg text-sm text-left"
              >
                Get a Quote
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ onNavigateToQuote }: { onNavigateToQuote: () => void }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1200x600.jpg')",
        }}
      />
      {/* Deep overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.14_0.06_155/0.88)] via-[oklch(0.16_0.05_140/0.80)] to-[oklch(0.12_0.04_60/0.70)]" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 text-xs tracking-widest uppercase font-semibold px-4 py-1.5">
            Global Export Excellence
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Bringing the World
            <br />
            <span className="text-accent italic">the Finest</span> Dried Flavors
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            AHA Traders exports premium dried vegetables, spices, pickles, and
            our signature Dried Green Chilly Powder to discerning buyers across
            the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#products">
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8 py-6 shadow-warm-lg"
              >
                Explore Our Products
              </Button>
            </a>
            <Button
              data-ocid="hero.quote_button"
              variant="outline"
              size="lg"
              onClick={onNavigateToQuote}
              className="border-white/40 text-white bg-white/10 hover:bg-white/20 text-base px-8 py-6"
            >
              Request a Quote
            </Button>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "50+", label: "Countries Served" },
            { value: "15+", label: "Years Experience" },
            { value: "200+", label: "Trusted Buyers" },
            { value: "4", label: "Product Categories" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4 text-center"
            >
              <div className="font-display text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-white/60 text-xs mt-1 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}

// ── Products ──────────────────────────────────────────────────────────────────
const products = [
  {
    ocid: "products.item.1",
    title: "Dried Vegetables",
    description:
      "Sun-dried and dehydrated premium vegetable products including carrots, onions, bitter gourd and much more -- retaining full nutrition and natural flavor for culinary excellence worldwide.",
    image: "/assets/generated/product-dried-veg.dim_600x400.jpg",
    badge: null,
    price: "₹950 / kg",
    featured: false,
  },
  {
    ocid: "products.item.2",
    title: "Dry Ginger Items",
    description:
      "Whole dried ginger, ginger slices, and ginger powder sourced from the finest farms. Known for their pungency and medicinal value, exported to food processors and spice traders globally.",
    image: "/assets/generated/product-dry-ginger.dim_600x400.jpg",
    badge: null,
    price: "₹350 / kg",
    featured: false,
  },
  {
    ocid: "products.item.3",
    title: "Pickles",
    description:
      "Authentic traditionally-crafted pickles — mango, lime, mixed vegetables, and more — made with natural oils and spices. Shelf-stable and export-ready with international food safety compliance.",
    image: "/assets/uploads/pkl-1.jpg",
    badge: null,
    price: "from ₹900 / kg",
    featured: false,
  },
  {
    ocid: "products.item.4",
    title: "Dried Green Chilly Powder",
    description:
      "Our crown jewel — a rare and distinctive spice crafted from hand-selected green chilies, slow-dried and milled to a vibrant powder. Intense heat, unique green aroma, and unmatched flavor depth. Loved by chefs and food manufacturers worldwide.",
    image: "/assets/generated/product-green-chilly.dim_600x400.jpg",
    badge: "Signature Product",
    price: "₹2000 / kg",
    featured: true,
  },
];

function Products({ onPicklesClick }: { onPicklesClick: () => void }) {
  return (
    <section id="products" className="py-24 bg-[oklch(0.95_0.015_80)]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs tracking-widest uppercase font-semibold">
            What We Export
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Product Range
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four categories of premium, naturally-processed products that reach
            kitchens and food manufacturers across 50+ countries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.ocid}
              data-ocid={product.ocid}
              onClick={product.title === "Pickles" ? onPicklesClick : undefined}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl overflow-hidden group ${
                product.featured
                  ? "ring-2 ring-accent shadow-warm-lg md:col-span-2 xl:col-span-1"
                  : "shadow-warm"
              } ${product.title === "Pickles" ? "cursor-pointer hover:ring-2 hover:ring-primary/50" : ""}`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {product.featured && (
                  <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-warm">
                    <Star className="w-3 h-3 fill-current" />
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div
                className={`p-5 ${
                  product.featured
                    ? "bg-[oklch(0.22_0.07_155)] text-white"
                    : "bg-card"
                }`}
              >
                <h3
                  className={`font-display text-xl font-bold mb-2 ${
                    product.featured ? "text-accent" : "text-foreground"
                  }`}
                >
                  {product.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    product.featured ? "text-white/75" : "text-muted-foreground"
                  }`}
                >
                  {product.description}
                </p>
                <div
                  className={`mt-3 text-sm font-bold ${product.featured ? "text-foreground" : "text-foreground"}`}
                >
                  {product.price}
                </div>
                {product.featured && (
                  <div className="mt-4 flex items-center gap-2 text-accent text-xs font-semibold">
                    <Flame className="w-4 h-4" />
                    Exclusively crafted by AHA Traders
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/assets/generated/product-dried-veg.dim_600x400.jpg"
                alt="Dried vegetables"
                className="rounded-2xl w-full h-52 object-cover shadow-warm"
              />
              <img
                src="/assets/generated/product-green-chilly.dim_600x400.jpg"
                alt="Green chilly powder"
                className="rounded-2xl w-full h-52 object-cover shadow-warm mt-8"
              />
            </div>
            {/* Floating tag */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[oklch(0.22_0.07_155)] text-white rounded-2xl px-6 py-3 shadow-warm-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              <span className="font-display font-bold text-sm">
                Trusted Globally Since 2009
              </span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs tracking-widest uppercase font-semibold">
              Our Story
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Rooted in Tradition,
              <br />
              <span className="text-primary italic">Grown for the World</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              AHA Traders was founded with a singular mission: to bring India's
              finest dried produce to the global market. Based in the heart of
              India's agricultural belt, we work directly with farmers to source
              the highest quality vegetables, ginger, and chilies.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              Our natural dehydration processes preserve the nutrients, color,
              aroma, and taste of every product. No artificial preservatives. No
              compromise. Just pure, honest produce ready for international
              culinary use.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Today, we proudly serve food manufacturers, spice traders, and
              institutional buyers across Asia, Europe, the Middle East, North
              America, and beyond.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "FSSAI Certified",
                "ISO 22000",
                "Export Quality",
                "Natural Processing",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Why Choose Us ─────────────────────────────────────────────────────────────
const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Every product undergoes rigorous quality checks. We source from trusted farms and maintain strict grading standards before export.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Our logistics network spans 50+ countries. We handle all customs documentation, phytosanitary certificates, and export compliance.",
  },
  {
    icon: Leaf,
    title: "Natural Processing",
    description:
      "Zero artificial preservatives or additives. Our time-honored dehydration methods lock in nutrients and authentic flavor profiles.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "Consistent, on-time shipments with bulk order flexibility. MOQs tailored for importers and food manufacturers of all sizes.",
  },
];

function WhyChooseUs() {
  return (
    <section className="py-24 bg-[oklch(0.20_0.07_155)]">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 text-xs tracking-widest uppercase font-semibold">
            Why AHA Traders
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            The AHA Difference
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            We don't just sell products — we build long-term partnerships with
            buyers who demand consistent quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/30 transition-colors">
                <feat.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                {feat.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    productInterest: "" as Product | "",
    message: "",
  });

  const { mutate, isPending, isSuccess, isError, reset } = useSubmitInquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.productInterest) {
      toast.error("Please select a product interest.");
      return;
    }
    mutate(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        productInterest: form.productInterest as Product,
      },
      {
        onSuccess: () => {
          toast.success(
            "Inquiry submitted! We'll contact you within 24 hours.",
          );
          setForm({
            name: "",
            email: "",
            phone: "",
            productInterest: "",
            message: "",
          });
        },
        onError: () => {
          toast.error(
            "Something went wrong. Please try again or email us directly.",
          );
        },
      },
    );
  };

  return (
    <section id="contact" className="py-24 bg-[oklch(0.95_0.015_80)]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs tracking-widest uppercase font-semibold">
              Get in Touch
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Start Your
              <br />
              <span className="text-primary italic">Export Inquiry</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Whether you're a large-scale food manufacturer, an importer, or a
              distributor, we'd love to discuss how AHA Traders can supply your
              needs. Send us an inquiry and our team will respond within 24
              hours.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: Package,
                  label: "Bulk Orders Welcome",
                  sub: "MOQ flexible for all product categories",
                },
                {
                  icon: Globe,
                  label: "Worldwide Shipping",
                  sub: "Sea freight, air freight & door-to-door",
                },
                {
                  icon: Award,
                  label: "Certified Quality",
                  sub: "FSSAI, ISO 22000, Phytosanitary documentation",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {item.label}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-warm-lg border border-border">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    data-ocid="contact.success_state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-4" />
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      Inquiry Submitted!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Our team will reach out to you within 24 hours.
                    </p>
                    <Button variant="outline" onClick={reset}>
                      Send Another Inquiry
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-sm font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          data-ocid="contact.input"
                          placeholder="John Smith"
                          value={form.name}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, name: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="email"
                          className="text-sm font-semibold"
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          data-ocid="contact.email.input"
                          placeholder="john@company.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, email: e.target.value }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm font-semibold">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        data-ocid="contact.phone.input"
                        placeholder="+1 234 567 8900"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm font-semibold">
                        Product Interest *
                      </Label>
                      <Select
                        value={form.productInterest}
                        onValueChange={(val) =>
                          setForm((p) => ({
                            ...p,
                            productInterest: val as Product,
                          }))
                        }
                        required
                      >
                        <SelectTrigger data-ocid="contact.select">
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Product.driedVegetables}>
                            Dried Vegetables
                          </SelectItem>
                          <SelectItem value={Product.driedGinger}>
                            Dry Ginger Items
                          </SelectItem>
                          <SelectItem value={Product.pickles}>
                            Pickles
                          </SelectItem>
                          <SelectItem value={Product.driedGreenChillyPowder}>
                            Dried Green Chilly Powder ★ Signature
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        className="text-sm font-semibold"
                      >
                        Message / Requirements
                      </Label>
                      <Textarea
                        id="message"
                        data-ocid="contact.textarea"
                        placeholder="Describe your requirements, quantities, target markets..."
                        rows={4}
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value }))
                        }
                      />
                    </div>

                    {isError && (
                      <div
                        data-ocid="contact.error_state"
                        className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-4 py-3 rounded-lg"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        Submission failed. Please try again or contact us
                        directly.
                      </div>
                    )}

                    <Button
                      type="submit"
                      data-ocid="contact.submit_button"
                      disabled={isPending}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 text-base"
                    >
                      {isPending ? (
                        <>
                          <Loader2
                            data-ocid="contact.loading_state"
                            className="mr-2 h-4 w-4 animate-spin"
                          />
                          Submitting Inquiry...
                        </>
                      ) : (
                        "Send Inquiry"
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer className="bg-[oklch(0.13_0.04_155)] text-white/70">
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/uploads/trader-logo-1.jpg"
                alt="AHA Traders Logo"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-display text-lg font-bold text-white">
                AHA <span className="text-accent">Traders</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Bringing the world the finest dried flavors — from India's farms
              to global kitchens.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">
              Our Products
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "Dried Vegetables",
                "Dry Ginger Items",
                "Pickles",
                "Dried Green Chilly Powder",
              ].map((p) => (
                <li key={p}>
                  <a
                    href="#products"
                    className="hover:text-accent transition-colors"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <p>info@ahatraders.com</p>
              <p>+91 98765 43210</p>
              <p>India · Global Exports</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {year} AHA Traders. All rights reserved.</span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── Quote Page ────────────────────────────────────────────────────────────────
const PICKLE_VARIETIES = [
  {
    name: "Mango Pickle (Spicy)",
    price: 930,
    image: "/assets/uploads/pkl-2-1.jpg",
  },
  {
    name: "Bellam Mango Pickle (Sweet)",
    price: 940,
    image: "/assets/uploads/swe-pic-1.png",
  },
  {
    name: "Lemon Pickle",
    price: 900,
    image: "/assets/uploads/lem-pic-1.png",
  },
  {
    name: "Gooseberry Pickle",
    price: 900,
    image: "/assets/uploads/gos-pic-1.png",
  },
  {
    name: "Tomato Pickle",
    price: 900,
    image: "/assets/uploads/tom-pickle-1.png",
  },
  {
    name: "Gongura Pickle (Sour Leafy Pickle)",
    price: 940,
    image: "/assets/uploads/matadora-1.jpg",
  },
  {
    name: "Mango Thokku Pickle (Sweet And Spicy)",
    price: 920,
    image: "/assets/uploads/thokka-1.jpg",
  },
];

const productOptions = [
  {
    id: "driedVegetables",
    label: "Dried Vegetables",
    value: Product.driedVegetables,
    pricePerUnit: 950,
    unit: "kg",
  },
  {
    id: "driedGinger",
    label: "Dry Ginger Items",
    value: Product.driedGinger,
    pricePerUnit: 350,
    unit: "kg",
  },
  {
    id: "pickles",
    label: "Pickles",
    value: Product.pickles,
    pricePerUnit: 900,
    unit: "kg",
  },
  {
    id: "driedGreenChillyPowder",
    label: "Dried Green Chilly Powder",
    value: Product.driedGreenChillyPowder,
    pricePerUnit: 2000,
    unit: "kg",
  },
];

const incotermOptions = ["EXW", "FOB", "CIF", "DDP", "Other"];

function QuotePage({ onBack }: { onBack: () => void }) {
  const { mutate, isPending, isSuccess, reset } = useSubmitInquiry();

  const [showCost, setShowCost] = useState(false);
  const [pickleVarieties, setPickleVarieties] = useState<
    Record<string, { selected: boolean; qty: string }>
  >(() =>
    Object.fromEntries(
      PICKLE_VARIETIES.map((v) => [v.name, { selected: false, qty: "" }]),
    ),
  );
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",
    selectedProducts: [] as Product[],
    productQuantities: {} as Record<string, string>,
    packaging: "",
    incoterm: "",
    deliveryDate: "",
    notes: "",
  });

  const toggleProduct = (val: Product) => {
    setForm((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(val)
        ? prev.selectedProducts.filter((p) => p !== val)
        : [...prev.selectedProducts, val],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.selectedProducts.length === 0) {
      toast.error("Please select at least one product.");
      return;
    }

    const productsWithQty = form.selectedProducts
      .map((p) => {
        const opt = productOptions.find((o) => o.value === p);
        if (!opt) return null;
        const qty = form.productQuantities[opt.id] || "not specified";
        return `${`${opt.label}: ${qty} kg`}`;
      })
      .filter(Boolean)
      .join("\n");

    const message = [
      `Company: ${form.companyName}`,
      `Country/Destination: ${form.country}`,
      `Products & Quantities:\n${productsWithQty}`,
      `Packaging Preference: ${form.packaging}`,
      `Incoterm: ${form.incoterm}`,
      `Target Delivery Date: ${form.deliveryDate}`,
      `Additional Notes: ${form.notes}`,
    ]
      .filter((line) => !line.endsWith(": "))
      .join("\n");

    mutate(
      {
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        message,
        productInterest: form.selectedProducts[0] ?? Product.driedVegetables,
      },
      {
        onSuccess: () => {
          toast.success(
            "Quote request submitted! We'll reach out within 24 hours.",
          );
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      },
    );
  };

  // scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Quote Navbar */}
      <header className="sticky top-0 z-50 bg-[oklch(0.18_0.04_155/0.97)] backdrop-blur-md border-b border-white/10 shadow-warm">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/trader-logo-1.jpg"
              alt="AHA Traders Logo"
              className="w-10 h-10 rounded-full object-cover shadow-warm"
            />
            <span className="font-display text-xl font-bold tracking-tight text-white">
              AHA <span className="text-accent">Traders</span>
            </span>
          </div>
          <Button
            variant="ghost"
            data-ocid="quote.nav.button"
            onClick={onBack}
            className="text-white/80 hover:text-white hover:bg-white/10 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Hero Header */}
      <div className="relative bg-[oklch(0.16_0.06_155)] py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.2'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-5 bg-accent/20 text-accent border-accent/30 text-xs tracking-widest uppercase font-semibold px-4 py-1.5">
              Export Inquiry
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-5">
              Request a <span className="text-accent italic">Quote</span>
            </h1>
            <p className="text-white/65 text-lg max-w-2xl mx-auto">
              Tell us what you need and our export team will get back to you
              with a tailored quote within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Body */}
      <main className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                data-ocid="quote.success_state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-3xl p-14 text-center border border-border shadow-warm-lg"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                  Quote Request Received!
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  Thank you for reaching out. Our export team will review your
                  requirements and send you a detailed quote within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    data-ocid="quote.submit_button"
                    onClick={reset}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  >
                    Submit Another Quote
                  </Button>
                  <Button
                    variant="outline"
                    data-ocid="quote.cancel_button"
                    onClick={onBack}
                  >
                    Back to Home
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                data-ocid="quote.modal"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-warm-lg space-y-8"
              >
                {/* Section: Contact Info */}
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-1">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground text-sm mb-5">
                    Who should we send the quote to?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="q-fullname"
                        className="font-semibold text-sm"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="q-fullname"
                        data-ocid="quote.input"
                        placeholder="Jane Nguyen"
                        value={form.fullName}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, fullName: e.target.value }))
                        }
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="q-company"
                        className="font-semibold text-sm"
                      >
                        Company Name *
                      </Label>
                      <Input
                        id="q-company"
                        data-ocid="quote.company.input"
                        placeholder="Global Foods Ltd."
                        value={form.companyName}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            companyName: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="q-email"
                        className="font-semibold text-sm"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="q-email"
                        type="email"
                        data-ocid="quote.email.input"
                        placeholder="jane@globalfoods.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="q-phone"
                        className="font-semibold text-sm"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="q-phone"
                        type="tel"
                        data-ocid="quote.phone.input"
                        placeholder="+44 20 7946 0958"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label
                        htmlFor="q-country"
                        className="font-semibold text-sm"
                      >
                        Country / Destination *
                      </Label>
                      <Input
                        id="q-country"
                        data-ocid="quote.country.input"
                        placeholder="e.g. United Kingdom, Germany, UAE..."
                        value={form.country}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, country: e.target.value }))
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border" />

                {/* Section: Products */}
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-1">
                    Products Interested *
                  </h2>
                  <p className="text-muted-foreground text-sm mb-5">
                    Select all that apply.
                  </p>
                  <div className="space-y-3">
                    {productOptions.map((opt, idx) => (
                      <div key={opt.id} className="space-y-3">
                        <div
                          data-ocid={`quote.checkbox.${idx + 1}`}
                          className="flex items-center gap-4"
                        >
                          <Checkbox
                            id={`product-${opt.id}`}
                            checked={form.selectedProducts.includes(opt.value)}
                            onCheckedChange={() => toggleProduct(opt.value)}
                            className="shrink-0"
                          />
                          <Label
                            htmlFor={`product-${opt.id}`}
                            className="text-sm font-medium text-foreground flex-1 cursor-pointer"
                          >
                            {opt.label}
                            {opt.value === Product.driedGreenChillyPowder && (
                              <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-semibold">
                                ★ Signature
                              </span>
                            )}
                          </Label>
                          {opt.id !== "pickles" && (
                            <div className="flex items-center gap-2">
                              <Input
                                data-ocid={`quote.quantity.input.${idx + 1}`}
                                placeholder="Weight needed"
                                value={form.productQuantities[opt.id] || ""}
                                onChange={(e) =>
                                  setForm((p) => ({
                                    ...p,
                                    productQuantities: {
                                      ...p.productQuantities,
                                      [opt.id]: e.target.value,
                                    },
                                  }))
                                }
                                className="h-8 text-sm w-36"
                              />
                              <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
                                kg
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Pickle Varieties Picker */}
                        {opt.id === "pickles" &&
                          form.selectedProducts.includes(opt.value) && (
                            <div className="ml-7 rounded-xl border border-accent/30 bg-accent/5 p-4 space-y-3">
                              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                                Select Pickle Varieties & Quantities
                              </p>
                              {PICKLE_VARIETIES.map((variety, vIdx) => {
                                const vs = pickleVarieties[variety.name];
                                return (
                                  <div key={variety.name} className="space-y-1">
                                    <div className="flex items-center gap-3">
                                      <Checkbox
                                        id={`pickle-variety-${vIdx}`}
                                        data-ocid={`quote.pickle_variety.checkbox.${vIdx + 1}`}
                                        checked={vs.selected}
                                        onCheckedChange={(checked) =>
                                          setPickleVarieties((prev) => ({
                                            ...prev,
                                            [variety.name]: {
                                              ...prev[variety.name],
                                              selected: !!checked,
                                            },
                                          }))
                                        }
                                      />
                                      <Label
                                        htmlFor={`pickle-variety-${vIdx}`}
                                        className="text-sm text-foreground flex-1 cursor-pointer"
                                      >
                                        {variety.name}
                                      </Label>
                                      <span className="text-xs font-bold text-foreground/70">
                                        ₹{variety.price}/kg
                                      </span>
                                    </div>
                                    {vs.selected && (
                                      <div className="ml-7 flex items-center gap-2">
                                        <Input
                                          data-ocid={`quote.pickle_variety.input.${vIdx + 1}`}
                                          placeholder="Quantity (kg)"
                                          value={vs.qty}
                                          onChange={(e) =>
                                            setPickleVarieties((prev) => ({
                                              ...prev,
                                              [variety.name]: {
                                                ...prev[variety.name],
                                                qty: e.target.value,
                                              },
                                            }))
                                          }
                                          className="h-8 text-sm w-28"
                                        />
                                        <span className="text-xs text-muted-foreground">
                                          kg
                                        </span>
                                        {vs.qty &&
                                          !Number.isNaN(
                                            Number.parseFloat(vs.qty),
                                          ) && (
                                            <span className="text-xs font-semibold text-foreground/80">
                                              = ₹
                                              {(
                                                Number.parseFloat(vs.qty) *
                                                variety.price
                                              ).toLocaleString("en-IN")}
                                            </span>
                                          )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                  {/* Display Cost button + total */}
                  {(() => {
                    const total = productOptions.reduce((sum, opt) => {
                      if (!form.selectedProducts.includes(opt.value))
                        return sum;
                      if (opt.id === "pickles") {
                        // Sum selected pickle varieties
                        return (
                          sum +
                          PICKLE_VARIETIES.reduce((pSum, v) => {
                            const vs = pickleVarieties[v.name];
                            if (!vs?.selected) return pSum;
                            const q = Number.parseFloat(vs.qty || "0");
                            return pSum + (Number.isNaN(q) ? 0 : q * v.price);
                          }, 0)
                        );
                      }
                      const qty = Number.parseFloat(
                        form.productQuantities[opt.id] || "0",
                      );
                      return (
                        sum + (Number.isNaN(qty) ? 0 : qty * opt.pricePerUnit)
                      );
                    }, 0);
                    return (
                      <div className="mt-6 flex flex-col items-start gap-4">
                        <button
                          type="button"
                          data-ocid="quote.display_cost.button"
                          onClick={() => setShowCost((v) => !v)}
                          className="px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm shadow hover:opacity-90 transition-opacity"
                        >
                          {showCost ? "Hide Cost" : "Display Cost"}
                        </button>
                        {showCost && (
                          <div
                            data-ocid="quote.total_cost.panel"
                            className="w-full rounded-2xl border-2 border-accent/60 bg-accent/10 px-6 py-5 shadow-warm"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-1">
                                  Estimated Total Cost
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  For selected items only
                                </p>
                              </div>
                              <span className="text-3xl font-bold text-foreground">
                                ₹{total.toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <div className="border-t border-border" />

                {/* Section: Order Details */}
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-1">
                    Order Details
                  </h2>
                  <p className="text-muted-foreground text-sm mb-5">
                    Help us prepare an accurate quote.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="q-pack" className="font-semibold text-sm">
                        Packaging Preference
                      </Label>
                      <Input
                        id="q-pack"
                        data-ocid="quote.packaging.input"
                        placeholder="e.g. 25 kg bags, retail packs"
                        value={form.packaging}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, packaging: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="q-incoterm"
                        className="font-semibold text-sm"
                      >
                        Incoterm Preference
                      </Label>
                      <Select
                        value={form.incoterm}
                        onValueChange={(val) =>
                          setForm((p) => ({ ...p, incoterm: val }))
                        }
                      >
                        <SelectTrigger id="q-incoterm" data-ocid="quote.select">
                          <SelectValue placeholder="Select incoterm" />
                        </SelectTrigger>
                        <SelectContent>
                          {incotermOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="q-date" className="font-semibold text-sm">
                        Target Delivery Date
                      </Label>
                      <Input
                        id="q-date"
                        type="date"
                        data-ocid="quote.date.input"
                        value={form.deliveryDate}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            deliveryDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border" />

                {/* Section: Notes */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="q-notes"
                    className="font-display text-xl font-bold text-foreground"
                  >
                    Additional Notes / Requirements
                  </Label>
                  <p className="text-muted-foreground text-sm mb-3">
                    Certifications needed, custom labeling, or anything else?
                  </p>
                  <Textarea
                    id="q-notes"
                    data-ocid="quote.textarea"
                    placeholder="Tell us about certification requirements, labeling needs, special packaging, recurring order potential..."
                    rows={5}
                    value={form.notes}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, notes: e.target.value }))
                    }
                  />
                </div>

                <Button
                  type="submit"
                  data-ocid="quote.submit_button"
                  disabled={isPending}
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base py-7 rounded-xl shadow-warm-lg"
                >
                  {isPending ? (
                    <>
                      <Loader2
                        data-ocid="quote.loading_state"
                        className="mr-2 h-5 w-5 animate-spin"
                      />
                      Submitting Quote Request...
                    </>
                  ) : (
                    "Submit Quote Request"
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ── PicklesPage ───────────────────────────────────────────────────────────────

function PicklesPage({
  onBack,
  onQuote,
}: { onBack: () => void; onQuote: () => void }) {
  const [pickleSelections, setPickleSelections] = useState<
    Record<string, { checked: boolean; qty: string }>
  >({});
  const [showTotal, setShowTotal] = useState(false);

  const updateSelection = (
    name: string,
    field: "checked" | "qty",
    value: boolean | string,
  ) => {
    setPickleSelections((prev) => ({
      ...prev,
      [name]: { ...{ checked: false, qty: "" }, ...prev[name], [field]: value },
    }));
  };

  const totalCost = PICKLE_VARIETIES.reduce((sum, v) => {
    const sel = pickleSelections[v.name];
    if (!sel?.checked) return sum;
    return sum + Number.parseFloat(sel.qty || "0") * v.price;
  }, 0);

  return (
    <div
      data-ocid="pickles.page"
      className="min-h-screen bg-[oklch(0.97_0.01_80)]"
    >
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center gap-4">
          <button
            type="button"
            data-ocid="pickles.back_button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
        {/* Product Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-3xl overflow-hidden shadow-warm mb-10"
        >
          <div className="md:flex">
            <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
              <img
                src="/assets/uploads/pkl-1.jpg"
                alt="Pickles"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 hidden md:block" />
            </div>
            <div className="md:w-3/5 p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-3 bg-primary/10 text-primary border-primary/20 text-xs tracking-widest uppercase font-semibold">
                Export Product
              </Badge>
              <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                Pickles
              </h1>
              <p className="text-2xl font-bold text-primary mb-4">
                from ₹900 / kg
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Authentic traditionally-crafted pickles — mango, lime, mixed
                vegetables, and more — made with natural oils and spices.
                Shelf-stable and export-ready with international food safety
                compliance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pickle Varieties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-card rounded-3xl p-8 shadow-warm mb-8"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Pickle Varieties
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Select varieties and enter quantity in kg for your order
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PICKLE_VARIETIES.map((variety, idx) => {
              const sel = pickleSelections[variety.name];
              const cost = sel?.checked
                ? (Number.parseFloat(sel.qty || "0") * variety.price).toFixed(2)
                : "0.00";
              return (
                <div
                  key={variety.name}
                  data-ocid={`pickles.variety.card.${idx + 1}`}
                  className="rounded-2xl border border-border/60 bg-background/50 overflow-hidden flex flex-col"
                >
                  <div className="w-full h-52 overflow-hidden">
                    <img
                      src={variety.image}
                      alt={variety.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        data-ocid={`pickles.variety.checkbox.${idx + 1}`}
                        checked={sel?.checked ?? false}
                        onChange={(e) =>
                          updateSelection(
                            variety.name,
                            "checked",
                            e.target.checked,
                          )
                        }
                        className="w-5 h-5 accent-primary cursor-pointer flex-shrink-0 mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm leading-snug">
                          {variety.name}
                        </p>
                        <p className="text-xs font-bold text-primary mt-0.5">
                          ₹{variety.price}/kg
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <input
                        type="number"
                        data-ocid={`pickles.variety.qty.input.${idx + 1}`}
                        value={sel?.qty ?? ""}
                        onChange={(e) =>
                          updateSelection(variety.name, "qty", e.target.value)
                        }
                        placeholder="Quantity (kg)"
                        min="0"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      {sel?.checked && (
                        <span className="text-sm font-bold text-foreground text-right">
                          Est: ₹{cost}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Display Total Cost */}
          <div className="mt-6 flex flex-col items-start gap-3">
            <button
              type="button"
              data-ocid="pickles.display_total_button"
              onClick={() => setShowTotal((prev) => !prev)}
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              {showTotal ? "Hide Total Cost" : "Display Total Cost"}
            </button>
            {showTotal && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full p-4 rounded-2xl bg-primary/10 border border-primary/20"
              >
                <p className="text-sm text-muted-foreground mb-1">
                  Total Estimated Cost
                </p>
                <p className="text-foreground font-bold text-xl">
                  ₹{totalCost.toFixed(2)}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center"
        >
          <Button
            data-ocid="pickles.request_quote_button"
            size="lg"
            onClick={onQuote}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-base font-semibold rounded-2xl shadow-warm gap-2"
          >
            <Package className="w-5 h-5" />
            Request a Quote
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<"home" | "quote" | "pickles">("home");

  return (
    <div className="min-h-screen">
      <Toaster richColors position="top-right" />
      <FeedbackWidget />
      <AnimatePresence mode="wait">
        {page === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Navbar onNavigateToQuote={() => setPage("quote")} />
            <main>
              <Hero onNavigateToQuote={() => setPage("quote")} />
              <Products onPicklesClick={() => setPage("pickles")} />
              <About />
              <WhyChooseUs />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        ) : page === "pickles" ? (
          <motion.div
            key="pickles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <PicklesPage
              onBack={() => setPage("home")}
              onQuote={() => setPage("quote")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="quote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <QuotePage onBack={() => setPage("home")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
