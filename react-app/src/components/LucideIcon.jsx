import React from 'react';
import * as icons from 'lucide-react';

const LucideIcon = ({ name, ...props }) => {
  // convert dash-case to PascalCase (e.g. layout-template -> LayoutTemplate)
  if (!name) return null;
  const pascalName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
    
  const IconComponent = icons[pascalName];
  if (!IconComponent) {
    console.warn(`Icon ${name} not found in lucide-react`);
    return null;
  }
  
  return <IconComponent {...props} />;
};

export default LucideIcon;
