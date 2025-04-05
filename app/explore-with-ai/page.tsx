'use client'
// pages/car-search.js
import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronRight, Send, Star, Car, Sliders } from 'lucide-react';

export default function ConversationalCarSearch() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hi there! I'm your AI car assistant. Tell me what you're looking for in your next vehicle, and I'll help you find the perfect match.",
    },
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let responseMessage;
      
      // Mock responses based on user input
      if (inputValue.toLowerCase().includes('suv')) {
        responseMessage = {
          id: messages.length + 2,
          type: 'assistant',
          content: "Based on your interest in SUVs, I've found several options that might meet your needs.",
          results: {
            title: "SUV Options",
            sources: [
              {
                title: "Honda CR-V Hybrid",
                image: '/api/placeholder/480/280',
                price: "$32,450",
                details: [
                  { label: "Fuel Economy", value: "40 city / 35 highway" },
                  { label: "Cargo Space", value: "39.3 cubic feet" },
                  { label: "Drivetrain", value: "AWD Available" },
                ],
                highlights: [
                  "Class-leading interior space",
                  "Standard Honda Sensing safety features",
                  "Available hybrid powertrain",
                  "Excellent resale value"
                ]
              },
              {
                title: "Toyota RAV4",
                image: '/api/placeholder/480/280',
                price: "$26,975",
                details: [
                  { label: "Fuel Economy", value: "27 city / 35 highway" },
                  { label: "Cargo Space", value: "37.6 cubic feet" },
                  { label: "Drivetrain", value: "FWD or AWD" },
                ],
                highlights: [
                  "Rugged styling with practical features",
                  "Multiple powertrain options including hybrid",
                  "Toyota Safety Sense 2.0",
                  "Adventure and TRD Off-Road trims available"
                ]
              }
            ],
            relatedQuestions: [
              "Which SUV has the best fuel economy?",
              "What's the difference between a crossover and an SUV?",
              "Which SUVs have three rows of seating?"
            ]
          }
        };
      } else if (inputValue.toLowerCase().includes('electric')) {
        responseMessage = {
          id: messages.length + 2,
          type: 'assistant',
          content: "Electric vehicles are a great choice! Here are some excellent options to consider:",
          results: {
            title: "Electric Vehicles",
            sources: [
              {
                title: "Tesla Model Y",
                image: '/api/placeholder/480/280',
                price: "$43,990",
                details: [
                  { label: "Range", value: "330 miles" },
                  { label: "0-60 mph", value: "4.8 seconds" },
                  { label: "Cargo Space", value: "68 cubic feet" },
                ],
                highlights: [
                  "Access to Tesla's Supercharger network",
                  "Over-the-air software updates",
                  "Minimalist interior with 15-inch touchscreen",
                  "Advanced autopilot capabilities"
                ]
              },
              {
                title: "Hyundai IONIQ 5",
                image: '/api/placeholder/480/280',
                price: "$41,450",
                details: [
                  { label: "Range", value: "303 miles" },
                  { label: "Charging", value: "10-80% in 18 min (350kW)" },
                  { label: "Power", value: "Up to 320 hp" },
                ],
                highlights: [
                  "Unique retro-futuristic design",
                  "Vehicle-to-load power capabilities",
                  "Ultra-fast 800V charging architecture",
                  "Spacious, flat floor interior"
                ]
              }
            ],
            relatedQuestions: [
              "What federal tax incentives are available for EVs?",
              "How much does it cost to install a home charger?",
              "Which EVs charge the fastest?"
            ]
          }
        };
      } else if (inputValue.toLowerCase().includes('budget') || inputValue.toLowerCase().includes('affordable')) {
        responseMessage = {
          id: messages.length + 2,
          type: 'assistant',
          content: "Looking for value is smart! Here are some excellent options under $30,000:",
          results: {
            title: "Affordable Options Under $30,000",
            sources: [
              {
                title: "Honda Civic",
                image: '/api/placeholder/480/280',
                price: "$22,550",
                details: [
                  { label: "Fuel Economy", value: "33 city / 42 highway" },
                  { label: "Engine", value: "158 hp turbocharged" },
                  { label: "Warranty", value: "3-year/36,000-mile" },
                ],
                highlights: [
                  "Spacious interior for a compact car",
                  "Standard Honda Sensing safety suite",
                  "Apple CarPlay and Android Auto",
                  "Excellent resale value"
                ]
              },
              {
                title: "Mazda CX-30",
                image: '/api/placeholder/480/280',
                price: "$22,950",
                details: [
                  { label: "Fuel Economy", value: "26 city / 33 highway" },
                  { label: "Engine", value: "186 hp" },
                  { label: "Drivetrain", value: "AWD Available" },
                ],
                highlights: [
                  "Upscale interior quality",
                  "Engaging driving dynamics",
                  "Standard advanced safety features",
                  "Available all-wheel drive"
                ]
              }
            ],
            relatedQuestions: [
              "What are the most reliable cars under $25,000?",
              "Which affordable cars have the lowest maintenance costs?",
              "What are the best fuel-efficient budget cars?"
            ]
          }
        };
      } else {
        responseMessage = {
          id: messages.length + 2,
          type: 'assistant',
          content: "I'd be happy to help you find the right vehicle. To provide better recommendations, could you tell me more about what you're looking for? For example:",
          bullets: [
            "What size vehicle do you need? (compact, midsize, SUV, etc.)",
            "Is fuel efficiency important to you?",
            "Do you have a specific budget range?",
            "Are you interested in specific features like AWD or advanced safety tech?",
            "Are you considering electric or hybrid vehicles?"
          ]
        };
      }
      
      setMessages((prev) => [...prev, responseMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white py-4 px-6 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Car className="h-7 w-7 text-green-500" />
            <h1 className="text-xl font-bold text-gray-800">AutoFinder</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-green-500 font-medium transition duration-300">Browse</a>
            <a href="#" className="text-gray-700 hover:text-green-500 font-medium transition duration-300">Financing</a>
            <a href="#" className="text-gray-700 hover:text-green-500 font-medium transition duration-300">Contact</a>
          </nav>
        </div>
      </header>

      {/* Quick search cards */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Search</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['SUVs & Crossovers', 'Electric Vehicles', 'Under $25,000', 'Luxury Models'].map((category, index) => (
              <button 
                key={index}
                className="bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-200 rounded-xl p-4 text-left transition duration-300 hover:shadow-sm"
                onClick={() => {
                  setInputValue(`Show me ${category.toLowerCase()}`);
                }}
              >
                <h3 className="font-medium text-gray-800">{category}</h3>
                <p className="text-sm text-gray-500 mt-1">Explore options</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-hidden flex flex-col max-w-7xl w-full mx-auto px-6 py-6">
        {/* Chat section with Perplexity-like results */}
        <section className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Search className="w-5 h-5 mr-2 text-green-500" />
              Car AI Assistant
              <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Conversational Search</span>
            </h2>
            <p className="text-sm text-gray-600">Describe what you're looking for in a vehicle, and I'll help you find the perfect match.</p>
          </div>
          
          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  } flex`}
                >
                  <div
                    className={`${
                      message.type === 'user'
                        ? 'bg-green-500 text-white rounded-br-none'
                        : 'bg-gray-50 border border-gray-100 rounded-bl-none text-gray-800'
                    } max-w-3xl rounded-xl p-4 shadow-sm`}
                  >
                    <div className="prose">
                      <p className={message.type === 'user' ? 'text-white mb-0' : 'text-gray-800 mb-2'}>
                        {message.content}
                      </p>
                      
                      {/* Bulleted list */}
                      {message.bullets && (
                        <ul className="mt-2 space-y-1">
                          {message.bullets.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-300 mt-2 mr-2"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Perplexity-like results */}
                    {message.results && (
                      <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                          <h3 className="font-bold text-gray-800">{message.results.title}</h3>
                        </div>
                        
                        {/* Sources/Results */}
                        <div className="divide-y divide-gray-100">
                          {message.results.sources.map((source, index) => (
                            <div key={index} className="p-4">
                              <div className="lg:flex">
                                <div className="lg:w-1/3 mb-4 lg:mb-0 lg:mr-4">
                                  <div className="rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                      src={source.image}
                                      alt={source.title}
                                      className="w-full h-48 object-cover"
                                    />
                                  </div>
                                </div>
                                <div className="lg:w-2/3">
                                  <div className="flex justify-between items-start mb-3">
                                    <h4 className="text-lg font-bold text-gray-800">{source.title}</h4>
                                    <span className="font-bold text-green-500">{source.price}</span>
                                  </div>
                                  
                                  {/* Details grid */}
                                  <div className="grid grid-cols-2 gap-3 mb-4">
                                    {source.details.map((detail, i) => (
                                      <div key={i} className="bg-gray-50 p-2 rounded-lg">
                                        <span className="text-xs text-gray-500 block">{detail.label}</span>
                                        <span className="font-medium text-gray-800">{detail.value}</span>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {/* Highlights */}
                                  <div>
                                    <h5 className="font-medium text-gray-700 mb-2">Highlights</h5>
                                    <ul className="space-y-1">
                                      {source.highlights.map((highlight, i) => (
                                        <li key={i} className="flex items-start text-sm">
                                          <Star className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                          <span>{highlight}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div className="mt-4 flex space-x-3">
                                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transform transition duration-300 hover:scale-95 shadow-sm flex items-center">
                                      View Details
                                      <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                    <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg font-medium transform transition duration-300 hover:scale-95 shadow-sm flex items-center">
                                      Compare
                                      <Sliders className="w-4 h-4 ml-1" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Related questions */}
                        <div className="p-4 bg-gray-50 border-t border-gray-100">
                          <h4 className="font-medium text-gray-700 mb-2">Related Questions</h4>
                          <div className="space-y-2">
                            {message.results.relatedQuestions.map((question, index) => (
                              <button
                                key={index}
                                className="w-full text-left bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 p-3 rounded-lg text-gray-800 font-medium transition-all duration-200 flex justify-between items-center group"
                                onClick={() => setInputValue(question)}
                              >
                                <span>{question}</span>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors duration-200" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl rounded-bl-none p-4 shadow-sm max-w-3xl">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-bounce delay-75"></div>
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe what you're looking for in a vehicle..."
                className="w-full border border-gray-200 rounded-full py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-white bg-green-500 rounded-full hover:bg-green-600 disabled:bg-gray-300 transition duration-300 hover:scale-95"
                disabled={isLoading || !inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-3 text-center flex flex-wrap justify-center gap-2">
              <button 
                className="text-xs bg-white border border-gray-200 hover:border-green-300 text-gray-700 px-3 py-1 rounded-full transition duration-200 hover:bg-green-50"
                onClick={() => setInputValue("I need an SUV with good gas mileage")}
              >
                SUV with good MPG
              </button>
              <button 
                className="text-xs bg-white border border-gray-200 hover:border-green-300 text-gray-700 px-3 py-1 rounded-full transition duration-200 hover:bg-green-50"
                onClick={() => setInputValue("Show me electric vehicles under $50,000")}
              >
                EVs under $50k
              </button>
              <button 
                className="text-xs bg-white border border-gray-200 hover:border-green-300 text-gray-700 px-3 py-1 rounded-full transition duration-200 hover:bg-green-50"
                onClick={() => setInputValue("Family-friendly cars with 3 rows")}
              >
                3-row family vehicles
              </button>
              <button 
                className="text-xs bg-white border border-gray-200 hover:border-green-300 text-gray-700 px-3 py-1 rounded-full transition duration-200 hover:bg-green-50"
                onClick={() => setInputValue("Most reliable cars under $30,000")}
              >
                Reliable under $30k
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}