import React from 'react';
import { Popup } from 'semantic-ui-react';
import { DataConnectedValue } from '@eeacms/volto-datablocks/Utils';
import { wrapInlineMarkupText } from 'volto-slate/utils';
import { v4 as uuid } from 'uuid';

export const DataEntityElement = ({
  attributes,
  children,
  element,
  mode,
  ...rest
}) => {
  const { data = {} } = element;
  const {
    provider_url,
    column,
    row,
    specifier,
    textTemplate,
    placeholder = ' ',
    withReadmore = false,
    maxChars = null,
  } = data;

  return (
    <>
      {mode === 'view' ? (
        <span {...rest}>
          {wrapInlineMarkupText(children, (c) => (
            <DataConnectedValue
              collapsable={withReadmore}
              collapseLimit={maxChars}
              column={column}
              row={row}
              data={{ data_query: data.data_query }}
              key={uuid()}
              placeholder={placeholder}
              specifier={specifier}
              textTemplate={textTemplate}
              url={provider_url}
            />
          ))}
        </span>
      ) : (
        <Popup
          content={data.entity}
          header="Data entity"
          position="bottom left"
          trigger={
            <span {...attributes} className="data-entity data-entity-edit-node">
              {children}
            </span>
          }
        />
      )}
    </>
  );
};
