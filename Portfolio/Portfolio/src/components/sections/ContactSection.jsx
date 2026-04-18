import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Youtube, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { socialLinks } from "@/data/portfolio";
import { useState } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { XLogo } from "@/components/ui/XLogo";
import { LeetCodeIcon } from "@/components/ui/LeetCodeIcon";

const socialIcons = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: XLogo, href: socialLinks.twitter, label: "X (Twitter)" },
  { icon: Youtube, href: socialLinks.youtube, label: "YouTube" },
  { icon: LeetCodeIcon, href: socialLinks.leetcode, label: "LeetCode" },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user_name, user_email, subject, message } = formData;

    // Validation
    if (!user_name.trim() || !user_email.trim() || !subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields before sending.");
      return;
    }

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast.error("Missing EmailJS configuration.");
      console.error("Missing EmailJS env variables");
      return;
    }

    try {
      setIsSubmitting(true);

      // DEBUG: check exactly what you're sending
      console.log("Sending EmailJS payload:", formData);

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name,
          user_email,
          subject,
          message,
          reply_to: user_email,
        },
        PUBLIC_KEY
      );

      toast.success("Message sent successfully!");

      setFormData({
        user_name: "",
        user_email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);

      if (error?.status === 412 || error?.text?.includes("Invalid grant")) {
        toast.error("EmailJS Gmail connection expired. Reconnect Gmail in EmailJS.");
      } else {
        toast.error(error?.text || "Failed to send message.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-display font-semibold mb-4">
                Let's Connect
              </h3>
              <p className="text-muted-foreground">
                I'm always open to discussing new opportunities, interesting
                projects, or just having a chat about technology.
              </p>
            </div>

            <div className="space-y-4">
              <motion.a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground text-sm">{socialLinks.email}</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                placeholder="Your Name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                required
                className="h-12 md:h-12 text-base md:text-sm"
                disabled={isSubmitting}
              />

              <Input
                type="email"
                placeholder="Your Email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                required
                className="h-12 md:h-12 text-base md:text-sm"
                disabled={isSubmitting}
              />

              <Input
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="h-12 md:h-12 text-base md:text-sm"
                disabled={isSubmitting}
              />

              <Textarea
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="resize-none min-h-[120px] text-base md:text-sm"
                disabled={isSubmitting}
              />

              <Button type="submit" size="lg" className="w-full gradient-bg h-14 md:h-12 font-semibold text-base" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}