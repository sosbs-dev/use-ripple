import { useImperativeHandle, useRef } from 'react'
import type { Ref, RefObject } from 'react'

function useDOMRef<T extends HTMLElement = HTMLElement>(ref?: RefObject<T | null> | Ref<T | null>) {
  const domRef = useRef<T>(null)

  useImperativeHandle(ref, () => domRef.current)

  return domRef
}

export default useDOMRef
