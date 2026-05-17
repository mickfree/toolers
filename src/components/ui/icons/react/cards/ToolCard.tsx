import React from 'react';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  children: React.ReactNode; // Captura el slot del icono
}

export const ToolCard: React.FC<ToolCardProps> = ({ title, description, href, children }) => {
  return (
    <a href={href} className="tool-card">
      <div className="card-header">
        <div className="icon-container">
          {children}
        </div>
        <h3 className="card-title">{title}</h3>
      </div>
      <p className="card-description">{description}</p>
    </a>
  );
};