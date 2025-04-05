import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/data';

interface CarCardProps {
  vehicle: Vehicle;
  viewMode: 'grid' | 'list';
}

const CarCard: React.FC<CarCardProps> = ({ vehicle, viewMode }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.01] hover:shadow-lg flex flex-col md:flex-row">
        <div className="relative h-48 md:h-auto md:w-1/3">
          <Image
            src={vehicle.imageUrl}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className="object-cover"
            priority
          />
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            {vehicle.condition}
          </div>
        </div>
        
        <div className="p-4 md:w-2/3 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <span className="text-lg font-bold text-green-600">
              {formatPrice(vehicle.price)}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatMileage(vehicle.mileage)} miles</span>
            <span className="mx-2">•</span>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{vehicle.location}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{vehicle.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {vehicle.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {feature}
              </span>
            ))}
            {vehicle.features.length > 3 && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                +{vehicle.features.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-auto">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{vehicle.transmission}</span> • {vehicle.fuelType}
            </div>
            <Link 
              href={`/${vehicle.id}`}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={vehicle.imageUrl}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover"
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          {vehicle.condition}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <span className="text-lg font-bold text-green-600">
            {formatPrice(vehicle.price)}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{formatMileage(vehicle.mileage)} miles</span>
          <span className="mx-2">•</span>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{vehicle.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {vehicle.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {feature}
            </span>
          ))}
          {vehicle.features.length > 3 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              +{vehicle.features.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{vehicle.transmission}</span> • {vehicle.fuelType}
          </div>
          <Link 
            href={`/${vehicle.id}`}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard; 