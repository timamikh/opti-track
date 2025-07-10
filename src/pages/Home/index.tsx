function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Optimize your</span>
                  <span className="block text-primary">transportation management</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Streamline your logistics operations with our comprehensive transportation management system.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-light hover:bg-primary-lighter md:py-4 md:text-lg md:px-10"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your fleet
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="relative">
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <img
                    src="/images/solution/route-planning.jpg"
                    alt="Route Planning"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Route Planning</h3>
                <p className="mt-2 text-base text-gray-500">
                  Optimize routes for maximum efficiency and cost savings.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="relative">
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <img
                    src="/images/solution/analytics-reporting.jpg"
                    alt="Analytics & Reporting"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Analytics & Reporting</h3>
                <p className="mt-2 text-base text-gray-500">
                  Make data-driven decisions with comprehensive analytics.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="relative">
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <img
                    src="/images/solution/carrier-management.jpg"
                    alt="Carrier Management"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Carrier Management</h3>
                <p className="mt-2 text-base text-gray-500">
                  Efficiently manage your carrier relationships and contracts.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="relative">
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <img
                    src="/images/solution/transport-orders.jpg"
                    alt="Transport Orders"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Transport Orders</h3>
                <p className="mt-2 text-base text-gray-500">
                  Streamline order management and tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 