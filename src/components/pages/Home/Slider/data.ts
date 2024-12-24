const images = [
  "./assets/img1.png",
  "./assets/img2.png",
  "./assets/img3.png",
  "./assets/img4.png",
  "./assets/img5.png",
  "./assets/img6.png",
  "./assets/img7.png",
  "./assets/img8.png",
  "./assets/img9.png",
  "./assets/img10.png",
  "./assets/img11.png",
  "./assets/img12.png",
  "./assets/img13.png",
  "./assets/img14.png",
];

// Define an interface for the items in the array
interface CardItem {
  id: number;
  bgColor: string;
  icon: string; // Use JSX.Element for React components
  title: string;
  desc: string;
}

// Create an array of items with the defined interface
const cardItems: CardItem[] = [
  {
    id: 1,
    bgColor: "#F54748",
    icon: images[0],
    title: "Efficient QR Attendance",
    desc: "Simplify attendance management with quick and accurate QR scans. Save time and eliminate errors with our seamless system. Perfect for educators and students alike.",
  },
  {
    id: 2,
    bgColor: "#7952B3",
    icon: images[1],
    title: "Free and Easy-to-Use",
    desc: "Our free platform offers a user-friendly experience for everyone. Manage attendance effortlessly without technical hassles. Get started instantly with zero cost.",
  },
  {
    id: 3,
    bgColor: "#1597BB",
    icon: images[2],
    title: "Accurate Data Tracking",
    desc: "Keep attendance records precise and error-free with advanced tracking. Reliable logging ensures data is always available. Focus more on teaching, not admin tasks.",
  },
  {
    id: 4,
    bgColor: "#185ADB",
    icon: images[3],
    title: "Accessible Anywhere",
    desc: "Monitor attendance data from any device, anytime. Stay connected whether at home or in the classroom. A fully web-based solution for ultimate convenience.",
  },
  {
    id: 5,
    bgColor: "#FF616D",
    icon: images[4],
    title: "Secure and Reliable",
    desc: "Protect your data with our secure and reliable platform. Trustworthy encryption keeps your information safe. Enjoy uninterrupted access at all times.",
  },
  {
    id: 6,
    bgColor: "#FFC947",
    icon: images[5],
    title: "For Educators & Students",
    desc: "A system designed for both educators and students to thrive. Teachers track attendance effortlessly, and students stay accountable. Making classrooms smarter.",
  },
  {
    id: 7,
    bgColor: "#4CAF50",
    icon: images[6],
    title: "Comprehensive Reports",
    desc: "Generate detailed attendance reports instantly. Get insights into patterns and trends with ease. Perfect for daily, weekly, or monthly analysis.",
  },
  {
    id: 8,
    bgColor: "#FF9800",
    icon: images[7],
    title: "Customizable Solutions",
    desc: "Adapt the system to meet your institution's needs. Flexible settings make integration seamless. A solution tailored just for you.",
  },
  {
    id: 9,
    bgColor: "#9C27B0",
    icon: images[8],
    title: "No Setup Costs",
    desc: "Start using the platform without any setup fees. Completely free and accessible to all institutions. Manage attendance with zero investment.",
  },
  {
    id: 10,
    bgColor: "#03A9F4",
    icon: images[9],
    title: "Innovative Platform",
    desc: "Experience the future of attendance management. QR technology makes it efficient and reliable. Revolutionize how you track attendance today.",
  },
];

// Export the array
export default cardItems;
