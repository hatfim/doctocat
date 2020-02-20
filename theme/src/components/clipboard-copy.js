import {Button, StyledOcticon} from '@primer/components'
import {Check, Clippy} from '@primer/octicons-react'
import copy from 'copy-to-clipboard'
import React from 'react'

function ClipboardCopy({value}) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <Button
      aria-label="Copy to clipboard"
      onClick={() => {
        copy(value)
        setCopied(true)
      }}
      style={{
          background: 'transparent',
          border: '0',
        }}
    >
      <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" >
        <path d="M14,5v9H5V5h9m0-1H5A1,1,0,0,0,4,5v9a1,1,0,0,0,1,1h9a1,1,0,0,0,1-1V5a1,1,0,0,0-1-1Z"></path><path d="M2,9H1V2A1,1,0,0,1,2,1H9V2H2Z"></path>
      </svg>
    </Button>
  )
}

export default ClipboardCopy
