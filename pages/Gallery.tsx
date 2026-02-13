import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GalleryPage: React.FC = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Kitchen Deep Degreasing',
      category: 'Home Cleaning',
      before: 'https://i.guim.co.uk/img/static/sys-images/Guardian/About/General/2013/9/16/1379330743168/messy-room-010.jpg?width=465&dpr=1&s=none&crop=none',
      after: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Living Room Restoration',
      category: 'Home Cleaning',
      before: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Luxury Car Interior Detail',
      category: 'Vehicle Care',
      before: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Corporate Office Polish',
      category: 'Commercial',
      before: 'https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2024/02/0/0/iStock-1089440896.jpg?ve=1&tl=1',
      after: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Bathroom Sanitization',
      category: 'Deep Clean',
      before: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Bedroom Refresh',
      category: 'Home Cleaning',
      before: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRyHzl1FwL6qyir6h1HjWRVncsigLs--gOGg&s',
      after: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ__AF-a6XoWPK4RDAX91shru07WmJHCrulVQ&s'
    }
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-2 block">
                Visual Proof
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">Transformation Gallery</h1>
            <p className="text-lg text-slate-600">
                Witness the power of Urban Spark. Tap or hover over the images to see the Before & After results.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {galleryItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group"
            >
              <div className="relative h-80 overflow-hidden cursor-crosshair">
                {/* Before Image (Base) */}
                <img src={item.before} alt={`${item.title} Before`} className="absolute inset-0 w-full h-full object-cover" />
                
                {/* After Image (Overlay with hover effect) */}
                {/* Using a simple CSS-based reveal for smoother performance without complex JS state for every item */}
                <div className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100 z-10">
                    <img src={item.after} alt={`${item.title} After`} className="w-full h-full object-cover" />
                </div>
                
                {/* Labels */}
                <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest border border-white/20 transition-opacity duration-300 group-hover:opacity-0">
                    Before
                </div>
                <div className="absolute top-4 right-4 z-20 bg-primary-600 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest border border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-lg shadow-primary-900/20">
                    After <Sparkles size={12} className="inline ml-1" />
                </div>

                {/* Hover Instruction Overlay (Disappears on hover) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 opacity-0 group-hover:opacity-0 transition-opacity duration-500">
                    <div className="bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                        Tap / Hover to Clean
                    </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-primary-600 text-xs font-bold uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 mb-4">
                    Restored to perfection with our specialized cleaning techniques.
                </p>
                <Link to="/booking" className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-primary-600 transition-colors">
                    Book This Service <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
             <Link to="/booking" className="inline-block bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Ready for your transformation? Book Now
             </Link>
        </div>
      </div>
    </div>
  );
};