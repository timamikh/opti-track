import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/images/logo.svg"
                alt="Opti-track"
              />
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-primary"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 