"use client";

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Console</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Build, deploy, and manage your applications with our comprehensive suite of services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Launch a virtual machine"
          desc="Deploy scalable computing capacity in the cloud."
          href="/services/ec2"
          cta="Get started with EC2 →"
        />
        <Card
          title="Store and retrieve data"
          desc="Simple, durable, scalable object storage."
          href="/services/s3"
          cta="Get started with S3 →"
        />
        <Card
          title="Run serverless functions"
          desc="Run code without provisioning servers."
          href="/services/lambda"
          cta="Get started with Lambda →"
        />
      </div>
    </div>
  );
}

function Card({ title, desc, href, cta }: { title: string; desc: string; href: string; cta: string }) {
  return (
    <a href={href} className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:shadow-md transition-shadow block">
      <h3 className="font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{desc}</p>
      <span className="text-indigo-600 dark:text-indigo-400">{cta}</span>
    </a>
  );
}
