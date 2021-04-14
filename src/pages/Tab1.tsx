import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonLoading,
  IonListHeader,
  IonAvatar,
  IonImg,
  IonButton,
} from "@ionic/react";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { Storage } from "@ionic/storage";
// import { Plugins } from '@capacitor/core';
import "./Tab1.css";
import ModalContainer from "./ModalContainer";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const store = new Storage();
store.create().then((param) => {
  console.log("Storage created", param);
});

let elements: {
  id: string;
  name: string;
  organ: string;
  avatar: string;
  plant: string;
  website: string;
  timestamp: string;
}[] = [];

// store.clear()
// .then(()=> console.log('cleared'));

store.forEach((value, key, index) => {
  elements.push(filterResponse(value, key));
  console.log(key);
});

const Tab1: React.FC<RouteComponentProps> = (props) => {
  // const { Browser } = Plugins;

  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  setTimeout(() => {
    setShowLoading(false);
  }, 2000);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle class="text-center">Last Searches</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Loading..."}
        />
        <IonList>
          <IonListHeader></IonListHeader>

          {elements.map((item, index) => {
            console.log(item.name, item.organ, item.timestamp, item.avatar);
            return (
              <IonItem
                key={item.id}
                onClick={() => {
                  setShowModal(true);
                  console.log(item);
                }}
              >
                <ModalContainer
                  showModalOut={showModal}
                  clickedItem={item}
                ></ModalContainer>
                <IonAvatar slot="start">
                  <IonImg src={item.avatar} />
                </IonAvatar>
                <IonLabel>
                  <h2>{item.name}</h2>
                  <h3>{item.organ}</h3>
                  <p>{item.timestamp}</p>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

function filterResponse(res: any, key: string) {
  let bark = res.bark;
  let plant = res.plant;

  // bark
  let avatar =
    "https://d29fhpw069ctt2.cloudfront.net/icon/image/83114/preview.svg";
  let name = "Unknown";
  let subname = "";
  let website = "https://en.wikipedia.org/wiki/";

  if (bark === undefined || bark.length === 0) {
    // leaf
    avatar =
      "https://d29fhpw069ctt2.cloudfront.net/icon/image/120192/preview.svg";
    name = plant[0].species.scientificNameWithoutAuthor;
    subname = plant[1].species.scientificNameWithoutAuthor;
    website += name;
  } else {
    name = bark.pred;
    subname = plant[0].species.scientificNameWithoutAuthor;
    website = bark.website;
  }

  return {
    id: key,
    name: name,
    organ: subname,
    avatar: avatar,
    plant: JSON.stringify(plant),
    website: website,
    timestamp: key.substring(0, 10),
  };
}
export default Tab1;
