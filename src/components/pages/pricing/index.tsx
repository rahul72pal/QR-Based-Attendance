import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Define props for PricingCard
interface PricingCardProps {
  children?: ReactNode;
  description: string;
  price: string | number;
  type: string;
  subscription: string;
  buttonText: string;
  active?: boolean;
}

const handleClickChoosePlan = () => {
  toast.custom((t) => (
    <div
      className={`${t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-popover shadow-lg rounded-lg border border-border pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src="https://avatars.githubusercontent.com/u/110774048?s=400&u=cf40be6dde0eea7aab508087feaee4c7f5c8c6db&v=4"
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-foreground">
              Contact Rahul Pal
            </p>
            <p className="mt-1 text-sm text-muted-foreground">mob: 8962113963</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-border">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Close
        </button>
      </div>
    </div>
  ));
};

// PricingCard Component
const PricingCard: React.FC<PricingCardProps> = ({
  children,
  description,
  price,
  type,
  subscription,
  buttonText,
  active = false,
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
      <div
        className={`relative z-10 overflow-hidden rounded-3xl border px-8 py-10 transition-all duration-300 flex flex-col h-full ${active
          ? "border-primary bg-primary/5 shadow-glow scale-[1.02]"
          : "border-white/10 bg-card hover:border-primary/50 hover:bg-card/80"
          }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <span className={`text-sm font-bold tracking-widest uppercase ${active ? 'text-primary' : 'text-muted-foreground'}`}>
            {type}
          </span>
          {active && <span className="px-3 py-1 text-xs font-bold text-background bg-primary rounded-full">MOST POPULAR</span>}
        </div>

        <h2 className="mb-4 text-5xl font-bold font-title text-foreground tracking-tight">
          {price}
          <span className="text-lg font-medium text-muted-foreground ml-2">
            / {subscription}
          </span>
        </h2>

        <p className="mb-8 text-muted-foreground text-sm leading-relaxed font-light border-b border-border/50 pb-8">
          {description}
        </p>

        <div className="mb-10 flex flex-col gap-4 flex-grow">{children}</div>

        <Button
          onClick={handleClickChoosePlan}
          className={`w-full py-7 font-bold text-lg rounded-xl transition-all duration-300 mt-auto ${active
            ? "bg-primary text-primary-foreground hover:bg-white hover:text-background shadow-lg hover:shadow-glow"
            : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
        >
          {buttonText}
        </Button>

        {/* Decorative background glow for active card */}
        {active && (
          <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        )}
      </div>
    </div>
  );
};

// ... (keep List and handleClickChoosePlan components as is, but ensure List uses theme color)

// List Component
// Define props for List component
interface ListProps {
  children: ReactNode;
}

// List Component
const List: React.FC<ListProps> = ({ children }) => {
  return (
    <div className="flex items-start text-foreground text-sm gap-3">
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs mt-0.5 shrink-0">
        ✓
      </span>
      <span className="opacity-90">{children}</span>
    </div>
  );
};

// Main Pricing Component
const Pricing: React.FC = () => {
  const router = useNavigate();
  return (
    <section className="relative z-1 overflow-hidden bg-background pt-32 pb-24">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-3xl rounded-full -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Button
            variant="ghost"
            onClick={() => router(-1)}
            className="group flex items-center gap-2 text-muted-foreground hover:text-primary pl-0 transition-colors"
          >
            <IoArrowBackSharp className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </div>

        <div className="mx-auto mb-20 max-w-[700px] text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4 border border-primary/20">
            Flexible Pricing
          </span>
          <h2 className="mb-6 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl font-title text-gradient-gold">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            Streamline your attendance management with our comprehensive plans.
            Scale effortlessly as your organization grows.
          </p>
        </div>

        <div className="flex flex-wrap justify-center -mx-4">
          {/* Free Plan */}
          <PricingCard
            type="Free"
            price="₹0"
            subscription="7 months"
            description="Best for individuals who want to explore basic features."
            buttonText="Get Started"
          >
            <List>5 Classes</List>
            <List>25 Students</List>
            <List>7 Months Validation</List>
            <List>QR Attendance</List>
          </PricingCard>

          {/* ₹59 Plan */}
          <PricingCard
            type="Standard"
            price="₹59"
            subscription="month"
            description="Perfect for educators managing mid-sized classes."
            buttonText="Choose Standard"
            active
          >
            <List>12 Classes</List>
            <List>50 Students</List>
            <List>1 Year Validation</List>
            <List>QR-based Attendance</List>
            <List>First 5 Users ₹50 OFF</List>
            <List>6 Months ₹350 OFFER</List>
            <List>12 Months ₹750 OFFER</List>
          </PricingCard>

          {/* ₹159 Plan */}
          <PricingCard
            type="Premium"
            price="₹159"
            subscription="month"
            description="Ideal for institutions with larger class needs and extra features."
            buttonText="Go Premium"
          >
            <List>20 Classes</List>
            <List>100 Students</List>
            <List>1 Year Validation</List>
            <List>Custom ID Card</List>
            <List>QR-based Attendance</List>
            <List>First 5 Users ₹100 OFF</List>
            <List>6 Months ₹450 OFFER</List>
            <List>12 Months ₹900 OFFER</List>
          </PricingCard>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
