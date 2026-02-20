export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export const dummyAddresses: Address[] = [
  {
    id: "1",
    name: "Rahul Dutta",
    phone: "8892398981",
    addressLine1: "123 Main Street",
    addressLine2: "Apartment 4B",
    city: "Silta",
    state: "Karnataka",
    zipCode: "297134",
    country: "India",
    isDefault: true
  },
  {
    id: "2",
    name: "Rahul Sharma",
    phone: "9876543210",
    addressLine1: "456 Park Avenue",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001",
    country: "India",
    isDefault: false
  },
  {
    id: "3",
    name: "Priya Singh",
    phone: "9123456789",
    addressLine1: "789 Lake View Road",
    addressLine2: "Near City Mall",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560001",
    country: "India",
    isDefault: false
  },
  {
    id: "4",
    name: "Amit Patel",
    phone: "9988776655",
    addressLine1: "321 Green Valley",
    city: "Ahmedabad",
    state: "Gujarat",
    zipCode: "380001",
    country: "India",
    isDefault: false
  }
];

export const getDefaultAddress = (): Address | undefined => {
  return dummyAddresses.find((addr) => addr.isDefault);
};
export const getAllAddresses = (): Address[] => {
  return dummyAddresses;
};
