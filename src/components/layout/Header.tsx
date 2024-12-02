import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, Bell, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-white/5 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-white">
            F&B Connect
          </Link>
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#CCFF00] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-[#CCFF00] transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#CCFF00] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="neon" onClick={() => navigate('/post-event')}>
                Post Event
              </Button>
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <Bell className="h-5 w-5 text-gray-400" />
              </button>
              <button 
                onClick={logout}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <LogOut className="h-5 w-5 text-gray-400" />
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="secondary">Sign in</Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="primary">Get Started →</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};