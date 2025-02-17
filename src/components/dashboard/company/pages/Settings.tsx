import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Bell, 
  CreditCard, 
  Key, 
  Building2, 
  ChevronRight,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

interface SettingsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const SettingsCard = ({ title, description, icon, isActive, onClick }: SettingsCardProps) => (
  <div
    onClick={onClick}
    className={`p-4 rounded-xl cursor-pointer hover:bg-[#5F7053]/5 transition-all ${
      isActive ? 'bg-[#5F7053] text-white' : 'bg-white'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${isActive ? 'bg-white/10' : 'bg-[#5F7053]/10'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className={isActive ? 'text-white' : 'text-gray-900'}>{title}</h3>
        <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}>{description}</p>
      </div>
      <ChevronRight className={isActive ? 'text-white' : 'text-gray-400'} />
    </div>
  </div>
);

const CompanySettings = () => {
  const { user } = useUser();
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const sections = [
    {
      id: 'profile',
      title: 'Company Profile',
      description: 'Manage your company information and branding',
      icon: <Building2 className="w-5 h-5" />
    },
    {
      id: 'team',
      title: 'Team Management',
      description: 'Add and manage team members and roles',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Configure email and push notification preferences',
      icon: <Bell className="w-5 h-5" />
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      description: 'Manage payment methods and view invoices',
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: 'api',
      title: 'API Settings',
      description: 'View and manage API keys and webhooks',
      icon: <Key className="w-5 h-5" />
    }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your company preferences and configuration</p>
        </div>

        {/* Settings Cards */}
        <div className="grid gap-3 mb-8">
          {sections.map((section) => (
            <SettingsCard
              key={section.id}
              title={section.title}
              description={section.description}
              icon={section.icon}
              isActive={activeSection === section.id}
              onClick={() => setActiveSection(section.id)}
            />
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8 bg-white rounded-xl">
          <AnimatePresence mode="wait">
            {activeSection === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Company Logo */}
                <div className="mb-8">
                  <h2 className="mb-4 text-lg font-medium text-gray-900">Company Logo</h2>
                  <div className="flex items-start gap-4">
                    <img 
                      src={user?.imageUrl || '/placeholder.png'} 
                      alt="Company Logo" 
                      className="object-cover w-16 h-16 rounded-lg"
                    />
                    <div>
                      <button className="px-4 py-2 text-[#5F7053] border border-[#5F7053] rounded-lg hover:bg-[#5F7053]/5">
                        Change Logo
                      </button>
                      <p className="mt-1 text-sm text-gray-500">
                        Recommended: 400x400px, Max 2MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div>
                  <h2 className="mb-6 text-lg font-medium text-gray-900">Company Information</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#5F7053] focus:ring-[#5F7053]"
                          defaultValue={user?.publicMetadata?.companyName as string}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Business Registration Number
                      </label>
                      <div className="relative">
                        <Globe className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#5F7053] focus:ring-[#5F7053]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Contact Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                        <input
                          type="email"
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#5F7053] focus:ring-[#5F7053]"
                          defaultValue={user?.emailAddresses[0]?.emailAddress}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                        <input
                          type="tel"
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#5F7053] focus:ring-[#5F7053]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Business Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute text-gray-400 left-3 top-3" />
                      <textarea
                        rows={3}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#5F7053] focus:ring-[#5F7053]"
                        placeholder="Enter your complete business address"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-6 py-2 bg-[#5F7053] text-white rounded-lg hover:bg-[#5F7053]/90 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;