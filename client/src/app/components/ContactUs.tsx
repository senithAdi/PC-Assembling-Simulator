import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowLeft, Phone, MessageCircle, HelpCircle, Clock } from "lucide-react";
import { motion } from "motion/react";

// Displayed local number and its international forms for links.
const DISPLAY_NUMBER = "0753164780";
const TEL_LINK = "tel:+94753164780";
const WHATSAPP_LINK = "https://wa.me/94753164780";

export function ContactUs({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Top Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-card/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('landing')}>
              <ArrowLeft className="size-4 mr-2" />
              Home
            </Button>
            <div className="flex items-center gap-2">
              <MessageCircle className="size-5 text-primary" />
              <span className="font-semibold">Contact Us</span>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => onNavigate('faq')}>
            <HelpCircle className="size-4 mr-2" />
            FAQ
          </Button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex size-16 rounded-2xl bg-gradient-to-br from-primary to-secondary items-center justify-center mb-4">
            <MessageCircle className="size-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground">
            Have a question or feedback? Reach us on phone or WhatsApp.
          </p>
        </motion.div>

        {/* Contact methods */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="backdrop-blur-xl bg-card/80 border-primary/20 h-full hover:border-primary/40 hover:shadow-xl transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <Phone className="size-7 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Call Us</h4>
                  <p className="text-sm text-muted-foreground">Talk to us directly during working hours</p>
                </div>
                <a href={TEL_LINK} className="text-lg font-semibold text-primary">
                  {DISPLAY_NUMBER}
                </a>
                <Button asChild className="w-full mt-1 bg-gradient-to-r from-primary to-secondary">
                  <a href={TEL_LINK}>
                    <Phone className="size-4 mr-2" />
                    Call Now
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="backdrop-blur-xl bg-card/80 border-secondary/20 h-full hover:border-secondary/40 hover:shadow-xl transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <MessageCircle className="size-7 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">WhatsApp</h4>
                  <p className="text-sm text-muted-foreground">Send us a message any time</p>
                </div>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-secondary"
                >
                  {DISPLAY_NUMBER}
                </a>
                <Button asChild className="w-full mt-1 bg-gradient-to-r from-secondary to-accent">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Clock className="size-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Support Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Monday to Friday, 9:00 AM to 5:00 PM. We usually reply within one working day.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
