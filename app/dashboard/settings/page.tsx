'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-3 ${activeTab === 'users' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
          >
            User Management
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Profile Settings</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" className="mt-1 block w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" className="mt-1 block w-full border rounded px-3 py-2" />
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
                Save Changes
              </button>
            </div>
          )}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">User Management</h2>
              <p className="text-gray-500">Daftar staff dan owner akan muncul di sini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
