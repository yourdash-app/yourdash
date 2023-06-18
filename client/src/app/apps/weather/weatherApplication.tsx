import React, {useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';

import csi from '../../../helpers/csi';
import {Button, Card, TextInput} from '../../../ui';
import useTranslate from '../../../helpers/l10n';

const WeatherApplication: React.FC = () => {
  const navigate = useNavigate();
  const trans = useTranslate('weather');
  const [locationQuery, setLocationQuery] = useState<{ id: string, name: string, admin1: string, admin2: string, country: string }[]>([]);
  const [
    previousWeatherLocations,
    setPreviousWeatherLocations
  ] = useState<{ name: string; id: number }[]>([]);

  useEffect(() => {
    csi.getJson('/app/weather/previous/locations', resp => {
      setPreviousWeatherLocations(resp || []);
    });
  }, []);

  return (
    <main className={'flex h-full w-full items-center justify-center overflow-auto relative flex-col'}>
      <h2 className={'pt-4 pb-4 pl-4 text-base-50 font-semibold text-3xl bg-container-bg absolute top-0 left-0 w-full'}>
        {trans('YourDash Weather')}
      </h2>
      {previousWeatherLocations.length !== 0 && (
        <Card className={'gap-2 flex flex-col mb-4'}>
          <span>{trans('Previous locations')}</span>
          {
            previousWeatherLocations.map(loc => (
              <Button
                key={loc.id}
                onClick={() => {
                  navigate(`/app/a/weather/location/${ loc.id }`);
                }}
              >
                {loc.name}
              </Button>
            ))
          }
        </Card>
      )}
      <Card className={'gap-2 flex flex-col'}>
        <TextInput
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (locationQuery[0]) {
                navigate(`/app/a/weather/location/${ locationQuery[0].id }`);
              }
            }
          }}
          onChange={(value: string) => {
            csi.getJson(`/app/weather/location/${ value.replaceAll(' ', '+') }`, resp => {
              setLocationQuery(resp?.results || []);
            });
          }}
          label={trans('Location')}
        />
        {locationQuery.map(item => (
          <Button
            key={item.id}
            className={'bg-button-bg hover:bg-button-hover-bg active:bg-button-active-bg text-button-fg hover:text-button-hover-fg active:text-button-active-fg pl-2 pr-2 pt-1 pb-1 transition-[var(--transition)] cursor-pointer'}
            onClick={() => {
              navigate(`/app/a/weather/location/${ item.id }`);
            }}
          >
            {`${ item.name }, ${ item.admin1 && `${ item.admin1 }, ` }${ item.admin2 && `${ item.admin2 }, ` }${ item.country }`}
          </Button>
        ))}
      </Card>
      <a href="https://open-meteo.com/" className={'absolute bottom-0 right-0'}>
        {trans('Powered by {0}', ['open-meteo.com'])}
      </a>
    </main>
  );
};

export default WeatherApplication;
