import React, { useState } from "react";
import {
  IonContent,
  IonModal,
  IonProgressBar,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonCardHeader,
  IonButtons,
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonSegment,
} from "@ionic/react";

interface ContainerProps {
  showModalOut: boolean;
  clickedItem: {
    id: string;
    name: string;
    organ: string;
    avatar: string;
    plant: string;
    website: string;
    timestamp: string;
  };
}

const ModalContainer: React.FC<ContainerProps> = ({
  showModalOut,
  clickedItem,
}) => {
  let newPlant = JSON.parse(clickedItem.plant)[0];
  console.log(newPlant);

  return (
    <IonModal isOpen={showModalOut} swipeToClose={true}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="Tab2" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <img
            alt="tree"
            src="https://cdn11.bigcommerce.com/s-nk9wsbd/images/stencil/1280x1280/products/95/576/Picea-rubens-main-compressed__48632.1588087434.jpg?c=2"
          />
          <IonCardHeader>
            <IonCardSubtitle>{clickedItem.name}</IonCardSubtitle>
            <IonCardTitle>{newPlant.species.commonNames[0]}</IonCardTitle>
            <br />
            <IonProgressBar color="primary" value={newPlant.score}>
              Prediction accuracy
            </IonProgressBar>
          </IonCardHeader>
          <IonCardContent>
            <IonSegment>
              <p>
                Check <a href={clickedItem.website}>website</a> to learn more.
              </p>
            </IonSegment>
            <br></br>
            <b>Genus</b> <br />
            {newPlant.species.genus.scientificName} <br />
            <b>Family</b> <br />
            {newPlant.species.family.scientificName} <br />
            <b>Common names</b> <br />
            {newPlant.species.commonNames[1]} <br />
            {newPlant.species.commonNames[2]} <br />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonModal>
  );
};

export default ModalContainer;
