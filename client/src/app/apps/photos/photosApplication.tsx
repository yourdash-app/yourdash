import React, {useEffect, useState} from 'react';
import {Icon, MajorButton} from '../../../ui';
import PhotoDay from './components/photoDay';
import useTranslate from '../../../helpers/l10n';

const PhotosApplication: React.FC = () => {
  const trans = useTranslate('photos');
  const [photoCategories, setPhotoCategories] = useState<{
    photos: ''[],
    date: string
  }[]>([]);

  useEffect(() => {
    setPhotoCategories([]);
  }, []);

  return (
    <div className={'grid grid-rows-[auto,1fr] h-full'}>
      <div className={'pt-4 pb-4 pl-4 text-base-50 font-semibold text-3xl bg-container-bg'}>
        <h2>
          {'Photos'}
        </h2>
      </div>
      <main className={'p-2 flex flex-col h-full'}>
        {
          photoCategories.length !== 0
            ? photoCategories.map(photoCategory => <PhotoDay key={photoCategory.date} photoCategory={photoCategory}/>)
            : (
              <main className={'min-h-full w-full flex items-center justify-center flex-col gap-2'}>
                <span className={'font-semibold text-3xl tracking-wide'}>{'😥 You have no photos'}</span>
                <MajorButton className={'flex items-center justify-center pl-2 pr-2'}>
                  <span className={'flex-nowrap whitespace-nowrap flex items-center justify-center'}>
                    <Icon className={'h-6'} name={'upload-16'}/>
                    {'Upload photos'}
                  </span>
                </MajorButton>
              </main>
            )
        }
      </main>
    </div>
  );
};

export default PhotosApplication;
