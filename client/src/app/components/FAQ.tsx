import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { ArrowLeft, HelpCircle, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

const faqs = [
  {
    question: "What is PC Assembling Simulator?",
    answer: "It is a free educational tool where students build a computer virtually by dragging real components onto a motherboard and learning how each part works.",
  },
  {
    question: "Do I need any real hardware to use it?",
    answer: "No. Everything runs in your web browser, so you can practise building a PC safely without buying or touching any real parts.",
  },
  {
    question: "Is it free to use?",
    answer: "Yes. The simulator is made for learning and is completely free for students and teachers.",
  },
  {
    question: "Do I need an account?",
    answer: "You can start building right away without signing in. Creating a free account lets you save your builds and track your progress and achievements.",
  },
  {
    question: "How does the compatibility check work?",
    answer: "When you place a component, the simulator checks it against the rest of the build and tells you instantly whether it fits, so you learn the rules as you go.",
  },
  {
    question: "How do I earn points and achievements?",
    answer: "You earn points for placing compatible components correctly, and you unlock achievements as you complete builds and learning goals.",
  },
  {
    question: "Which components can I learn about?",
    answer: "You can explore CPUs, GPUs, RAM, storage, power supplies, motherboards, cases, and more in the Component Learning Center.",
  },
  {
    question: "What devices does it work on?",
    answer: "It works in any modern web browser on a laptop or desktop. A larger screen gives the best drag and drop experience.",
  },
  {
    question: "Is my data safe?",
    answer: "We only store your account details and your saved builds so you can return to them later. Your information is used only to run the simulator and is never sold.",
  },
  {
    question: "How can I get help or give feedback?",
    answer: "Visit the Contact Us page to reach our team by phone or WhatsApp, and we will be happy to help.",
  },
];

export function FAQ({ onNavigate }: { onNavigate: (page: string) => void }) {
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
              <HelpCircle className="size-5 text-primary" />
              <span className="font-semibold">Help &amp; FAQ</span>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => onNavigate('contact')}>
            Contact Us
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
            <HelpCircle className="size-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about the PC Assembling Simulator
          </p>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="backdrop-blur-xl bg-card/80 border-primary/20 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Still need help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Card className="backdrop-blur-xl bg-card/80 border-secondary/20">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="font-semibold mb-1">Still have a question?</h4>
                <p className="text-sm text-muted-foreground">
                  Reach our team directly and we will get back to you.
                </p>
              </div>
              <Button
                onClick={() => onNavigate('contact')}
                className="bg-gradient-to-r from-secondary to-accent"
              >
                <MessageCircle className="size-4 mr-2" />
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
