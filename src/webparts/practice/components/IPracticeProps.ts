import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPracticeProps {
  description: string;
  bookname: string;
  context: WebPartContext;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
