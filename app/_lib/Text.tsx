import { Text as RNText, StyleSheet, type TextProps } from 'react-native'
import { useTheme } from './theme'

function scaleStyle(style: TextProps['style'], getScaledFont: (baseSize: number) => number) {
  if (!style) return style

  const flatStyle = StyleSheet.flatten(style) as any
  if (!flatStyle || typeof flatStyle !== 'object') return style

  if (typeof flatStyle.fontSize === 'number') {
    return { ...flatStyle, fontSize: getScaledFont(flatStyle.fontSize) }
  }

  return flatStyle
}

export default function Text(props: TextProps) {
  const { style, ...rest } = props
  const { getScaledFont } = useTheme()
  const scaledStyle = scaleStyle(style, getScaledFont)

  return <RNText {...rest} style={scaledStyle} />
}
