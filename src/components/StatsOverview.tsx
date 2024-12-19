import React from 'react';
import { useStore } from '@/lib/store';
import { Card } from './ui/card';
import { AlertTriangle, Users, CheckCircle, Clock, TrendingUp, MapPin, AlertOctagon, Shield } from 'lucide-react';

export function StatsOverview() {
  const { incidents, volunteers } = useStore();

  const stats = {
    activeIncidents: incidents.filter(i => i.status !== 'resolved').length,
    totalVolunteers: volunteers.length,
    resolvedIncidents: incidents.filter(i => i.status === 'resolved').length,
    avgResponseTime: '2.5 hours',
    recentIncidents: incidents
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5),
    severityCount: {
      high: incidents.filter(i => i.severity === 'high').length,
      medium: incidents.filter(i => i.severity === 'medium').length,
      low: incidents.filter(i => i.severity === 'low').length,
    }
  };

  const getSeverityEmoji = (severity: string) => {
    switch (severity) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'inProgress':
        return '🔄';
      case 'resolved':
        return '✅';
      default:
        return '❓';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-text flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Platform Overview
        </h2>
        <span className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-border p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Incidents 🚨</p>
              <h3 className="text-2xl font-bold">{stats.activeIncidents}</h3>
            </div>
          </div>
        </Card>

        <Card className="gradient-border p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Volunteers 🦸‍♂️</p>
              <h3 className="text-2xl font-bold">{stats.totalVolunteers}</h3>
            </div>
          </div>
        </Card>

        <Card className="gradient-border p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Resolved Incidents ✨</p>
              <h3 className="text-2xl font-bold">{stats.resolvedIncidents}</h3>
            </div>
          </div>
        </Card>

        <Card className="gradient-border p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Response Time ⚡</p>
              <h3 className="text-2xl font-bold">{stats.avgResponseTime}</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Recent Incidents 📊</h3>
          </div>
          <div className="space-y-4">
            {stats.recentIncidents.map((incident) => (
              <div
                key={incident.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span>{getSeverityEmoji(incident.severity)}</span>
                    <h4 className="font-medium">{incident.title}</h4>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-500 space-x-4">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>ID: {incident.id.slice(0, 8)}</span>
                    </span>
                    <span>{getStatusEmoji(incident.status)} {incident.status}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(incident.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AlertOctagon className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold">Severity Distribution 📈</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="font-medium">High Priority 🔴</span>
              <span className="text-lg font-bold">{stats.severityCount.high}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium">Medium Priority 🟡</span>
              <span className="text-lg font-bold">{stats.severityCount.medium}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Low Priority 🟢</span>
              <span className="text-lg font-bold">{stats.severityCount.low}</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Total Active Incidents</span>
              <span className="font-medium">{stats.activeIncidents} 📝</span>
            </div>
            <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
              <span>Response Rate</span>
              <span className="font-medium">92% ⚡</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}