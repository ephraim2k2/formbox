import React from 'react';
import './Skeleton.css';

export function Skeleton({ width, height, borderRadius = '8px', className = '', style = {} }) {
  return (
    <div 
      className={`skeleton-shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
    />
  );
}

export function TableSkeletonRows({ rows = 5, cols = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr key={rIdx} className="skeleton-row">
          {Array.from({ length: cols }).map((_, cIdx) => (
            <td key={cIdx}>
              <Skeleton 
                width={cIdx === 0 ? '24px' : cIdx === 1 ? '140px' : cIdx === 4 ? '110px' : '90px'} 
                height="18px" 
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
