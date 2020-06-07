import {BorderBox, Flex, Position} from '@primer/components'
import React from 'react'
import navItems from '../nav.yml'
import {HEADER_HEIGHT} from './header'
import NavItems from './nav-items'

function Sidebar() {
  return (
    <Position
      position="sticky"
      top={HEADER_HEIGHT}
      height={`calc(100vh - ${HEADER_HEIGHT}px)`}
      minWidth={260}
      color="gray.8"
      bg="gray.0"
    >
      <BorderBox
        border={0}
        borderRight={1}
        borderRadius={0}
        height="100%"
        style={{overflow: 'auto'}}
      >
        <Flex flexDirection="column">
          <NavItems items={navItems} />
        </Flex>
      </BorderBox>
    </Position>
  )
}

export default Sidebar
