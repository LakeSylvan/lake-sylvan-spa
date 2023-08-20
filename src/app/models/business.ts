export interface Business {
  name: string;
  owner?: string;
  phoneNumber: string;
  email: string;
  address?: string;
  lakeOwned: boolean;
  website?: string;
  description: string;
  category: string;
  logoImagePath?: string;
  primaryIcon?: string;
  secondaryIcon?: string
}
