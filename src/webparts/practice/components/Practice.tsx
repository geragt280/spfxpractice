import * as React from 'react';
import styles from './Practice.module.scss';
import { IPracticeProps } from './IPracticeProps';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import FormComponent from './FormComponent';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}


export default class Practice extends React.Component<IPracticeProps, {}> {

  public componentDidMount(): void {
    this._renderListAsync()
  }

  private _renderList(items: ISPList[]): void {
    let html: string = '';
    items.forEach((item: ISPList) => {
      
      html += `
    <ul class="${styles.list}">
      <li class="${styles.listItem}">
        <span class="ms-font-l">${item.Title}</span>
      </li>
    </ul>`;
    });
  
    const listContainer: Element = document.querySelector('#spListContainer');
    console.log('List:', html);
    // listContainer.innerHTML = html;
  }

  private _getListData(): Promise<ISPLists> {
    return this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        
        return response.json();
      });
  }

  private _renderListAsync(): void {
  // Local environment
  if (Environment.type == EnvironmentType.SharePoint ||
           Environment.type == EnvironmentType.ClassicSharePoint) {
    console.log('List Called.')
    this._getListData()
      .then((response) => {
        this._renderList(response.value);
      });
  }
}

  public render(): React.ReactElement<IPracticeProps> {
    const {
      description,
      bookname,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.practice} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className='ms-grid'>
 
         <FormComponent/>
          
        </div>
      </section>
    );
  }
}
