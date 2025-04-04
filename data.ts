export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  msrp?: number;
  mileage: number;
  imageUrl: string;
  images?: string[];
  features: string[];
  description: string;
  location: string;
  condition: 'New' | 'Used' | 'Certified Pre-Owned';
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Gasoline' | 'Electric' | 'Hybrid' | 'Diesel';
  color: string;
  bodyType: string;
  trim?: string;
  bestMatch?: boolean;
  engineType?: string;
  horsepower?: number;
  drivetrain?: string;
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
    cargoSpace?: string;
  };
  history?: {
    clean: boolean;
    previousOwners: number;
  };
}

export const vehicles: Vehicle[] = [
  {
    id: "1",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 41990,
    msrp: 45990,
    mileage: 0,
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000"
    ],
    features: [
      "Autopilot",
      "Premium Interior",
      "Glass Roof",
      "18\" Aero Wheels",
      "Premium Audio",
      "Wireless Phone Charging",
      "Heated Seats",
      "Power Trunk",
      "LED Headlights",
      "Blind Spot Monitoring"
    ],
    description: "The Tesla Model 3 is an electric four-door sedan developed by Tesla. The Model 3 Standard Range Plus version delivers an EPA-rated all-electric range of 263 miles (423 km) and the Long Range version delivers 353 miles (568 km). With its sleek design, advanced technology, and impressive performance, the Model 3 represents the future of automotive excellence.",
    location: "San Francisco, CA",
    condition: "New",
    transmission: "Automatic",
    fuelType: "Electric",
    color: "Midnight Silver Metallic",
    bodyType: "Sedan",
    trim: "Long Range",
    bestMatch: true,
    engineType: "Electric Motor",
    horsepower: 450,
    drivetrain: "All-Wheel Drive",
    dimensions: {
      length: "184.8 in",
      width: "72.8 in",
      height: "56.8 in",
      cargoSpace: "15.0 cu ft"
    },
    history: {
      clean: true,
      previousOwners: 0
    }
  },
  {
    id: "2",
    make: "Toyota",
    model: "RAV4",
    year: 2023,
    price: 32975,
    msrp: 34975,
    mileage: 15000,
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1000"
    ],
    features: [
      "All-Wheel Drive",
      "Toyota Safety Sense",
      "Apple CarPlay",
      "Android Auto",
      "Power Liftgate",
      "Bluetooth",
      "Backup Camera",
      "Cruise Control",
      "Lane Departure Warning",
      "Automatic Emergency Braking"
    ],
    description: "The Toyota RAV4 is a compact crossover SUV that offers a perfect blend of style, comfort, and capability. With its available hybrid powertrain and advanced safety features, it's an excellent choice for both city driving and outdoor adventures. The spacious interior and versatile cargo area make it ideal for families and active lifestyles.",
    location: "Los Angeles, CA",
    condition: "Certified Pre-Owned",
    transmission: "Automatic",
    fuelType: "Hybrid",
    color: "Cavalry Blue",
    bodyType: "SUV",
    trim: "XLE Premium",
    engineType: "Hybrid",
    horsepower: 219,
    drivetrain: "All-Wheel Drive",
    dimensions: {
      length: "180.9 in",
      width: "73.0 in",
      height: "67.2 in",
      cargoSpace: "37.6 cu ft"
    },
    history: {
      clean: true,
      previousOwners: 1
    }
  },
  {
    id: "3",
    make: "Ford",
    model: "Mustang",
    year: 2023,
    price: 45995,
    msrp: 47995,
    mileage: 5000,
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000"
    ],
    features: [
      "5.0L V8 Engine",
      "Performance Package",
      "Leather Interior",
      "Navigation System",
      "Premium Sound System",
      "Recaro Sport Seats",
      "Track Apps",
      "FordPass Connect",
      "Blind Spot Information System",
      "Lane-Keeping System"
    ],
    description: "The Ford Mustang is an American muscle car that delivers exceptional performance and iconic style. With its powerful V8 engine and aggressive design, it's the perfect choice for those seeking an exhilarating driving experience. The Mustang combines heritage with modern technology to create a driving experience unlike any other.",
    location: "Miami, FL",
    condition: "Used",
    transmission: "Manual",
    fuelType: "Gasoline",
    color: "Race Red",
    bodyType: "Coupe",
    trim: "GT",
    engineType: "V8",
    horsepower: 450,
    drivetrain: "Rear-Wheel Drive",
    dimensions: {
      length: "188.5 in",
      width: "75.4 in",
      height: "54.3 in",
      cargoSpace: "13.5 cu ft"
    },
    history: {
      clean: true,
      previousOwners: 1
    }
  },
  {
    id: "4",
    make: "BMW",
    model: "X5",
    year: 2023,
    price: 65995,
    msrp: 69995,
    mileage: 0,
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000"
    ],
    features: [
      "xDrive All-Wheel Drive",
      "Panoramic Sunroof",
      "BMW Live Cockpit Professional",
      "Premium Package",
      "M Sport Package",
      "Harman Kardon Sound System",
      "Wireless Apple CarPlay",
      "Gesture Control",
      "Head-Up Display",
      "Parking Assistant"
    ],
    description: "The BMW X5 is a luxury SUV that combines sophisticated design with powerful performance. Its spacious interior, advanced technology, and superior driving dynamics make it a standout in the luxury SUV segment. The X5 offers a perfect blend of comfort, capability, and cutting-edge features for the discerning driver.",
    location: "New York, NY",
    condition: "New",
    transmission: "Automatic",
    fuelType: "Gasoline",
    color: "Carbon Black Metallic",
    bodyType: "SUV",
    trim: "xDrive40i",
    engineType: "Inline 6-Cylinder",
    horsepower: 335,
    drivetrain: "All-Wheel Drive",
    dimensions: {
      length: "194.3 in",
      width: "78.9 in",
      height: "69.0 in",
      cargoSpace: "33.9 cu ft"
    },
    history: {
      clean: true,
      previousOwners: 0
    }
  },
  {
    id: "5",
    make: "Honda",
    model: "Civic",
    year: 2023,
    price: 24995,
    msrp: 26995,
    mileage: 25000,
    imageUrl: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1000"
    ],
    features: [
      "Honda Sensing",
      "Apple CarPlay",
      "Android Auto",
      "Bluetooth",
      "Lane Departure Warning",
      "Adaptive Cruise Control",
      "Collision Mitigation Braking",
      "Road Departure Mitigation",
      "Lane Keeping Assist",
      "Traffic Sign Recognition"
    ],
    description: "The Honda Civic is a reliable and efficient compact car that offers excellent value. With its fuel-efficient engine, modern features, and comfortable interior, it's perfect for daily commuting and weekend adventures. The Civic has been a bestseller for decades, thanks to its combination of reliability, style, and advanced technology.",
    location: "Chicago, IL",
    condition: "Certified Pre-Owned",
    transmission: "Automatic",
    fuelType: "Gasoline",
    color: "Sonic Gray Pearl",
    bodyType: "Sedan",
    trim: "EX",
    engineType: "Inline 4-Cylinder",
    horsepower: 158,
    drivetrain: "Front-Wheel Drive",
    dimensions: {
      length: "184.0 in",
      width: "70.9 in",
      height: "55.7 in",
      cargoSpace: "14.8 cu ft"
    },
    history: {
      clean: true,
      previousOwners: 1
    }
  }
]; 