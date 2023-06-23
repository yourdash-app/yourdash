import React, {useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';

import {StorePromotedApplication} from '../../../../../shared/apps/store/storePromotedApplication';
import csi from '../../../helpers/csi';
import {Card, Carousel, MajorButton} from '../../../ui';

const StoreApplication: React.FC = () => {
  const navigate = useNavigate();
  const [promotedApplications, setPromotedApplications] = useState<StorePromotedApplication[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    csi.getJson('/app/store/promoted/applications', data => {
      setPromotedApplications(data);
    });

    csi.getJson('/app/store/categories', data => {
      setCategories(data);
    });
  }, []);

  return (
    <main>
      <header
        className={'w-full flex flex-col items-center justify-center pt-2 pb-4 bg-container-bg bg-opacity-40 backdrop-blur-lg animate__animated animate__fadeIn'}
      >
        <h2 className={'text-3xl font-semibold tracking-wide pt-1 pb-3'}>{'YourDash Store'}</h2>
        <Carousel containerClassName={'max-w-4xl w-full'}>
          {
            promotedApplications.map(item => (
              <div key={item.name} className={'w-full h-full'}>
                <div
                  style={{
                    backgroundImage: `url(${ item.backgroundImage })`
                  }}
                  className={'w-[calc(100%-7rem)] h-full relative ml-auto mr-auto overflow-hidden rounded-2xl bg-center bg-cover flex items-center justify-end'}
                >
                  <div
                    className={'w-full pt-3 pb-3 pl-12 pr-12 flex items-center bg-container-bg bg-opacity-75 backdrop-blur-md mt-auto'}
                  >
                    <img className={'h-12 aspect-square'} src={item.icon} alt=""/>
                    <span className={'mr-auto pl-2 text-lg'}>
                      {item.displayName}
                    </span>
                    <MajorButton
                      disabled={item.installed}
                      className={'h-max'}
                    >
                      {
                        item.installed
                          ? 'Installed'
                          : 'Install'
                      }
                    </MajorButton>
                  </div>
                </div>
              </div>
            ))
          }
        </Carousel>
      </header>
      <h2 className={'text-3xl font-semibold tracking-wide pt-2 pl-5 animate__animated animate__fadeIn animate__250ms'}>{'Categories'}</h2>
      {
        categories.length !== 0 && (
          <section className={'p-4 grid grid-cols-3 gap-2 animate__animated animate__fadeIn animate__250ms'}>
            {
              categories.map(category => (
                <Card
                  className={'text-3xl font-semibold tracking-wide text-center'}
                  key={category}
                  onClick={() => {
                    navigate(`/app/a/store/cat/${ category }`);
                  }}
                >{category}</Card>
              ))
            }
          </section>
        )
      }
    </main>
  );
};

export default StoreApplication;
