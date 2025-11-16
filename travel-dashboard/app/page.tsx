'use client';

import { useState } from 'react';
import { PlusCircle, MapPin, Calendar, DollarSign, Trash2, CheckCircle, Circle } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  dates: { start: string; end: string };
  budget: number;
  status: 'planned' | 'booked' | 'completed';
  activities: string[];
  notes: string;
}

export default function TravelDashboard() {
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: '1',
      name: 'Paris',
      country: 'France',
      dates: { start: '2025-06-15', end: '2025-06-22' },
      budget: 3500,
      status: 'planned',
      activities: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise'],
      notes: 'Book accommodation near Latin Quarter'
    },
    {
      id: '2',
      name: 'Tokyo',
      country: 'Japan',
      dates: { start: '2025-09-01', end: '2025-09-10' },
      budget: 4200,
      status: 'booked',
      activities: ['Shibuya Crossing', 'Mount Fuji', 'Temples in Kyoto'],
      notes: 'JR Pass ordered'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newDestination, setNewDestination] = useState<Partial<Destination>>({
    name: '',
    country: '',
    dates: { start: '', end: '' },
    budget: 0,
    status: 'planned',
    activities: [],
    notes: ''
  });
  const [newActivity, setNewActivity] = useState('');

  const addDestination = () => {
    if (newDestination.name && newDestination.country) {
      setDestinations([
        ...destinations,
        {
          ...newDestination,
          id: Date.now().toString(),
          activities: newDestination.activities || []
        } as Destination
      ]);
      setNewDestination({
        name: '',
        country: '',
        dates: { start: '', end: '' },
        budget: 0,
        status: 'planned',
        activities: [],
        notes: ''
      });
      setNewActivity('');
      setShowForm(false);
    }
  };

  const deleteDestination = (id: string) => {
    setDestinations(destinations.filter(d => d.id !== id));
  };

  const updateStatus = (id: string, status: Destination['status']) => {
    setDestinations(destinations.map(d =>
      d.id === id ? { ...d, status } : d
    ));
  };

  const addActivityToNew = () => {
    if (newActivity.trim()) {
      setNewDestination({
        ...newDestination,
        activities: [...(newDestination.activities || []), newActivity]
      });
      setNewActivity('');
    }
  };

  const totalBudget = destinations.reduce((sum, d) => sum + d.budget, 0);
  const upcomingTrips = destinations.filter(d => d.status !== 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Travel Planning Dashboard</h1>
          <p className="text-gray-600">Plan and track your adventures around the world</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Destinations</p>
                <p className="text-3xl font-bold text-gray-800">{destinations.length}</p>
              </div>
              <MapPin className="w-12 h-12 text-blue-500 opacity-80" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Upcoming Trips</p>
                <p className="text-3xl font-bold text-gray-800">{upcomingTrips}</p>
              </div>
              <Calendar className="w-12 h-12 text-green-500 opacity-80" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Budget</p>
                <p className="text-3xl font-bold text-gray-800">${totalBudget.toLocaleString()}</p>
              </div>
              <DollarSign className="w-12 h-12 text-purple-500 opacity-80" />
            </div>
          </div>
        </div>

        {/* Add New Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
          >
            <PlusCircle className="w-5 h-5" />
            Add New Destination
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-xl p-6 mb-8 border-2 border-indigo-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">New Destination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Destination Name"
                value={newDestination.name}
                onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Country"
                value={newDestination.country}
                onChange={(e) => setNewDestination({ ...newDestination, country: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={newDestination.dates?.start}
                onChange={(e) => setNewDestination({
                  ...newDestination,
                  dates: { ...newDestination.dates!, start: e.target.value }
                })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <input
                type="date"
                placeholder="End Date"
                value={newDestination.dates?.end}
                onChange={(e) => setNewDestination({
                  ...newDestination,
                  dates: { ...newDestination.dates!, end: e.target.value }
                })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Budget ($)"
                value={newDestination.budget || ''}
                onChange={(e) => setNewDestination({ ...newDestination, budget: Number(e.target.value) })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <select
                value={newDestination.status}
                onChange={(e) => setNewDestination({ ...newDestination, status: e.target.value as Destination['status'] })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="planned">Planned</option>
                <option value="booked">Booked</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Activities</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add activity"
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addActivityToNew()}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={addActivityToNew}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newDestination.activities?.map((activity, idx) => (
                  <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    {activity}
                  </span>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Notes"
              value={newDestination.notes}
              onChange={(e) => setNewDestination({ ...newDestination, notes: e.target.value })}
              className="w-full mt-4 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={3}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={addDestination}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Save Destination
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              <div className={`h-2 ${
                destination.status === 'completed' ? 'bg-green-500' :
                destination.status === 'booked' ? 'bg-blue-500' : 'bg-yellow-500'
              }`} />

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{destination.name}</h3>
                    <p className="text-gray-500">{destination.country}</p>
                  </div>
                  <button
                    onClick={() => deleteDestination(destination.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(destination.dates.start).toLocaleDateString()} - {new Date(destination.dates.end).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-semibold">${destination.budget.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Activities:</p>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((activity, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                {destination.notes && (
                  <p className="text-sm text-gray-600 mb-4 italic">{destination.notes}</p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(destination.id, 'planned')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      destination.status === 'planned'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Planned
                  </button>
                  <button
                    onClick={() => updateStatus(destination.id, 'booked')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      destination.status === 'booked'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Booked
                  </button>
                  <button
                    onClick={() => updateStatus(destination.id, 'completed')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      destination.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {destinations.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No destinations yet</h3>
            <p className="text-gray-500">Start planning your next adventure!</p>
          </div>
        )}
      </div>
    </div>
  );
}
