import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-mochi-cream text-mochi-navy font-sans selection:bg-mochi-teal selection:text-white">
      <Navbar theme="light" />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-[800px] h-[800px] rounded-full border border-mochi-navy"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            OUR MANIFESTO
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xs md:text-sm font-bold uppercase tracking-widest text-mochi-ocean"
          >
            The philosophy of less, but better.
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12 md:space-y-20 text-lg md:text-xl font-light leading-relaxed text-mochi-navy/80"
        >
          <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
            We live in a world of excess. Digital noise, disposable objects, and fleeting trends have replaced the enduring value of true craftsmanship. At Mochi, we believe there is a better way. We believe in the profound beauty of simplicity.
          </p>
          
          <div className="pl-8 md:pl-12 border-l-2 border-mochi-teal py-4 my-16">
            <h3 className="text-2xl md:text-3xl font-bold text-mochi-navy mb-4 tracking-tight">Form follows feeling.</h3>
            <p className="text-base md:text-lg">
              Every curve, every texture, and every shadow is an intentional choice. We do not design for utility alone; we design for the quiet moment of joy you experience when interacting with a well-made object.
            </p>
          </div>

          <p>
            Our materials are chosen for their honesty. Raw ceramic, forged aluminum, and natural fibers that age beautifully over time. We reject the artificial and embrace the authentic. 
          </p>

          <p>
            When you purchase from Mochi, you are not simply acquiring an item. You are making a conscious decision to surround yourself with fewer, better things. You are joining a rebellion against the temporary.
          </p>

          <div className="text-center pt-20">
            <p className="text-sm font-bold uppercase tracking-widest text-mochi-navy mb-8">This is our commitment.</p>
            <div className="w-16 h-[1px] bg-mochi-navy mx-auto"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
