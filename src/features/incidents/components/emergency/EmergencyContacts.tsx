import React from 'react';
import { Phone, Building, AlertTriangle, Ambulance, Shield } from 'lucide-react';

export function EmergencyContacts() {
  const emergencyServices = [
    {
      name: "National Emergency Number",
      number: "112",
      description: "Unified Emergency Helpline",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />
    },
    {
      name: "National Disaster Response Force (NDRF)",
      number: "011-24363260",
      description: "24x7 National Emergency Operation Center",
      icon: <Shield className="h-5 w-5 text-blue-500" />
    },
    {
      name: "Police Emergency",
      number: "100",
      description: "Law Enforcement Emergency",
      icon: <Shield className="h-5 w-5 text-blue-500" />
    },
    {
      name: "Ambulance Services",
      number: "108",
      description: "Medical Emergency Response",
      icon: <Ambulance className="h-5 w-5 text-green-500" />
    }
  ];

  const disasterManagementOrgs = [
    {
      name: "National Disaster Management Authority",
      number: "011-26701728",
      website: "https://ndma.gov.in",
      description: "Control Room - 24x7 Emergency Response"
    },
    {
      name: "Indian Red Cross Society",
      number: "011-23359379",
      website: "https://indianredcross.org",
      description: "24x7 Emergency Response & Relief"
    },
    {
      name: "State Disaster Response Force",
      number: "1070",
      description: "State-level Emergency Response"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Phone className="h-5 w-5 mr-2 text-red-500" />
          Emergency Numbers
        </h3>
        <div className="grid gap-4">
          {emergencyServices.map((service) => (
            <div
              key={service.number}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  {service.icon}
                  <div>
                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  </div>
                </div>
                <a
                  href={`tel:${service.number}`}
                  className="text-red-600 font-semibold hover:text-red-800 text-lg"
                >
                  {service.number}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building className="h-5 w-5 mr-2 text-blue-500" />
          Disaster Management Organizations
        </h3>
        <div className="grid gap-4">
          {disasterManagementOrgs.map((org) => (
            <div
              key={org.number}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{org.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{org.description}</p>
                  {org.website && (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 mt-1 block"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
                <a
                  href={`tel:${org.number}`}
                  className="text-blue-600 font-semibold hover:text-blue-800 text-lg"
                >
                  {org.number}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}