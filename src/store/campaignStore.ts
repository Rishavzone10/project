import { create } from 'zustand';
import { Campaign } from '../types';

interface CampaignStore {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  setSelectedCampaign: (campaign: Campaign | null) => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (campaign: Campaign) => void;
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: [],
  selectedCampaign: null,
  setSelectedCampaign: (campaign) => set({ selectedCampaign: campaign }),
  addCampaign: (campaign) =>
    set((state) => ({ campaigns: [...state.campaigns, campaign] })),
  updateCampaign: (campaign) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === campaign.id ? campaign : c
      ),
    })),
}));