import React from 'react';
import { ChefHat, GlassWater, UserRound } from 'lucide-react';

const services = [
  {
    id: 'chef',
    name: 'Chef',
    icon: ChefHat,
    description: 'Professional chef for your event'
  },
  {
    id: 'bartender',
    name: 'Bartender',
    icon: GlassWater,
    description: 'Expert mixologist'
  },
  {
    id: 'server',
    name: 'Server',
    icon: UserRound,
    description: 'Professional wait staff'
  }
];

interface ServiceSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ value, onChange, error }) => {
  const handleChange = (serviceId: string) => {
    const newValue = value.includes(serviceId)
      ? value.filter(id => id !== serviceId)
      : [...value, serviceId];
    onChange(newValue);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-200 mb-2">
        Select Services
      </label>
      <div className="space-y-2">
        {services.map((service) => (
          <label
            key={service.id}
            className="flex items-center p-3 border border-white/10 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={value.includes(service.id)}
              onChange={() => handleChange(service.id)}
              className="h-4 w-4 text-[#CCFF00] focus:ring-[#CCFF00] border-white/20 rounded bg-white/5"
            />
            <div className="ml-3 flex items-center">
              <service.icon className="h-5 w-5 text-[#CCFF00] mr-2" />
              <div>
                <p className="text-sm font-medium text-white">{service.name}</p>
                <p className="text-xs text-gray-400">{service.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};