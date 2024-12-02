import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/Header';
import { PostEvent } from './pages/PostEvent';
import { BecomeProvider } from './pages/BecomeProvider';
import { EventMatches } from './pages/EventMatches';
import { ProviderDashboard } from './pages/ProviderDashboard';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { PaymentPage } from './pages/PaymentPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { Button } from './components/ui/Button';
import { AuthProvider } from './contexts/AuthContext';
import { ChefHat, Calendar, Users, CheckCircle, Star, ArrowRight, PhoneCall } from 'lucide-react';
import { CallbackModal } from './components/callback/CallbackModal';
import { testimonials } from './data/testimonials';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export default function App() {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleOpenCallbackModal = () => {
    setIsCallbackModalOpen(true);
    setShowConfirmation(false);
  };

  const handleCloseCallbackModal = () => {
    setIsCallbackModalOpen(false);
    setShowConfirmation(false);
  };

  const handleCallbackSuccess = () => {
    setShowConfirmation(true);
    // Close modal after 3 seconds
    setTimeout(handleCloseCallbackModal, 3000);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[#0A0A0A]">
            <Header />
            <Routes>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/post-event" element={<PostEvent />} />
              <Route path="/become-provider" element={<BecomeProvider />} />
              <Route path="/event-matches/:eventId" element={<EventMatches />} />
              <Route path="/provider/dashboard" element={<ProviderDashboard />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/" element={
                <>
                  {/* Hero Section */}
                  <section className="relative h-screen flex items-center">
                    <div className="absolute inset-0 z-0">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#0A0A0A]" />
                      <img
                        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3"
                        alt="Elegant event service"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                      <h1 className="text-7xl font-bold tracking-tight text-white mb-6">
                        Elevate Your Event
                        <span className="block neon-gradient">Professional Staff, Exceptional Service</span>
                      </h1>
                      <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                        Find skilled bartenders, chefs, and F&B staff for your next event in just a few clicks.
                      </p>
                      <div className="mt-12 flex items-center justify-center gap-6">
                        <Link to="/post-event">
                          <Button size="lg" variant="primary">
                            I'm Hosting an Event
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                        <Link to="/become-provider">
                          <Button variant="neon" size="lg">
                            I'm a Service Provider
                          </Button>
                        </Link>
                        <Button
                          variant="glass"
                          size="lg"
                          onClick={handleOpenCallbackModal}
                          className="flex items-center gap-2"
                        >
                          <PhoneCall className="w-5 h-5" />
                          Request a Call Back
                        </Button>
                      </div>
                    </div>
                  </section>

                  {/* Features Section */}
                  <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#111]">
                    <div className="max-w-7xl mx-auto px-4">
                      <div className="grid md:grid-cols-2 gap-16">
                        <div className="space-y-12">
                          <h2 className="text-3xl font-bold text-white">For Event Hosts</h2>
                          <div className="space-y-8">
                            <div className="flex gap-4">
                              <Calendar className="w-8 h-8 text-[#CCFF00]" />
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                  Easy Planning
                                </h3>
                                <p className="text-gray-400">
                                  Plan your perfect event by providing essential details.
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <Users className="w-8 h-8 text-[#CCFF00]" />
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                  Perfect Matches
                                </h3>
                                <p className="text-gray-400">
                                  Match with skilled professionals who fit your requirements.
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <CheckCircle className="w-8 h-8 text-[#CCFF00]" />
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                  Hassle-free Booking
                                </h3>
                                <p className="text-gray-400">
                                  Simple confirmation and payment process.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-12">
                          <h2 className="text-3xl font-bold text-white">For Service Providers</h2>
                          <div className="space-y-8">
                            <div className="flex gap-4">
                              <Star className="w-8 h-8 text-[#CCFF00]" />
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                  Showcase Your Skills
                                </h3>
                                <p className="text-gray-400">
                                  Present your expertise to the right audience.
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <Calendar className="w-8 h-8 text-[#CCFF00]" />
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                  Flexible Schedule
                                </h3>
                                <p className="text-gray-400">
                                  Accept opportunities that match your availability.
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <ChefHat className="w-8 h-8 text-[#CCFF00]" />
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                  Grow Your Career
                                </h3>
                                <p className="text-gray-400">
                                  Build your reputation and expand your network.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* How It Works Section */}
                  <section className="py-24 bg-[#111]">
                    <div className="max-w-7xl mx-auto px-4">
                      <h2 className="text-4xl font-bold text-center text-white mb-16">
                        How It Works
                      </h2>
                      <div className="grid md:grid-cols-3 gap-12">
                        {[
                          {
                            step: "1",
                            title: "Fill Out Event Details",
                            description: "Tell us what you need: date, type of service, and more.",
                            icon: Calendar
                          },
                          {
                            step: "2",
                            title: "Get Matched Instantly",
                            description: "We connect you with the best professionals for your event.",
                            icon: Users
                          },
                          {
                            step: "3",
                            title: "Relax & Celebrate",
                            description: "Enjoy a flawless event with trusted, professional staff.",
                            icon: ChefHat
                          }
                        ].map((item, index) => (
                          <div key={index} className="text-center">
                            <div className="w-16 h-16 rounded-full bg-[#CCFF00]/20 flex items-center justify-center mx-auto mb-6">
                              <item.icon className="w-8 h-8 text-[#CCFF00]" />
                            </div>
                            <div className="text-2xl font-bold text-[#CCFF00] mb-4">Step {item.step}</div>
                            <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                            <p className="text-gray-400">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Testimonials Section */}
                  <section className="py-24 bg-gradient-to-b from-[#111] to-[#0A0A0A]">
                    <div className="max-w-7xl mx-auto px-4">
                      <h2 className="text-4xl font-bold text-center text-white mb-16">
                        What People Say
                      </h2>
                      <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                          <div key={index} className="bg-white/5 backdrop-blur-lg p-8 rounded-xl ring-1 ring-white/10">
                            <div className="flex mb-6">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-[#CCFF00]" fill="#CCFF00" />
                              ))}
                            </div>
                            <blockquote className="text-gray-300 mb-6">
                              "{testimonial.quote}"
                            </blockquote>
                            <div>
                              <div className="font-semibold text-white">{testimonial.author}</div>
                              <div className="text-sm text-gray-400">{testimonial.role}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </>
              } />
            </Routes>

            <CallbackModal
              isOpen={isCallbackModalOpen}
              onClose={handleCloseCallbackModal}
              showConfirmation={showConfirmation}
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}