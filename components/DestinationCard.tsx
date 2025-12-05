
import React, { useContext } from 'react';
import { Destination } from '../types';
import { AdminSettingsContext } from '../App';
import Button from './ui/Button';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { adminSettings } = useContext(AdminSettingsContext);

  return (
    <div id={destination.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img
        src={destination.image}
        alt={`${destination.city}, ${destination.country}`}
        className="w-full h-56 object-cover"
        loading="lazy"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{destination.city}, {destination.country}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {destination.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold primary-text">
            From {destination.price}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Category: {destination.category}
          </span>
        </div>
        <Button className="w-full primary-bg primary-hover-bg" onClick={() => alert(`Booking trip to ${destination.city}!`)}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default DestinationCard;