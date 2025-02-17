import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Linkedin,
  Leaf,
  ArrowUpRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Our Impact', href: '#' },
      { label: 'Success Stories', href: '#' },
      { label: 'News & Media', href: '#' }
    ],
    services: [
      { label: 'Household Collection', href: '#' },
      { label: 'Business Solutions', href: '#' },
      { label: 'Restaurant Program', href: '#' },
      { label: 'Partner With Us', href: '#' }
    ],
    contact: [
      { 
        icon: <Phone className="w-5 h-5" />, 
        label: '+968 2412 3456',
        href: 'tel:+96824123456'
      },
      { 
        icon: <Mail className="w-5 h-5" />, 
        label: 'hello@tadweer.om',
        href: 'mailto:hello@tadweer.om'
      },
      { 
        icon: <MapPin className="w-5 h-5" />, 
        label: 'Muscat, Sultanate of Oman',
        href: '#'
      }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-[#5F7053] to-[#4A563F] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#FFCE31]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#A9B388]/5 rounded-full blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        {/* Upper Section */}
        <div className="container px-4 pt-16 mx-auto">
          <div className="grid gap-12 pb-12 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white shadow-lg rounded-xl">
                    <img src="/logo1.png" alt="Tadweer" className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-white to-white/80 bg-clip-text">
                    Tadweer
                  </h2>
                </div>
                <p className="leading-relaxed text-white/80">
                  Leading Oman's sustainable future through innovative oil recycling solutions. 
                  Together, we're building a greener tomorrow.
                </p>
              </motion.div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="text-[#FFCE31] font-bold text-2xl">100K+</div>
                  <div className="text-sm text-white/60">Liters Recycled</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="text-[#FFCE31] font-bold text-2xl">50+</div>
                  <div className="text-sm text-white/60">Business Partners</div>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="grid gap-8 lg:col-span-3 md:grid-cols-3">
              {/* Company Links */}
              <div>
                <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-white">
                  <Leaf className="w-5 h-5 text-[#FFCE31]" />
                  Company
                </h3>
                <ul className="space-y-4">
                  {footerLinks.company.map((link, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a 
                        href={link.href}
                        className="flex items-center text-white/70 hover:text-white group"
                      >
                        <span className="mr-2">{link.label}</span>
                        <ArrowUpRight className="w-4 h-4 transition-all -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Services Links */}
              <div>
                <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-white">
                  <Leaf className="w-5 h-5 text-[#FFCE31]" />
                  Services
                </h3>
                <ul className="space-y-4">
                  {footerLinks.services.map((link, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a 
                        href={link.href}
                        className="flex items-center text-white/70 hover:text-white group"
                      >
                        <span className="mr-2">{link.label}</span>
                        <ArrowUpRight className="w-4 h-4 transition-all -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="flex items-center gap-2 mb-6 text-lg font-semibold text-white">
                  <Leaf className="w-5 h-5 text-[#FFCE31]" />
                  Contact Us
                </h3>
                <ul className="space-y-4">
                  {footerLinks.contact.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a 
                        href={item.href}
                        className="flex items-center gap-3 text-white/70 hover:text-white group"
                      >
                        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#FFCE31]/20 transition-colors">
                          {item.icon}
                        </div>
                        <span>{item.label}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container px-4 py-6 mx-auto">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-white/60">
                © {currentYear} Tadweer Oman. All rights reserved.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="p-2 bg-white/5 rounded-lg hover:bg-[#FFCE31]/20 text-white/60 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-white/60 hover:text-white">Privacy Policy</a>
                <a href="#" className="text-white/60 hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;