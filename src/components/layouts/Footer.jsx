const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-600 to-purple-700 text-white py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left side */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-1">FindMyFYP</h3>
          <p className="text-xs text-purple-200 max-w-xs">
            Partner with experienced supervisors.
          </p>
        </div>

        {/* Right side - copyright */}
        <div className="text-xs text-purple-300 text-center md:text-right">
          &copy; {new Date().getFullYear()} FindMyFYP. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;