import React, { useState } from 'react';
import { ChefHat, GlassWater, UserRound } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProviderForm } from '../components/forms/ProviderForm';

export const BecomeProvider: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'chef' | 'bartender' | 'server' | null>(null);

  if (selectedRole) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <button 
          onClick={() => setSelectedRole(null)}
          className="mb-8 text-[#CCFF00] hover:text-[#B8E600] flex items-center gap-2 text-sm font-medium"
        >
          ← Back to roles
        </button>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Apply as {selectedRole}</h1>
            <p className="text-gray-400">Join our network of professional service providers</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl ring-1 ring-white/10 p-8">
            <ProviderForm serviceType={selectedRole} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-6">Join Our Network</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Connect with clients, showcase your expertise, and grow your career in the hospitality industry
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl shadow-xl ring-1 ring-white/10 hover:bg-white/10 transition-all duration-300">
          <ChefHat className="w-12 h-12 text-[#CCFF00] mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-4">Chef</h3>
          <p className="text-gray-400 mb-8">Create exceptional dining experiences with your culinary expertise</p>
          <Button variant="neon" className="w-full" onClick={() => setSelectedRole('chef')}>
            Apply as Chef
          </Button>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl shadow-xl ring-1 ring-white/10 hover:bg-white/10 transition-all duration-300">
          <GlassWater className="w-12 h-12 text-[#CCFF00] mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-4">Bartender</h3>
          <p className="text-gray-400 mb-8">Mix drinks and create memorable moments at events</p>
          <Button variant="neon" className="w-full" onClick={() => setSelectedRole('bartender')}>
            Apply as Bartender
          </Button>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl shadow-xl ring-1 ring-white/10 hover:bg-white/10 transition-all duration-300">
          <UserRound className="w-12 h-12 text-[#CCFF00] mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-4">Server</h3>
          <p className="text-gray-400 mb-8">Provide professional service and enhance guest experiences</p>
          <Button variant="neon" className="w-full" onClick={() => setSelectedRole('server')}>
            Apply as Server
          </Button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-[#CCFF00]/10 to-[#00FF94]/10 p-12 rounded-2xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Why Join Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#CCFF00]/20 flex items-center justify-center">
                <span className="text-[#CCFF00] text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Flexible Schedule</h3>
              <p className="text-gray-400">Work when you want, where you want. You're in control of your schedule.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#CCFF00]/20 flex items-center justify-center">
                <span className="text-[#CCFF00] text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Competitive Pay</h3>
              <p className="text-gray-400">Set your own rates and earn what you deserve for your expertise.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#CCFF00]/20 flex items-center justify-center">
                <span className="text-[#CCFF00] text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Growth Network</h3>
              <p className="text-gray-400">Connect with industry professionals and expand your network.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};