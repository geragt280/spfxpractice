declare interface IPracticeWebPartStrings {
  PropertyPaneDescription: string;
  PropertyPaneBook: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  BookFieldLabel: string;
  ListFieldLabel:string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'PracticeWebPartStrings' {
  const strings: IPracticeWebPartStrings;
  export = strings;
}
