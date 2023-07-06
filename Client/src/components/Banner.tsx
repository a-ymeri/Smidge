import React from 'react';

interface BannerProps {
  title: string;
  description: string;
}

const Banner: React.FC<BannerProps> = ({ title, description }) => {
  return (
    <>
      <div className="banner">
        <div className="banner-left">
          <div className="banner-title">{title}</div>
          <div className="banner-contents">{description}</div>
        </div>
      </div>
    </>
  );
};

export default Banner;
