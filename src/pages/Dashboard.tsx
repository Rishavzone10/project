import React from 'react';
import { BarChart3, Users, Send, AlertTriangle } from 'lucide-react';

function Dashboard() {
  const stats = [
    {
      name: 'Total Customers',
      value: '2,543',
      icon: Users,
      change: '+12.3%',
      changeType: 'positive',
    },
    {
      name: 'Active Campaigns',
      value: '8',
      icon: Send,
      change: '+2.1%',
      changeType: 'positive',
    },
    {
      name: 'Message Success Rate',
      value: '94.2%',
      icon: BarChart3,
      change: '+3.2%',
      changeType: 'positive',
    },
    {
      name: 'Failed Deliveries',
      value: '121',
      icon: AlertTriangle,
      change: '-8.1%',
      changeType: 'negative',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Your campaign and customer analytics at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-indigo-500 rounded-md p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {item.change}
                </p>
              </dd>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-4 bg-white shadow rounded-lg">
          {/* Activity list will go here */}
          <div className="p-6 text-center text-gray-500">
            Activity feed coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;