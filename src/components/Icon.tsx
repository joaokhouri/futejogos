// src/components/Icon.tsx
import React from 'react';
import { icons } from './Icons'; // Importa nosso "dicionário" de ícones

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d={icons[name]} />
  </svg>
);

export default Icon;
