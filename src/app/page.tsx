import Navbar from './components/Navbar';
import Sidebar from './components/sidebar';

export default function Home() {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="main-content bg-gray-100 dark:bg-gray-950">
          <div className="max-w-5xl mx-auto py-12 px-4">
            <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to the Console
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Build, deploy, and manage your applications with our comprehensive suite of services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {/* Service cards */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Launch a virtual machine</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Deploy scalable computing capacity in the cloud.</p>
                  <a href="/services/ec2" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
                    Get started with EC2 →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Store and retrieve data</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Simple, durable, scalable object storage.</p>
                  <a href="/services/s3" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
                    Get started with S3 →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Run serverless functions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Run code without provisioning servers.</p>
                  <a href="/services/lambda" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
                    Get started with Lambda →
                  </a>
                </div>
              </div>
              
              <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Getting Started Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/documentation" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center text-sm">
                    <span className="mr-2">📚</span> Documentation and tutorials
                  </a>
                  <a href="/pricing" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center text-sm">
                    <span className="mr-2">💰</span> Pricing calculator
                  </a>
                  <a href="/examples" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center text-sm">
                    <span className="mr-2">🔍</span> Sample projects
                  </a>
                  <a href="/support" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center text-sm">
                    <span className="mr-2">🛟</span> Support center
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}