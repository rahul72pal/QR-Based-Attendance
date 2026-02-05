// import React from 'react'

// type Props = {}

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-medium">
          Copyright © {new Date().getFullYear()} Rahul Pal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
