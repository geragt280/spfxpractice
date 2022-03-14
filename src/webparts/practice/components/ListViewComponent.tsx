import { PrimaryButton } from "@microsoft/sp-property-pane/node_modules/@microsoft/office-ui-fabric-react-bundle";
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import * as React from 'react';
import styles from './Practice.module.scss';
  
export interface IListViewComponentProps {
  listItems: any[];
}


  export default function ListViewComponent ({ listItems }: IListViewComponentProps) {

    
    const [items, setitems] = React.useState([]);
    
    React.useEffect(() => {
      // here we set the item comming from props into the state of list items
      setitems(listItems);      
    });
    
    const _getSelection = (commingitems) => {
        console.log('Selected items:', commingitems);
    };

    const _getDropFiles = (files) => {
        for (var i = 0; i < files.length; i++) {
          console.log(files[i].name);
        }
    };

    const viewFields : IViewField[] = [
      {
        name: 'id',
        displayName: 'S.No',
        sorting: true,
        minWidth: 50,
        maxWidth: 100,
        isResizable: false,
      },
      {
        name: 'book_name',
        displayName: 'Book Name',
        sorting: true,
        minWidth: 100,
        maxWidth: 170,
        isResizable: false,
      },
      {
        name: 'book_author',
        displayName: 'Book Author',
        sorting: true,
        minWidth: 100,
        maxWidth: 170,
        isResizable: false,
      },
      {
        name: 'action',
        displayName: 'Action',
        sorting: false,
        minWidth: 50,
        maxWidth: 100,
        isResizable: false,
        render: (rowitem: any) => {
          const element:React.ReactElement = React.createElement(
            EditButton, 
            {
              item: rowitem
            }
          );
          return element;
        }  
      }
    ];

    const EditButton = ({item}) => {
      return(
        <div>
          <PrimaryButton onClick={() => {console.log(item);}}>Edit</PrimaryButton>
        </div>
      );
    };

    const groupByFields: IGrouping[] = [
        {
          name: "Books", 
          order: GroupOrder.ascending
        },
        // {
        //   name: "Author", 
        //   order: GroupOrder.descending
        // }
    ];
    
    return (
        <div>
          { items.length && <ListView
            items={items}
            viewFields={viewFields}
            // iconFieldName="ServerRelativeUrl"
            // compact={true}
            // selectionMode={SelectionMode.multiple}
            selection={_getSelection}
            showFilter={true}
            defaultFilter=""
            filterPlaceHolder="Search..."
            // groupByFields={groupByFields}
            dragDropFiles={true}
            onDrop={_getDropFiles}
            stickyHeader={true}
            className={styles.listWrapper}
            listClassName={styles.list} />}
        </div>
    );
  }
  