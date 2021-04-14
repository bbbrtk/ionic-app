import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
  IonLoading,
} from "@ionic/react";
import { camera, trash, close, leaf, earth } from "ionicons/icons";
import { usePhotoGallery, Photo } from "../hooks/usePhotoGallery";
import { Storage } from "@ionic/storage";
import { useHistory } from "react-router-dom";

const store2 = new Storage();
store2.create().then(() => {
  console.log("Storage created");
});

const Tab2: React.FC = () => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();
  const [showLoading, setShowLoading] = useState(true);
  const axios = require("axios"); // HTTP client

  const axiosConfig = {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    },
  };

  let history = useHistory();

  setTimeout(() => {
    setShowLoading(false);
  }, 300);

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
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Loading..."}
        />
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg
                  onClick={() => setPhotoToDelete(photo)}
                  src={photo.webviewPath}
                />
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
              text: "Cancel",
              icon: close,
              role: "cancel",
            },
            {
              text: "Find with leaf",
              icon: leaf,
              handler: () => {
                setShowLoading(true);
                console.log(photoToDelete);
                let data = "leaf#" + photoToDelete?.webviewPath;

                (async () => {
                  axios
                    .post(`http://localhost:5000/api/test`, data, axiosConfig)
                    .then((res: any) => {
                      if (res.data) {
                        store2.set(getTimestamp(), res.data).then(() => {
                          console.log("stored", res.data);
                          setShowLoading(false);
                          history.push("/tab1");
                        });
                      }
                    });
                })();

                console.log("POST_LEAF: finished");
              },
            },
            {
              text: "Find with bark",
              icon: earth,
              handler: () => {
                setShowLoading(true);
                console.log(photoToDelete);
                let data = "bark#" + photoToDelete?.webviewPath;

                (async () => {
                  axios
                    .post(`http://localhost:5000/api/test`, data, axiosConfig)
                    .then((res: any) => {
                      if (res.data) {
                        store2.set(getTimestamp(), res.data).then(() => {
                          console.log("store:", res.data);
                          setShowLoading(false);
                          history.push("/tab1");
                        });
                      }
                    });
                })();

                console.log("POST_BARK: finished");
              },
            },
            {
              text: "Delete",
              role: "destructive",
              icon: trash,
              handler: () => {
                if (photoToDelete) {
                  deletePhoto(photoToDelete);
                  setPhotoToDelete(undefined);
                }
              },
            },
          ]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
      </IonContent>
    </IonPage>
  );
};

function getTimestamp() {
  const currentDate = new Date();
  const currentSeconds = currentDate.getSeconds();
  const currentMinute = currentDate.getMinutes();
  const currentHour = currentDate.getHours();

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  const currentYear = currentDate.getFullYear();

  return (
    currentYear +
    "-" +
    (currentMonth + 1) +
    "-" +
    currentDayOfMonth +
    " " +
    currentHour +
    ":" +
    currentMinute +
    ":" +
    currentSeconds
  );
}
export default Tab2;
