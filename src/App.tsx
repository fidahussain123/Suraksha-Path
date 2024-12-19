import React, { useState } from 'react';
import { MapPin, AlertTriangle, Users, MessageSquare, Shield, Activity, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SplashScreen } from '@/components/SplashScreen';
import { IncidentForm } from '@/features/incidents/IncidentForm';
import { IncidentList } from '@/features/incidents/IncidentList';
import { IncidentMap } from '@/features/map/IncidentMap';
import { VolunteerForm } from '@/features/volunteers/VolunteerForm';
import { VolunteerList } from '@/features/volunteers/VolunteerList';
import { OrganizationChat } from '@/features/communication/OrganizationChat';
import { StatsOverview } from '@/components/StatsOverview';
import { AiNews } from '@/features/ai-news/AiNews';
import './styles/animations.css';

function App() {
  const [activeTab, setActiveTab] = useState('incidents');

  return (
    <>
      <SplashScreen />
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center animate-slide-in">
                <Shield className="h-10 w-10 text-blue-500 mr-3" />
                <div>
                  <h1 className="text-3xl font-bold gradient-text">
                    सुरक्षाPath
                  </h1>
                  <p className="text-sm text-gray-500">Empowering Communities in Crisis</p>
                </div>
              </div>
              <nav className="flex space-x-4">
                <Button 
                  variant={activeTab === 'incidents' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('incidents')}
                  className="hover-scale"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Incidents
                </Button>
                <Button 
                  variant={activeTab === 'volunteers' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('volunteers')}
                  className="hover-scale"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Volunteers
                </Button>
                <Button 
                  variant={activeTab === 'stats' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('stats')}
                  className="hover-scale"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Stats
                </Button>
                <Button 
                  variant={activeTab === 'communication' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('communication')}
                  className="hover-scale"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Communication
                </Button>
                <Button 
                  variant={activeTab === 'ai-news' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('ai-news')}
                  className="hover-scale"
                >
                  <Cpu className="h-4 w-4 mr-2" />
                  AI News
                </Button>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'stats' ? (
            <StatsOverview />
          ) : activeTab === 'ai-news' ? (
            <AiNews />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                {activeTab === 'incidents' && (
                  <>
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-semibold mb-4 gradient-text">Report Incident</h2>
                      <IncidentForm />
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                      <h2 className="text-xl font-semibold mb-4 gradient-text">Recent Incidents</h2>
                      <IncidentList />
                    </div>
                  </>
                )}
                {activeTab === 'volunteers' && (
                  <>
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-semibold mb-4 gradient-text">Volunteer Registration</h2>
                      <VolunteerForm />
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                      <h2 className="text-xl font-semibold mb-4 gradient-text">Active Volunteers</h2>
                      <VolunteerList />
                    </div>
                  </>
                )}
                {activeTab === 'communication' && (
                  <div className="animate-fade-in">
                    <h2 className="text-xl font-semibold mb-4 gradient-text">Direct Communication</h2>
                    <OrganizationChat />
                  </div>
                )}
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                <h2 className="text-xl font-semibold mb-4 gradient-text">Resource Map</h2>
                <IncidentMap />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;