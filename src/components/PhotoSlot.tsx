import { useState } from 'react';
import photos from '@/lib/photos.json';
import { SunflowerMark } from './SunflowerMark';

type PhotoKey = keyof typeof photos;
type Props = {
  photoKey: PhotoKey;
  type?: 'hero' | 'wide' | 'square';
  title?: string;
};

/** Change the photo URLs or /photos/*.webp paths in src/lib/photos.json. */
export function PhotoSlot({ photoKey, type = 'wide', title }: Props) {
  const photo = photos[photoKey];
  const [error, setError] = useState(false);
  const hasImage = Boolean(photo.src) && !error;

  return (
    <div className={`photo-slot photo-slot-${type} ${hasImage ? 'has-photo' : 'no-photo'}`}>
      {hasImage ? (
        <img
          className="approved-photo"
          src={photo.src}
          alt={photo.alt || title || 'Early learning photograph'}
          title={title}
          loading={type === 'hero' ? 'eager' : 'lazy'}
          fetchPriority={type === 'hero' ? 'high' : 'auto'}
          decoding="async"
          style={{ objectPosition: photo.position || 'center' }}
          onError={() => setError(true)}
        />
      ) : (
        <div className="photo-fallback" role="img" aria-label={title || 'Sunflower decoration'}>
          <SunflowerMark size={80} />
        </div>
      )}
    </div>
  );
}
