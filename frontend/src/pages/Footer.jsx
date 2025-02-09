import { Link } from "react-router-dom";
import ContentWrapper from "../components/ContentWrapper";
import React from "react";


const Footer = () => {
  return (
    <footer className="bg-[#0E1629] text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between gap-8 mb-8">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-bold mb-4"><span className="text-red-500">P</span>rime Next</h2>
            <p className="text-sm">
              Your one-stop shop for the best products at unbeatable prices. We
              bring you quality and convenience at your fingertips.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-[#2765EC]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#2765EC]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#2765EC]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#2765EC]">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Email:</span>{" "}
                support@PrimeNext.com
              </li>
              <li>
                <span className="font-semibold">Phone:</span> +91 9559559559
              </li>
              <li>
                <span className="font-semibold">Address:</span> 123 Main Street,
                Hyderabad, Telangana.
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#2765EC]"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#2765EC]"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#2765EC]"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#2765EC]"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        {/* Bottom Section */}
        <div className="text-center border-t border-gray-600 pt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} <span className="text-red-500">P</span>rime Next. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
