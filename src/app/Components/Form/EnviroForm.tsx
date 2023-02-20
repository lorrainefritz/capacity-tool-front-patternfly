import React from 'react';
import { EnviroToForm } from '@app/models/Form/EnviroToForm';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { EnviroFormInput } from './EnviroFormInput';


export const EnviroForm: React.FC<{ gitTitle: string; environments: EnviroToForm[] }> = (props) => {
  const enviros: EnviroToForm[] = props.environments;
  console.table(enviros);

  const title: string = props.gitTitle;


  return (
    <React.Fragment>
      <h1>{title}</h1>
      {enviros.map((enviro) => (
        <TableComposable>
          <Thead>
            <Tr>
              <Th>{enviro.environment}</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr key={enviro.environment}>
              <Td>
                <EnviroFormInput placeholders={enviro.placeholders} />
              </Td>
            </Tr>
          </Tbody>
        </TableComposable>
      ))}
    </React.Fragment>
  );
};
