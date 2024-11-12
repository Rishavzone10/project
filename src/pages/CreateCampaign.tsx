import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import AudienceBuilder from '../components/AudienceBuilder';
import { AudienceCondition } from '../types';
import { campaignApi } from '../services/api';

export default function CreateCampaign() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [conditions, setConditions] = useState<AudienceCondition[]>([]);
  
  const { register, handleSubmit, formState: { errors } } = useForm<{
    name: string;
    messageTemplate: string;
  }>();

  const createCampaignMutation = useMutation(
    (data: { name: string; messageTemplate: string; conditions: AudienceCondition[] }) =>
      campaignApi.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('campaigns');
        navigate('/campaigns');
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    createCampaignMutation.mutate({
      ...data,
      conditions,
    });
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Create Campaign</h1>
        <p className="mt-2 text-sm text-gray-700">
          Define your audience and message template
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Campaign Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Campaign Name
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message Template
              </label>
              <textarea
                {...register('messageTemplate', {
                  required: 'Message template is required',
                })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Hi [Name], here's your personalized message..."
              />
              {errors.messageTemplate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.messageTemplate.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Define Audience
          </h2>
          <AudienceBuilder
            conditions={conditions}
            onChange={setConditions}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={createCampaignMutation.isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <Send className="mr-2 h-5 w-5" />
            {createCampaignMutation.isLoading ? 'Creating...' : 'Create Campaign'}
          </button>
        </div>
      </form>
    </div>
  );
}