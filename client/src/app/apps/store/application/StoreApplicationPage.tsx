import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {IconButton, Spinner, Card, Button, Icon} from '../../../../ui';
import csi from '../../../../helpers/csi';
import {type IYourDashApplication} from '../../../../../../shared/core/application';

import StoreApplicationDefaultHeaderBackground from './default_background.svg';

interface IYourDashApplicationStorePage extends IYourDashApplication {
  icon: string;
  installed: boolean;
}

function requestApplication(
  applicationId: string,
  setAppData: (data: IYourDashApplicationStorePage) => void,
  setIsLoading: (data: boolean) => void,
  navigate: (data: string) => void
) {
  csi.getJson(
    `/app/store/application/${ applicationId }`,
    data => {
      setAppData(data);
      setIsLoading(false);
    },
    () => {
      navigate('/app/a/store');
    }
  );
}

const StoreApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const {id: applicationId} = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [appData, setAppData] = useState<IYourDashApplicationStorePage>();

  useEffect(() => {
    requestApplication(applicationId || 'dash', setAppData, setIsLoading, navigate);
  }, [applicationId, navigate]);

  if (!applicationId) {
    navigate('/app/a/store');
    return null;
  }

  return (
    <div className={'h-full'}>
      {
        isLoading
          ? (
            <div className={'w-full h-full flex items-center justify-center'}>
              <Spinner/>
              {'TODO: add a back button'}
            </div>
          )
          : appData && (
            <>
              <header className={'flex flex-col w-full bg-container-bg'}>
                <div
                  style={{
                    backgroundImage: `url(${ StoreApplicationDefaultHeaderBackground })`
                  }}
                  className="sm:h-64 h-32 transition-all bg-cover bg-center flex select-none items-center justify-center flex-row gap-3 animate__animated animate__fadeIn"
                >
                  <img
                    className={'aspect-square drop-shadow-lg sm:w-24 w-0 transition-all'}
                    src={appData.icon}
                    draggable={false}
                    alt=""
                  />
                  <h1
                    className={'text-5xl tracking-wider font-black drop-shadow-lg w-max'}
                  >{appData.displayName}</h1>
                </div>
                <section
                  className={'flex items-center p-4 gap-4 max-w-[50rem] w-full ml-auto mr-auto animate__animated animate__fadeIn animate__250ms'}
                >
                  <IconButton
                    icon={'arrow-left-16'}
                    onClick={() => {
                      navigate(`/app/a/store/cat/${ appData?.category }`);
                    }}
                  />
                  <img
                    className={'w-24 aspect-square select-none'}
                    src={appData.icon}
                    draggable={false}
                    alt=""
                  />
                  <h1
                    className={'text-4xl font-semibold tracking-wide mr-auto'}
                  >{appData.displayName}</h1>
                  <div className={'flex gap-2'}>
                    <Button onClick={() => {
                      if (appData.installed) {
                        csi.postJson(`/app/store/application/uninstall/${ appData.name }`, {}, resp => {
                          if (resp.success) {
                            requestApplication(applicationId, setAppData, setIsLoading, navigate);
                          }
                        });
                      } else {
                        csi.postJson(`/app/store/application/install/${ appData.name }`, {}, resp => {
                          if (resp.success) {
                            requestApplication(applicationId, setAppData, setIsLoading, navigate);
                          }
                        });
                      }
                    }}
                    >{
                        appData.installed ? 'Remove' : 'Install'
                      }</Button>
                  </div>
                </section>
              </header>
              <main
                className={'p-4 flex flex-col gap-2 max-w-[50rem] w-full ml-auto mr-auto animate__500ms animate__animated animate__fadeIn'}
              >
                <Card>
                  {appData.description}
                </Card>
                <Card className={'flex flex-col'}>
                  <div>{`Category: ${ appData.category }`}</div>
                  <div>{`ID: ${ appData.name }`}</div>
                  <br/>
                  <div>{'Created as part of the YourDash Project'}</div>
                </Card>
                <h2 className={'text-2xl font-medium'}>{'Source Code'}</h2>
                <section className={'grid grid-cols-2 gap-2'}>
                  <Card
                    onClick={() => {
                      window.open(
                        `https://github.com/yourdash-app/yourdash/tree/main/client/src/app/apps/${ appData.name }`
                      );
                    }}
                    className={'flex gap-1 items-center'}
                  >
                    <Icon className={'h-5'} name={'link-16'}/>
                    <span>
                      {'Client'}
                    </span>
                  </Card>
                  <Card
                    onClick={() => {
                      window.open(
                        `https://github.com/yourdash-app/yourdash/tree/main/server/src/apps/${ appData.name }`
                      );
                    }}
                    className={'flex gap-1 items-center'}
                  >
                    <Icon className={'h-5'} name={'link-16'}/>
                    <span>{'Server'}</span>
                  </Card>
                </section>
              </main>
            </>
          )
      }
    </div>
  );
};

export default StoreApplicationPage;
