function Features() {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Smart Packing Lists</h3>
            <p className="mt-4 text-gray-600">Create custom packing lists tailored to your trip.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Weather Insights</h3>
            <p className="mt-4 text-gray-600">Get weather forecasts for your destination.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Easy Sharing</h3>
            <p className="mt-4 text-gray-600">Share your lists with travel companions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
