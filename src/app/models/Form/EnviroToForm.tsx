import { PlaceHoldersMap } from "./PlaceHoldersMapForm";
import { PlaceHolderToForm } from "./PlaceholderToForm";


export class EnviroToForm {
    argoEnvId!: string;
    argoServer!: string|null;
    argoUser!: string|null;
    argoPassword!:string| null;
    argoProj!: string|null;
    environment!: string;
    gitOpsAppsRepo!: string;
    gitOpsRepo!: string;
    placeholders!: PlaceHolderToForm[];
    projectId!: string;
    releaseTag!: string|null;
    placeHoldersMap!: PlaceHoldersMap;
   
  }
  