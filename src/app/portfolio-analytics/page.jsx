'use client';

import Navbar from '@/components/Navbar';

export default function SocialsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Financial Modeling Workshop",
      date: "Aug 15",
      time: "6:00 PM",
      location: "MSC 2400",
      description: "Learn advanced Excel techniques and financial modeling fundamentals used in investment banking.",
      type: "Workshop",
      spots: 25
    },
    {
      id: 2,
      title: "Industry Networking Mixer",
      date: "Aug 22",
      time: "7:00 PM", 
      location: "Aggie Park",
      description: "Network with finance professionals from Goldman Sachs, JP Morgan, and local firms.",
      type: "Social",
      spots: 50
    },
    {
      id: 3,
      title: "Trading Competition",
      date: "Sep 5",
      time: "2:00 PM",
      location: "Wehner 113",
      description: "Test your trading skills in our annual stock market simulation competition.",
      type: "Competition",
      spots: 30
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">

        {/* Upcoming Events */}
        <section className="py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 lg:mb-0">
              Upcoming Events
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-gray-100 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all">
                
                {/* Event Type Badge */}
                <div className="p-6 pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      event.type === 'Workshop' ? 'bg-blue-900 text-blue-300 border border-blue-700' : 
                      event.type === 'Social' ? 'bg-green-900 text-green-300 border border-green-700' : 
                      'bg-purple-900 text-purple-300 border border-purple-700'
                    }`}>
                      {event.type}
                    </span>
                    <span className="text-sm text-gray-400">{event.spots} spots</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-400">
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        📅
                      </div>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        🕐
                      </div>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        📍
                      </div>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events Highlight */}
        <section className="py-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Recent Highlights</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-2xl text-center border border-gray-800">
              <div className="text-6xl mb-6">🏆</div>
              <h3 className="text-2xl font-bold mb-3">Spring Case Competition</h3>
              <p className="text-gray-400 mb-3">March 2025</p>
              <p className="text-blue-400 font-medium mb-3">45 participants</p>
              <p className="text-gray-300">Students analyzed real M&A deals</p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-2xl text-center border border-gray-800">
              <div className="text-6xl mb-6">💼</div>
              <h3 className="text-2xl font-bold mb-3">Career Fair Prep</h3>
              <p className="text-gray-400 mb-3">February 2025</p>
              <p className="text-green-400 font-medium mb-3">120 attendees</p>
              <p className="text-gray-300">Interview skills and resume reviews</p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-2xl text-center border border-gray-800">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-2xl font-bold mb-3">End of Year Banquet</h3>
              <p className="text-gray-400 mb-3">December 2024</p>
              <p className="text-purple-400 font-medium mb-3">80 members</p>
              <p className="text-gray-300">Celebrated achievements and awards</p>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Interested in joining?</h2>
            <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Click below to RSVP to any of these events
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-200 transition-colors">
                RSVP to Events
              </button>
              <button className="border-2 border-gray-400 text-gray-300 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-600 hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>



        {/* Footer */}
        <footer className="mt-20 border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Texas A&M Scholars of Finance. All rights reserved.</p>
        <p className="mt-2">
            Shaping excellence in student leaders across Texas A&M
        </p>
        </footer>
        



      </main>
    </div>
  );
}