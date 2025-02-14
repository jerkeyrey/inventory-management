import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border p-4 text-center">
      <p className="text-muted-foreground">
        &copy; {new Date().getFullYear()} invmanager. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;