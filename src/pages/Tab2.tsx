import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet } from '@ionic/react';
import { camera, trash, close, leaf, earth } from 'ionicons/icons';
import { usePhotoGallery, Photo } from '../hooks/usePhotoGallery';

const Tab2: React.FC = () => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();
  const axios = require('axios'); // HTTP client

  const axiosConfig = {
    headers: {
        'Content-Type': 'text/plain',
        "Access-Control-Allow-Origin": "*",
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photo Gallery</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[
          {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }, {
            text: 'Find with leaf',
            icon: leaf,
            handler: () =>{
              console.log(photoToDelete);
              let data = 'leaf#'+photoToDelete?.webviewPath;

              (async () => {
                axios.post(`http://localhost:5000/api/test`, data, axiosConfig)
                  .then((res : any) => {
                    if (res.data){
                      console.log(res.data);
                    }
                  });
                })();

              console.log('POST_LEAF: finished');
            }
          }, {
            text: 'Find with bark',
            icon: earth,
            handler: () => {
              console.log(photoToDelete);
              let data = 'bark#'+photoToDelete?.webviewPath;

              (async () => {
              axios.post(`http://localhost:5000/api/test`, data, axiosConfig)
                .then((res : any) => {
                  if (res.data){
                    console.log(res.data);
                  }
                });
              })();

              console.log('POST_BARK: finished');
            }
          },
          {
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          }
        
        ]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />


      </IonContent>
    </IonPage>
  );
};

export default Tab2;
