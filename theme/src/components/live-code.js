import {Absolute, BorderBox, Flex, Relative, Text, Button, StyledOcticon} from '@primer/components'
import { ChevronDown, ChevronUp } from '@primer/octicons-react'
import htmlReactParser from 'html-react-parser'
import githubTheme from './prism-themes'
import React from 'react'
import reactElementToJsxString from 'react-element-to-jsx-string'
import {LiveEditor, LiveError, LivePreview, LiveProvider} from 'react-live'
import styled, {ThemeContext} from 'styled-components'
import scope from '../live-code-scope'
import ClipboardCopy from './clipboard-copy'
import LivePreviewWrapper from './live-preview-wrapper'

const languageTransformers = {
  html: html => htmlToJsx(html),
  jsx: jsx => wrapWithFragment(jsx),
}

const Content = styled.div`
  position: ${props => (props.height ? "static" : "absolute")};
  visibility: ${props => (props.height ? "visible" : "hidden")};
  max-height: ${props => (props.height ? props.height : "auto")};
  overflow: hidden;
  transition: max-height 0.1s linear;
  background-color: rgb(250, 250, 250);
  border-radius: 0 0 4px 4px;
  border: 1px solid rgb(245, 245, 245);
  padding: 48px 16px;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 48px;
    display: block;
    background-color: rgb(250, 250, 250);
  }
`;

function htmlToJsx(html) {
  try {
    const reactElement = htmlReactParser(removeNewlines(html))
    // The output of htmlReactParser could be a single React element
    // or an array of React elements. reactElementToJsxString does not accept arrays
    // so we have to wrap the output in React fragment.
    return reactElementToJsxString(<>{reactElement}</>)
  } catch (error) {
    return wrapWithFragment(html)
  }
}

function removeNewlines(string) {
  return string.replace(/(\r\n|\n|\r)/gm, '')
}

function wrapWithFragment(jsx) {
  return `<React.Fragment>${jsx}</React.Fragment>`
}

function LiveCode({code, language}) {
  const theme = React.useContext(ThemeContext)
  const [expanded, setExpanded] = React.useState(false);
  const [maxHeight, setMaxHeight] = React.useState(0);
  const [height, setHeight] = React.useState(null);
  const content = React.useRef(null);

  console.log(content);

  React.useEffect(() => {
    if (content.current) {
      setMaxHeight(content.current.clientHeight);
      setHeight("0px");
    }
  }, []);

  React.useEffect(() => {
    setHeight((expanded ? maxHeight : 200) + "px");
  }, [expanded, maxHeight, setHeight]);

  const expandCodeBtnText = expanded ? 'Show less' : 'Show more';
  return (
    <BorderBox
      as={Flex}
      flexDirection="column"
      border={0}
      mb={3}
    >
      <LiveProvider
        scope={scope}
        code={code}
        transformCode={languageTransformers[language]}
      >
        <LivePreviewWrapper>
          <LivePreview />
        </LivePreviewWrapper>
        <Relative>
          <Content
            ref={content}
            expanded={expanded}
            maxHeight={maxHeight}
            height={height}
          >
              <LiveEditor
                theme={githubTheme}
                ignoreTabKey={true}
                padding={0}
                style={{
                  fontFamily: theme.fonts.mono,
                  fontSize: '85%',
                }}
              />
              <Absolute top={0} right={0} p={2}>
                <ClipboardCopy value={code} />
              </Absolute>
              <Absolute bottom={0} left={0} zIndex={2} p={2}>
                <Button
                  aria-label={expandCodeBtnText}
                  onClick={() => setExpanded(!expanded)}
                  variant="small"
                  style={{
                      background: 'transparent',
                      border: '0',
                      fontWeight:'normal',
                    }}
                >
                  {expandCodeBtnText}&nbsp;
                  <StyledOcticon verticalAlign="middle" icon={expanded ? ChevronUp : ChevronDown} />
                </Button>
              </Absolute>
            </Content>
          </Relative>
        <Text
          as={LiveError}
          m={0}
          p={3}
          fontFamily="mono"
          fontSize={1}
          color="white"
          bg="red.5"
        />
      </LiveProvider>
    </BorderBox>
  )
}

export default LiveCode
