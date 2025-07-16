import HeroSection from '../../components/HeroSection';
import LogisticsCycle from '../../components/LogisticsCycle';
import LogisticsEcosystem from '../../components/LogisticsEcosystem';

function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <LogisticsCycle />
      <LogisticsEcosystem />

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