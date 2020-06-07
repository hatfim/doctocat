import {
  BorderBox,
  Box,
  Details,
  Flex,
  Grid,
  Heading,
  Position,
  Text,
} from '@primer/components'
import {ChevronDownIcon, ChevronRightIcon} from '@primer/styled-octicons'
import React from 'react'
import Head from './head'
import Header, {HEADER_HEIGHT} from './header'
import PageFooter from './page-footer'
import Sidebar from './sidebar'
import SourceLink from './source-link'
import StatusLabel from './status-label'
import TableOfContents from './table-of-contents'

function Layout({children, pageContext}) {
  const {
    title,
    description,
    status,
    source,
    additionalContributors = [],
  } = pageContext.frontmatter

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Head title={title} description={description} />
      <Header />
      <Flex flex="1 1 auto" flexDirection="row" css={{zIndex: 0}}>
        <Box display={['none', null, null, 'block']}>
          <Sidebar />
        </Box>
        <Grid
          id="skip-nav"
          maxWidth="100%"
          gridTemplateColumns={['100%', null, 'minmax(0, 65ch) 220px']}
          gridTemplateAreas={[
            '"heading" "content"',
            null,
            '"heading ." "content table-of-contents"',
          ]}
          gridColumnGap={[null, null, 6, 7]}
          gridRowGap={3}
          mx="auto"
          p={[5, 6, null, 7]}
          css={{alignItems: 'start', alignSelf: 'start'}}
        >
          <BorderBox
            css={{gridArea: 'heading'}}
            border={0}
            borderBottom={1}
            borderRadius={0}
            pb={2}
          >
            <Heading>{title}</Heading>
          </BorderBox>
          {pageContext.tableOfContents.items ? (
            <Position
              display={['none', null, 'block']}
              css={{gridArea: 'table-of-contents', overflow: 'auto'}}
              position="sticky"
              top={HEADER_HEIGHT + 24}
              maxHeight={`calc(100vh - ${HEADER_HEIGHT}px - 24px)`}
            >
              <Text display="inline-block" fontWeight="bold" mb={1}>
                Table of contents
              </Text>
              <TableOfContents items={pageContext.tableOfContents.items} />
            </Position>
          ) : null}
          <Box css={{gridArea: 'content'}}>
            {status || source ? (
              <Flex mb={3} alignItems="center">
                {status ? <StatusLabel status={status} /> : null}
                <Box mx="auto" />
                {source ? <SourceLink href={source} /> : null}
              </Flex>
            ) : null}
            {pageContext.tableOfContents.items ? (
              <Box display={['block', null, 'none']} mb={3}>
                <Details>
                  {({open}) => (
                    <>
                      <Text as="summary" fontWeight="bold">
                        {open ? (
                          <ChevronDownIcon mr={2} />
                        ) : (
                          <ChevronRightIcon mr={2} />
                        )}
                        Table of contents
                      </Text>
                      <Box pt={1}>
                        <TableOfContents
                          items={pageContext.tableOfContents.items}
                        />
                      </Box>
                    </>
                  )}
                </Details>
              </Box>
            ) : null}
            {children}
            <PageFooter
              editUrl={pageContext.editUrl}
              contributors={pageContext.contributors.concat(
                additionalContributors.map((login) => ({login})),
              )}
            />
          </Box>
        </Grid>
      </Flex>
    </Flex>
  )
}

export default Layout
