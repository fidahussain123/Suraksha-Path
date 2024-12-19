import React from 'react';
import { AlertTriangle, Phone, Building, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EmergencyContacts } from './emergency/EmergencyContacts';
import { useEmergencyContact } from '../hooks/useEmergencyContact';

interface SOSDialogProps {
  isOpen: boolean;
  onClose: () => void;
  incidentType: string;
  location: string;
}

export function SOSDialog({ isOpen, onClose, incidentType, location }: SOSDialogProps) {
  const { sendEmergencyAlert, loading, success } = useEmergencyContact();

  const handleSendSOS = async () => {
    await sendEmergencyAlert({
      incidentType,
      location,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
              <DialogTitle className="text-2xl font-bold">Emergency SOS</DialogTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-4">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                <Send className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                SOS Alert Sent Successfully
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Emergency services have been notified and help is on the way.</p>
                <p>Please stay at your current location if it's safe to do so.</p>
                <p className="font-medium">Emergency Response Team will contact you shortly.</p>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Your emergency ticket number: <span className="font-mono font-bold">EM-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                </p>
              </div>
              <Button className="mt-4" onClick={onClose}>
                Close
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-red-800 font-medium">Emergency Situation</h3>
                    <p className="text-red-700 mt-1">
                      Incident Type: {incidentType}<br />
                      Location: {location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <EmergencyContacts />
                
                <div className="border-t pt-6">
                  <Button
                    onClick={handleSendSOS}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                        <span>Sending Emergency Alert...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <AlertTriangle className="h-5 w-5" />
                        <span>SEND SOS ALERT</span>
                      </span>
                    )}
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    Click to immediately alert emergency services
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}