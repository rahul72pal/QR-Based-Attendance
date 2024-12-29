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

const handleClickChoosePlan = ()=>{
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-[#000814]  shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
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
            <p className="text-sm font-medium text-white">
              Contact Rahul Pal
            </p>
            <p className="mt-1 text-sm text-gray-200">
              Mob:- 8962113963
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l bg-[#000814] ">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-yellow-400 hover:text-yellow-500 focus:outline-none focus:ring-2 "
        >
          Close
        </button>
      </div>
    </div>
  ))
}

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
    <div className="w-[350px] px-2 esm:w-[90%] sm:w-3/4 md:w-1/2 lg:w-1/3">
      <div className="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-[#000814] px-6 py-8 shadow-pricing sm:p-10 lg:px-6 lg:py-10 xl:p-[50px]">
        <span className="mb-3 block text-lg font-semibold text-primary esm:text-base">
          {type}
        </span>
        <h2 className="mb-5 text-[32px] font-bold text-white esm:text-[24px] sm:text-[36px] lg:text-[42px]">
          {price}
          <span className="text-base font-medium text-body-color esm:text-sm sm:text-base">
            / {subscription}
          </span>
        </h2>
        <p className="mb-8 border-b border-stroke pb-8 text-base text-body-color esm:text-sm sm:text-base">
          {description}
        </p>
        <div className="mb-9 flex flex-col gap-[10px] esm:gap-[8px] sm:gap-[12px] lg:gap-[14px]">
          {children}
        </div>
        {/* <a
          href="/#"
          className={`${
            active
              ? "block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90 esm:text-sm sm:text-base"
              : "block w-full rounded-md border border-stroke bg-transparent p-3 text-center text-base font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-white esm:text-sm sm:text-base"
          }`}
        >
          {buttonText}
        </a> */}
        <Button
        onClick={handleClickChoosePlan}
          className={`block font-bold w-full rounded-md border border-primary bg-white p-3 text-center text-base text-black transition hover:bg-black hover:text-white esm:text-sm sm:text-base ${
            active ? "border-primary" : "border-stroke"
          }`}
        >
          {buttonText}
        </Button>

        <div>
          <span className="absolute right-0 top-7 z-[-1]">
            <svg
              width={77}
              height={172}
              viewBox="0 0 77 172"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx={86} cy={86} r={86} fill="url(#paint0_linear)" />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1={86}
                  y1={0}
                  x2={86}
                  y2={172}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#3056D3" stopOpacity="0.09" />
                  <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="absolute right-4 top-4 z-[-1]">
            <svg
              width={41}
              height={89}
              viewBox="0 0 41 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="38.9138"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 38.9138 87.4849)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 38.9138 74.9871)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 38.9138 62.4892)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 38.9138 38.3457)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 38.9138 13.634)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 38.9138 50.2754)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 38.9138 26.1319)"
                fill="#3056D3"
              />
              <circle
                cx="38.9138"
                cy="1.42021"
                r="1.42021"
                transform="rotate(180 38.9138 1.42021)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 26.4157 87.4849)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 26.4157 74.9871)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 26.4157 62.4892)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 26.4157 38.3457)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 26.4157 13.634)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 26.4157 50.2754)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 26.4157 26.1319)"
                fill="#3056D3"
              />
              <circle
                cx="26.4157"
                cy="1.4202"
                r="1.42021"
                transform="rotate(180 26.4157 1.4202)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 13.9177 87.4849)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 13.9177 74.9871)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 13.9177 62.4892)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 13.9177 38.3457)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 13.9177 13.634)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 13.9177 50.2754)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 13.9177 26.1319)"
                fill="#3056D3"
              />
              <circle
                cx="13.9177"
                cy="1.42019"
                r="1.42021"
                transform="rotate(180 13.9177 1.42019)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="87.4849"
                r="1.42021"
                transform="rotate(180 1.41963 87.4849)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="74.9871"
                r="1.42021"
                transform="rotate(180 1.41963 74.9871)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="62.4892"
                r="1.42021"
                transform="rotate(180 1.41963 62.4892)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="38.3457"
                r="1.42021"
                transform="rotate(180 1.41963 38.3457)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="13.634"
                r="1.42021"
                transform="rotate(180 1.41963 13.634)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="50.2754"
                r="1.42021"
                transform="rotate(180 1.41963 50.2754)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="26.1319"
                r="1.42021"
                transform="rotate(180 1.41963 26.1319)"
                fill="#3056D3"
              />
              <circle
                cx="1.41963"
                cy="1.4202"
                r="1.42021"
                transform="rotate(180 1.41963 1.4202)"
                fill="#3056D3"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

// Define props for List component
interface ListProps {
  children: ReactNode;
}

// List Component
const List: React.FC<ListProps> = ({ children }) => {
  return <p className="text-base text-body-color">{children}</p>;
};

// Main Pricing Component
const Pricing: React.FC = () => {
  const router = useNavigate();
  return (
    <section className="relative z-1 overflow-hidden bg-[#000814] pb-12 lg:pb-[90px] sm:pt-[20px] pt-[120px]">
      <Button onClick={() => router(-1)} className=" mb-6 ml-6 sm:text-xs">
        <IoArrowBackSharp />
        Back
      </Button>
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Pricing Table
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-white sm:text-4xl md:text-[40px]">
                Our Pricing Plan
              </h2>
              <p className="text-base text-body-color">
                Streamline your attendance management with our comprehensive
                plans. Generate individual student ID cards and take advantage
                of QR-based attendance tracking for effortless monitoring.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {/* Free Plan */}
          <PricingCard
            type="Free"
            price="₹0"
            subscription="7 months"
            description="Best for individuals who want to explore basic features."
            buttonText="Choose Free"
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
            <List>First 5 User 100₹ OFF</List>
            <List>6 Month 300₹ OFFER</List>
          </PricingCard>

          {/* ₹159 Plan */}
          <PricingCard
            type="Premium"
            price="₹159"
            subscription="month"
            description="Ideal for institutions with larger class needs and extra features."
            buttonText="Choose Premium"
          >
            <List>20 Classes</List>
            <List>100 Students</List>
            <List>1 Year Validation</List>
            <List>Custom ID Card</List>
            <List>QR-based Attendance</List>
            <List>First 5 User 100₹ OFF</List>
            <List>6 Month 300₹ OFFER</List>
          </PricingCard>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
