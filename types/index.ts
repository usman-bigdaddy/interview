export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ExperienceItem {
  id: number;
  position: string;
  organization: string;
  location: string;
  date: string;
  type: 'performance' | 'training' | 'accolades' | 'education' | 'job' | 'commissions' | 'masterclass';
  description?: string;
  tags?: string[];
}