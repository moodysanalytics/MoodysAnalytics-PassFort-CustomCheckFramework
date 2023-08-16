import React from 'react';
import { H4, Box, Text, Link } from '@passfort/castle';
import { docsList, Doc } from '../../Types/DocsType';

const DocsAndResources = () => {
  return (
    <Box mb={6}>
      <H4>Docs and Resources</H4>
      {docsList.map((doc: Doc) => (
        <Text>
          {' - '}
          <Link href={doc.href}>{doc.name}</Link>
          {': '}
          {doc.description}
        </Text>
      ))}
    </Box>
  );
};

export default DocsAndResources;
