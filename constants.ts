import { ServiceCategory, Service, Testimonial, FAQItem } from './types';
import { Home, Building2, Car, Sparkles, Droplets, Wind, Zap, Shield, Smile } from 'lucide-react';

export const SERVICES: Service[] = [
  {
    id: 'home-deep',
    title: 'Deep Home Cleaning',
    description: 'A comprehensive top-to-bottom cleaning service for your entire home.',
    longDescription: 'Our Deep Home Cleaning service is designed to rejuvenate your living space. We go beyond the surface to remove hidden dust, allergens, and grime from every corner. Perfect for spring cleaning, moving in/out, or post-renovation cleanup.',
    category: ServiceCategory.HOME,
    image: 'https://busybucket.in/wp-content/uploads/2022/06/deep-home-cleaning.jpg',
    icon: Home,
    benefits: ['Eliminates 99.9% of allergens', 'Restores shine to floors and fixtures', 'Improves indoor air quality', 'Saves you 6-8 hours of hard labor'],
    process: [
      { title: 'Assessment', description: 'We inspect key areas requiring special attention.' },
      { title: 'Dry Dusting', description: 'Ceiling fans, vents, and furniture are dusted first.' },
      { title: 'Wet Cleaning', description: 'Scrubbing and sanitizing bathrooms and kitchens.' },
      { title: 'Floor Care', description: 'Vacuuming and mopping with premium eco-friendly solutions.' }
    ],
    packages: [
      { id: 'h-basic', name: 'Basic Clean', price: 99, duration: '3-4 Hours', features: ['Dusting', 'Vacuuming', 'Moping', 'Bathroom Basic'] },
      { id: 'h-deep', name: 'Deep Clean', price: 199, duration: '6-8 Hours', features: ['Deep Dusting', 'Steam Cleaning', 'Cabinet Interiors', 'Appliance Exterior'] },
      { id: 'h-premium', name: 'Premium Spark', price: 299, duration: 'Full Day', features: ['Everything in Deep', 'Upholstery Shampoo', 'Window Polishing', 'Sanitization'] },
    ]
  },
  {
    id: 'home-kitchen',
    title: 'Kitchen Sanitization',
    description: 'Degreasing and sanitizing every corner of your kitchen.',
    longDescription: 'The kitchen is the heart of the home, but also a magnet for grease and bacteria. Our specialized kitchen sanitization process removes tough oil stains from chimneys, disinfects countertops, and ensures your cooking area is hygienic and sparkling.',
    category: ServiceCategory.HOME,
    image: 'https://www.seriouseats.com/thmb/-XSo5Xw9_uD5iwNv7Hne1FesH6Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__04__20200401-sanitize-kitchen-cleaning-countertop-shutterstock-7e30a7536ca949e5a57e968d28460ab9.jpg',
    icon: Sparkles,
    benefits: ['Removes stubborn grease', 'Sanitizes food prep areas', 'Cleans appliances inside out', 'Pest prevention'],
    process: [
      { title: 'Degreasing', description: 'Applying industrial-grade degreaser to chimneys and hobs.' },
      { title: 'Scrubbing', description: 'Deep scrubbing of tiles and countertops.' },
      { title: 'Appliance Cleaning', description: 'Cleaning exterior of fridge, microwave, and oven.' },
      { title: 'Polishing', description: 'Final chrome polishing for taps and sinks.' }
    ],
    packages: [
      { id: 'k-std', name: 'Standard', price: 89, duration: '2 Hours', features: ['Countertops', 'Sink', 'Floor', 'Exterior Appliances'] },
      { id: 'k-deep', name: 'Deep Degrease', price: 149, duration: '4 Hours', features: ['Chimney', 'Inside Cabinets', 'Behind Appliances', 'Tile Scrubbing'] },
    ]
  },
  {
    id: 'comm-office',
    title: 'Office Cleaning',
    description: 'Professional cleaning for workspaces to maintain a productive environment.',
    longDescription: 'A clean office boosts morale and productivity. Our commercial cleaning team works discreetly and efficiently to ensure your workspace creates the right impression on clients and provides a healthy environment for employees.',
    category: ServiceCategory.COMMERCIAL,
    image: 'https://pinkcleanindia.com/wp-content/uploads/2024/03/best-office-cleaning-service-in-jp-nagar-bangalore.webp',
    icon: Building2,
    benefits: ['Enhances professional image', 'Reduces sick days', 'Customized schedules', 'Secure and confidential service'],
    process: [
      { title: 'Workspace Wipe-down', description: 'Disinfecting desks, phones, and keyboards.' },
      { title: 'Common Areas', description: 'Cleaning pantry, reception, and meeting rooms.' },
      { title: 'Restroom Sanitization', description: 'Deep cleaning and restocking of restrooms.' },
      { title: 'Floor Maintenance', description: 'Vacuuming carpets and mopping hard floors.' }
    ],
    packages: [
      { id: 'o-daily', name: 'Daily Maintenance', price: 200, duration: 'Daily', features: ['Trash Removal', 'Desk Wipe', 'Vacuum', 'Restroom'] },
      { id: 'o-deep', name: 'Weekend Deep Clean', price: 500, duration: '1 Day', features: ['Carpet Shampoo', 'Glass Cleaning', 'Deep Disinfection', 'Floor Polishing'] },
    ]
  },
  {
    id: 'comm-store',
    title: 'Shop & Store Cleaning',
    description: 'Keep your retail space inviting and spotless for customers.',
    longDescription: 'First impressions matter in retail. We ensure your storefront glass is crystal clean, floors are polished, and shelves are dust-free, creating an inviting atmosphere for your customers.',
    category: ServiceCategory.COMMERCIAL,
    image: 'https://spfmservices.com/wp-content/uploads/2025/06/Supermarket-Cleaning-Company-in-Melbourne.jpg',
    icon: Zap,
    benefits: ['Attracts more customers', 'Highlights products better', 'Safe shopping environment', 'Flexible timing'],
    process: [
      { title: 'Glass Cleaning', description: 'Streak-free cleaning of display windows.' },
      { title: 'Floor Buffing', description: 'High-speed buffing for shiny floors.' },
      { title: 'Dusting', description: 'Detailed dusting of shelves and racks.' },
      { title: 'Sanitization', description: 'Disinfecting high-touch points like door handles.' }
    ],
    packages: [
      { id: 's-basic', name: 'Store Spark', price: 150, duration: '3 Hours', features: ['Glass Front', 'Floor Mop', 'Dusting', 'Trash'] },
      { id: 's-deep', name: 'Retail Deep', price: 350, duration: '6 Hours', features: ['Floor Buffing', 'High Dusting', 'Storage Area', 'Restroom'] },
    ]
  },
  {
    id: 'veh-car',
    title: 'Premium Car Wash',
    description: 'Doorstep car washing and detailing services.',
    longDescription: 'Skip the queue at the car wash. We bring the water, power, and premium products to your driveway. From a quick exterior wash to a full interior detail, we make your car look showroom ready.',
    category: ServiceCategory.VEHICLE,
    image: 'https://osren.com/blog/wp-content/uploads/2022/05/Pic1.jpg',
    icon: Car,
    benefits: ['Convenience of doorstep service', 'Scratch-free microfiber tech', 'High-quality wax protection', 'Interior odor removal'],
    process: [
      { title: 'Pre-Wash', description: 'Rinsing loose dirt and applying snow foam.' },
      { title: 'Contact Wash', description: 'Gentle hand wash with microfiber mitts.' },
      { title: 'Interior', description: 'Vacuuming seats, mats, and wiping dashboard.' },
      { title: 'Protection', description: 'Applying spray wax and tyre dressing.' }
    ],
    packages: [
      { id: 'c-ext', name: 'Exterior Only', price: 25, duration: '45 Mins', features: ['Foam Wash', 'Tyre Polish', 'Window Clean'] },
      { id: 'c-full', name: 'Full Detail', price: 85, duration: '2-3 Hours', features: ['Interior Vacuum', 'Seat Shampoo', 'Wax Polish', 'Engine Bay Clean'] },
    ]
  },
  {
    id: 'veh-bike',
    title: 'Bike Spa',
    description: 'Complete foam wash and polish for motorcycles.',
    longDescription: 'Treat your motorcycle to a spa day. We specialize in degreasing chains, removing road grime, and polishing chrome and paintwork to protect your ride from the elements.',
    category: ServiceCategory.VEHICLE,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2_eKjsDJWhUksaE_vfjCz-AfuIP346NkTwA&s',
    icon: Wind,
    benefits: ['Prevents rust and corrosion', 'Smoother ride with clean chain', 'Restores paint shine', 'Detailed engine cleaning'],
    process: [
      { title: 'Cool Down', description: 'Ensuring engine is cool before washing.' },
      { title: 'Degreasing', description: 'Cleaning chain and sprockets.' },
      { title: 'Foam Wash', description: 'Thorough wash and dry.' },
      { title: 'Lubrication', description: 'Lube application and body polish.' }
    ],
    packages: [
      { id: 'b-wash', name: 'Foam Wash', price: 15, duration: '30 Mins', features: ['Pressure Wash', 'Foam', 'Dry'] },
      { id: 'b-detail', name: 'Detailing', price: 40, duration: '1.5 Hours', features: ['Chain Lube', 'Polish', 'Scratch Removal'] },
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Homeowner',
    content: 'Urban Spark transformed my apartment! The deep clean package was worth every penny. The team was professional and meticulous.',
    rating: 5,
    image: 'https://picsum.photos/100/100?random=10'
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Office Manager',
    content: 'We use their commercial services weekly. Reliable, punctual, and very thorough. Highly recommended for businesses.',
    rating: 5,
    image: 'https://picsum.photos/100/100?random=11'
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'Car Enthusiast',
    content: 'The mobile car detailing service is a game changer. My SUV looks brand new without me leaving the driveway.',
    rating: 4,
    image: 'https://picsum.photos/100/100?random=12'
  },
  {
    id: '4',
    name: 'Michael Ross',
    role: 'Restaurant Owner',
    content: 'Kitchen sanitization is critical for us. Urban Spark does a fantastic job with the heavy degreasing overnight.',
    rating: 5,
    image: 'https://picsum.photos/100/100?random=13'
  },
  {
    id: '5',
    name: 'Jessica Lee',
    role: 'Busy Mom',
    content: 'I booked the basic home clean. They were so fast and quiet, my baby slept through the whole vacuuming process!',
    rating: 5,
    image: 'https://picsum.photos/100/100?random=14'
  },
  {
    id: '6',
    name: 'Robert Wilson',
    role: 'Real Estate Agent',
    content: 'I use them for all my open house preps. The "Premium Spark" package really helps sell the property.',
    rating: 4,
    image: 'https://picsum.photos/100/100?random=15'
  }
];

export const FAQS: FAQItem[] = [
  { category: "Booking", question: "How do I book a service?", answer: "You can book directly through our website by clicking the 'Book Now' button. Select your service, choose a time slot, and you're set!" },
  { category: "Booking", question: "Can I reschedule my booking?", answer: "Yes, you can reschedule up to 24 hours before the appointment via the link in your confirmation email or by calling support." },
  { category: "Service", question: "Do you bring your own supplies?", answer: "Yes, our team comes fully equipped with premium cleaning agents, machines, and tools required for the job." },
  { category: "Service", question: "Is the staff background verified?", answer: "Absolutely. All our professionals undergo rigorous background checks and training before joining the Urban Spark team." },
  { category: "Service", question: "Do I need to be home?", answer: "It is recommended to be there to let us in and for a final inspection, but you can leave us to it if you provide access." },
  { category: "Payments", question: "What if I am not satisfied?", answer: "We offer a 100% satisfaction guarantee. If you're not happy, let us know within 24 hours and we'll re-clean the area for free." },
  { category: "Payments", question: "When do I pay?", answer: "Payment is typically handled after the service is completed to your satisfaction, or online during booking if you prefer." },
];
