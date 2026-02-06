'use client';

import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Youtube, Mail, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

export default function Footer() {
  return (
    <footer className="relative bg-background pt-20 pb-8 px-6 md:px-12 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
          {/* Brand Statement */}
          <div className="max-w-2xl">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
            >
              Just Do It.
            </motion.h3>
          </div>

          {/* Minimal Links */}
          <nav className="flex flex-wrap gap-6 md:gap-8">
            <Link
              href="/products"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors clickable"
            >
              Shop
            </Link>
            <Link
              href="/orders"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors clickable"
            >
              Orders
            </Link>
            <Link
              href="/profile"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors clickable"
            >
              My Account
            </Link>
            <Link
              href="/admin"
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors clickable"
            >
              Admin
            </Link>
          </nav>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-muted/50 p-8 md:p-12 rounded-2xl mb-12"
        >
          <div className="text-center md:text-left max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold mb-2"
            >
              Stay Updated
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-muted-foreground text-lg max-w-lg"
            >
              Subscribe to our newsletter for exclusive drops and limited editions.
            </motion.p>

            <Newsletter variant="card" className="mt-6" />
          </div>

          {/* Social Icons with Hover Motion */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-6 mb-12"
          >
            {[
              { icon: Instagram, label: 'Instagram' },
              { icon: Twitter, label: 'Twitter' },
              { icon: Facebook, label: 'Facebook' },
              { icon: Youtube, label: 'YouTube' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href="#"
                className="clickable"
                whileHover={{ y: -4, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <social.icon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              © 2025 Nike, Inc. All Rights Reserved
            </p>

            <div className="flex gap-6">
              <Link
                href="/contact"
                className="text-xs text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors clickable"
              >
                Contact Us
              </Link>
              <Link
                href="/"
                className="text-xs text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors clickable"
              >
                Privacy
              </Link>
              <Link
                href="/"
                className="text-xs text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors clickable"
              >
                Terms
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
