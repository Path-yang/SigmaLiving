export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to SilverSigma
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your AI companion for seniors in Singapore
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Talk to AI</h2>
          <p className="text-gray-600 mb-4">
            Have conversations with our friendly AI companion using voice or text.
          </p>
          <a 
            href="/assistant" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Start Chatting
          </a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Share Moments</h2>
          <p className="text-gray-600 mb-4">
            Share photos and updates with your family and friends.
          </p>
          <a 
            href="/feed" 
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            View Feed
          </a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Learn Hobbies</h2>
          <p className="text-gray-600 mb-4">
            Discover new hobbies and activities to keep you engaged.
          </p>
          <a 
            href="/hobbies" 
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
          >
            Explore Hobbies
          </a>
        </div>
      </div>
    </div>
  );
}
