"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getWhatsAppUrl } from "@/lib/site-config"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/processo", label: "Processo" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Contato" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header 
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-500",
        isScrolled 
          ? "border-[var(--hairline)] shadow-lg backdrop-blur-xl bg-[var(--canvas)]/80" 
          : "border-transparent bg-[var(--canvas)]/50 backdrop-blur-md"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div 
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-white font-bold text-sm shadow-md"
            whileHover={{ scale: 1.1, rotate: -5, boxShadow: "0 0 20px rgba(0, 100, 224, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            m
          </motion.div>
          <motion.span 
            className="text-lg font-bold text-[var(--ink-deep)]"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            mlluizdevtech
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -15, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: "500px" }}
            >
              <Link
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  "text-[var(--charcoal)] hover:bg-[var(--surface-soft)] hover:text-[var(--ink-deep)] hover:shadow-sm"
                )}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <motion.div 
          className="hidden md:flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            whileHover={{ scale: 1.05, z: 10 }} 
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Button
              asChild
              variant="outline"
              className="rounded-full border-2 border-[var(--ink-deep)] text-[var(--ink-deep)] hover:bg-[var(--surface-soft)] transition-all"
            >
              <a
                href={getWhatsAppUrl("general")}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </Button>
          </motion.div>
          <ThemeToggle />
          <motion.div 
            whileHover={{ scale: 1.05, z: 10 }} 
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Button
              asChild
              className="rounded-full bg-[var(--ink-button)] text-[var(--on-ink-button)] hover:bg-[var(--charcoal)] shadow-md hover:shadow-lg transition-all"
            >
              <Link href="/contato">Solicitar Orçamento</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--surface-soft)]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5 text-[var(--ink)]" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5 text-[var(--ink)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden border-t border-[var(--hairline-soft)] bg-[var(--canvas)]/95 backdrop-blur-xl overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-[var(--charcoal)] hover:bg-[var(--surface-soft)] rounded-xl active:scale-95 transition-transform"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="flex items-center gap-3 mt-4 pt-4 border-t border-[var(--hairline-soft)]"
              >
                <ThemeToggle />
                <span className="text-sm text-[var(--steel)]">Alternar tema</span>
              </motion.div>
              <motion.div
                className="flex flex-col gap-3 mt-4 pt-4 border-t border-[var(--hairline-soft)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-2 border-[var(--ink-deep)] text-[var(--ink-deep)]"
                >
                  <a
                    href={getWhatsAppUrl("general")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full rounded-full bg-[var(--ink-button)] text-[var(--on-ink-button)]"
                >
                  <Link href="/contato">Solicitar Orçamento</Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
