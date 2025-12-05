
import React, { useState, useEffect, useContext } from 'react';
import { SiteContentContext, AdminSettingsContext } from '../../App';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { Destination, SiteContent } from '../../types';
import { DEFAULT_DESTINATION_IMAGE } from '../../constants';
import { geminiService } from '../../services/geminiService';
import SkeletonCard from '../ui/SkeletonCard';

interface DestinationManagerProps {
  onSave: (content: SiteContent) => void;
}

const DestinationManager: React.FC<DestinationManagerProps> = ({ onSave }) => {
  const { siteContent } = useContext(SiteContentContext);
  const { adminSettings } = useContext(AdminSettingsContext);
  const [destinations, setDestinations] = useState<Destination[]>(siteContent.destinations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    setDestinations(siteContent.destinations);
  }, [siteContent.destinations]);

  const openAddModal = () => {
    setCurrentDestination({
      id: `d-${Date.now()}`,
      country: '',
      city: '',
      image: DEFAULT_DESTINATION_IMAGE,
      description: '',
      price: '$0',
      category: 'Other',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (destination: Destination) => {
    setCurrentDestination({ ...destination });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDestination(null);
    setAiError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentDestination) {
      setCurrentDestination({ ...currentDestination, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDestination) return;

    let updatedDestinations;
    if (destinations.find((d) => d.id === currentDestination.id)) {
      updatedDestinations = destinations.map((d) =>
        d.id === currentDestination.id ? currentDestination : d
      );
    } else {
      updatedDestinations = [...destinations, currentDestination];
    }
    onSave({ ...siteContent, destinations: updatedDestinations });
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      const updatedDestinations = destinations.filter((d) => d.id !== id);
      onSave({ ...siteContent, destinations: updatedDestinations });
    }
  };

  const handleGenerateDescription = async () => {
    if (!currentDestination) return;
    setAiGenerating(true);
    setAiError(null);
    try {
      const prompt = `Write a short, engaging travel description (max 100 words) for ${currentDestination.city}, ${currentDestination.country}. Focus on key attractions or unique aspects.`;
      const generatedText = await geminiService.generateContent({ prompt, model: 'gemini-2.5-flash', maxOutputTokens: 150 });
      setCurrentDestination((prev) => (prev ? { ...prev, description: generatedText } : null));
    } catch (error) {
      console.error('AI generation failed:', error);
      setAiError('Failed to generate description with AI. Please try again.');
    } finally {
      setAiGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6">Manage Destinations</h3>
      <Button onClick={openAddModal} className="primary-bg primary-hover-bg mb-6">
        Add New Destination
      </Button>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                City, Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {destinations.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No destinations found.
                </td>
              </tr>
            )}
            {destinations.map((destination) => (
              <tr key={destination.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{destination.city}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{destination.country}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={destination.image} alt={destination.city} className="h-10 w-10 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {destination.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => openEditModal(destination)}>Edit</Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(destination.id)} className="red-border red-text hover:bg-[var(--color-red-50)] dark:red-border-dark dark:red-text-dark">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={currentDestination?.id ? 'Edit Destination' : 'Add New Destination'}>
        {currentDestination && (
          <form onSubmit={handleSubmit}>
            <Input id="city" label="City" name="city" value={currentDestination.city} onChange={handleChange} required />
            <Input id="country" label="Country" name="country" value={currentDestination.country} onChange={handleChange} required />
            <Input id="category" label="Category" name="category" value={currentDestination.category} onChange={handleChange} required />
            <Input id="image" label="Image URL" name="image" value={currentDestination.image} onChange={handleChange} required />
            <Input id="price" label="Price" name="price" value={currentDestination.price} onChange={handleChange} required />
            <Textarea id="description" label="Description" name="description" value={currentDestination.description} onChange={handleChange} rows={4} required />

            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-2">
              <Button
                type="button"
                onClick={handleGenerateDescription}
                loading={aiGenerating}
                disabled={aiGenerating}
                variant="secondary"
                className="w-full sm:w-auto mb-2 sm:mb-0 accent-bg accent-hover-bg text-white"
              >
                {aiGenerating ? 'Generating...' : 'Generate Description with AI'}
              </Button>
              {aiError && <p className="text-red-500 text-sm mt-1">{aiError}</p>}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" className="primary-bg primary-hover-bg">
                Save Destination
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default DestinationManager;