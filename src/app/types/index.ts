export interface Tour {
  id: number;
  title: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
}

export interface Category {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
