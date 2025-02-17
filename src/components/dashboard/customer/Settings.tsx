// src/components/dashboard/customer/Settings.tsx
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  MapPin, 
  Shield,
  Globe,
  ChevronRight,
  Lock,
  Save,
  Plus,
  Edit,
  UserCog
} from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const Settings = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState<{ [key: string]: boolean }>({
    email: true,
    sms: true,
    collection: true,
    marketing: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: UserCog }
  ];

  // Settings sections render functions
  const renderProfile = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-[#5F7053] mb-6">Profile Information</h2>
      <div className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={user?.imageUrl} 
              alt={user?.firstName || ''}
              className="object-cover w-20 h-20 rounded-xl"
            />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#5F7053] text-white rounded-lg hover:bg-[#5F7053]/90 transition-colors flex items-center justify-center">
              <Edit className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h3 className="font-medium text-[#5F7053]">Profile Photo</h3>
            <p className="text-sm text-[#5F7053]/70">
              JPEG or PNG, max 2MB
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[#5F7053] mb-2">
              First Name
            </label>
            <input
              type="text"
              defaultValue={user?.firstName || ''}
              className="w-full p-3 rounded-lg border border-[#5F7053]/20 focus:border-[#5F7053] focus:ring-1 focus:ring-[#5F7053] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5F7053] mb-2">
              Last Name
            </label>
            <input
              type="text"
              defaultValue={user?.lastName || ''}
              className="w-full p-3 rounded-lg border border-[#5F7053]/20 focus:border-[#5F7053] focus:ring-1 focus:ring-[#5F7053] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5F7053] mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue={user?.primaryEmailAddress?.emailAddress || ''}
              className="w-full p-3 rounded-lg border border-[#5F7053]/20 focus:border-[#5F7053] focus:ring-1 focus:ring-[#5F7053] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5F7053] mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full p-3 rounded-lg border border-[#5F7053]/20 focus:border-[#5F7053] focus:ring-1 focus:ring-[#5F7053] outline-none transition-colors"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#5F7053] mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              className="w-full p-3 rounded-lg border border-[#5F7053]/20 focus:border-[#5F7053] focus:ring-1 focus:ring-[#5F7053] outline-none transition-colors"
              placeholder="Tell us a bit about yourself..."
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#5F7053] text-white rounded-lg hover:bg-[#5F7053]/90 transition-colors">
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-[#5F7053] mb-6">Notification Preferences</h2>
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]: [string, boolean]) => (
          <div 
            key={key}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-[#5F7053]/10 transition-colors"
          >
            <div>
              <h3 className="font-medium text-[#5F7053] capitalize">
                {key.replace('_', ' ')} Notifications
              </h3>
              <p className="text-sm text-[#5F7053]/70">
                {key === 'email' && 'Receive notifications via email'}
                {key === 'sms' && 'Receive notifications via SMS'}
                {key === 'collection' && 'Updates about your collections'}
                {key === 'marketing' && 'Receive promotional updates'}
              </p>
            </div>
            <button
              onClick={() => setNotifications(prev => ({
                ...prev,
                [key]: !prev[key]
              }))}
              className={`w-12 h-6 rounded-full transition-colors relative
                ${value ? 'bg-[#5F7053]' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all
                ${value ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLocations = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#5F7053]">Saved Locations</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#5F7053] text-white rounded-lg hover:bg-[#5F7053]/90 transition-colors">
          <Plus className="w-4 h-4" />
          Add Location
        </button>
      </div>

      <div className="space-y-4">
        {[
          { name: 'Home', address: 'Al Khoud, Muscat', default: true },
          { name: 'Office', address: 'Ruwi, Muscat', default: false },
        ].map((location, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-[#5F7053]/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#5F7053]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#5F7053]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-[#5F7053]">{location.name}</h3>
                  {location.default && (
                    <span className="px-2 py-1 text-xs bg-[#5F7053]/20 text-[#5F7053] rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#5F7053]/70">{location.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-[#5F7053]/20 rounded-lg transition-colors">
                <Edit className="w-4 h-4 text-[#5F7053]" />
              </button>
              <button className="p-2 hover:bg-[#5F7053]/20 rounded-lg transition-colors">
                <ChevronRight className="w-4 h-4 text-[#5F7053]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-[#5F7053] mb-6">Privacy & Security</h2>
      <div className="space-y-4">
        <motion.button 
          whileHover={{ x: 4 }}
          className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#5F7053]/10 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#5F7053]/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#5F7053]" />
            </div>
            <div>
              <h3 className="font-medium text-[#5F7053]">Change Password</h3>
              <p className="text-sm text-[#5F7053]/70">Update your account password</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#5F7053]" />
        </motion.button>

        <motion.button 
          whileHover={{ x: 4 }}
          className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#5F7053]/10 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#5F7053]/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#5F7053]" />
            </div>
            <div>
              <h3 className="font-medium text-[#5F7053]">Two-Factor Authentication</h3>
              <p className="text-sm text-[#5F7053]/70">Add an extra layer of security</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#5F7053]" />
        </motion.button>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-[#5F7053] mb-6">User Preferences</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-[#5F7053]/10 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#5F7053]/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#5F7053]" />
            </div>
            <div>
              <h3 className="font-medium text-[#5F7053]">Language</h3>
              <p className="text-sm text-[#5F7053]/70">Choose your preferred language</p>
            </div>
          </div>
          <select className="p-2 rounded-lg border border-[#5F7053]/20 outline-none">
            <option>English</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-[#5F7053]">Settings</h1>
        <p className="text-[#5F7053]/70">Manage your account preferences</p>
      </motion.div>

      {/* Settings Layout */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="overflow-hidden bg-white shadow-sm rounded-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ x: 4 }}
                  className={`w-full flex items-center gap-3 px-6 py-4 transition-colors
                    ${activeTab === tab.id 
                      ? 'bg-[#5F7053]/10 text-[#5F7053]' 
                      : 'text-[#5F7053]/70 hover:bg-[#5F7053]/5'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-9"
        >
          <div className="bg-white shadow-sm rounded-2xl">
            {/* Render content based on active tab */}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'notifications' && renderNotifications()}
            {activeTab === 'locations' && renderLocations()}
            {activeTab === 'privacy' && renderPrivacy()}
            {activeTab === 'preferences' && renderPreferences()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;