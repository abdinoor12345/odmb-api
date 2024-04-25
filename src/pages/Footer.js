import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <a href="/about" className="text-gray-400 hover:text-white transition duration-300">About Us</a>
          <a href="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a>
          <a href="/terms" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
          <span className="flex justify-center md:col-span-2 lg:col-span-4">Follow Us:</span>
          <a href="https://www.facebook.com" className="text-gray-400 hover:text-white transition duration-300">Facebook</a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white transition duration-300">Twitter</a>
          <a href="https://www.instagram.com" className="text-gray-400 hover:text-white transition duration-300">Instagram</a>
        </div>
        <p className="text-center text-gray-400 text-sm mt-4">© {new Date().getFullYear()} Your Movie Website. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
