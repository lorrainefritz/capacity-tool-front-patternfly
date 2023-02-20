import { EnviroToForm } from "./EnviroToForm";
import { VersionForm } from "./VersionForm";


export class ProjectsToForm {
    description!: string;
    environments!: EnviroToForm[];
    gitUrl!: string;
    owner!: string;
    project_Id!: string;
    team!: string;
    valueChain!: string;
    versions!: VersionForm[];
  }
  