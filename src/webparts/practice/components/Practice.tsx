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
import { PrimaryButton } from '@microsoft/sp-property-pane/node_modules/@microsoft/office-ui-fabric-react-bundle';
import ListViewComponent from './ListViewComponent';
import { Stack, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import GetListClass from '../classes/GetListClass';
import { sp } from '@pnp/sp';
// import GetListClass from '../classes/GetListClass';

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}


export default class Practice extends React.Component<IPracticeProps, {}> {

  // private ListClass = new GetListClass(this.props.context);
  public state = {
    showForm: false,
    bookItemsList: [],
  }

  public componentDidMount(): void {
    this._renderListAsync();
    
    console.log('I ran the didMount.');
    this.getBooks();
  }

  private async getBooks(){
    var book = new GetListClass(this.context);
    var items = await book.getItemInsideList('');
    console.log(items);
    var tempArr = [];
    items.forEach(element => {

      const singleItem = {
        id:element.Id,
        book_name: element.Title,
        book_author: element.Bookauthor,
      }
      tempArr.push(singleItem);
    });
    this.setState({ bookItemsList: tempArr });
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
    // console.log('List:', html);
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
    console.log('List Called.');
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

    const stackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.whiteTranslucent40,
        height: 420,
        justifyContent:'space-between',
        gridGap:'100'
      },
    };
    const wrapStackTokens: IStackTokens = { childrenGap: 30 };
    const sectionStackTokens: IStackTokens = { childrenGap: 30 };

    return (
      <section className={`${styles.practice} ${hasTeamsContext ? styles.teams : ''}`}>
        <Stack wrap styles={stackStyles} tokens={wrapStackTokens}>
          <div className='ms-Grid'>
            <div className={styles.itemStyles}>
            {this.state.showForm ? <FormComponent/> : <PrimaryButton onClick={() => { this.setState({ showForm:true }) }}>Add Book</PrimaryButton>}         
            </div>
          
            <div className={styles.itemStyles}>
              {!this.state.showForm ?<ListViewComponent listItems={this.state.bookItemsList} /> : <div /> }
            </div>

          </div>
        </Stack>
      </section>
    );
  }
}
