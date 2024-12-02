import React from 'react';
import { EventForm } from '../components/forms/EventForm';
import { CalendarDays } from 'lucide-react';

export const PostEvent: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0A0A0A] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
            <CalendarDays className="w-8 h-8 text-[#CCFF00]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Post Your Event</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Tell us about your event and we'll match you with the perfect service providers
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl ring-1 ring-white/10 p-8">
          <EventForm />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-lg ring-1 ring-white/10">
            <div className="w-10 h-10 rounded-full bg-[#CCFF00]/20 flex items-center justify-center mb-4">
              <span className="text-[#CCFF00] font-bold">1</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Share Details</h3>
            <p className="text-gray-400 text-sm">
              Provide your event information and requirements
            </p>
          </div>
          
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-lg ring-1 ring-white/10">
            <div className="w-10 h-10 rounded-full bg-[#CCFF00]/20 flex items-center justify-center mb-4">
              <span className="text-[#CCFF00] font-bold">2</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Get Matched</h3>
            <p className="text-gray-400 text-sm">
              We'll connect you with qualified service providers
            </p>
          </div>
          
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-lg ring-1 ring-white/10">
            <div className="w-10 h-10 rounded-full bg-[#CCFF00]/20 flex items-center justify-center mb-4">
              <span className="text-[#CCFF00] font-bold">3</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Confirm Booking</h3>
            <p className="text-gray-400 text-sm">
              Review and select your preferred providers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};