import { type RefObject, useCallback, useEffect, useState } from 'react'
import Ripple, { type RippleProps, type RippleType } from './ripple'
import { getUniqueID } from './utils'

export interface UseRippleProps extends Omit<RippleProps, 'ripples' | 'onClear'> {
  onClear?: (key: React.Key) => void
}

function useRipple(domRef: RefObject<HTMLElement>, props?: UseRippleProps) {
  const [ripples, setRipples] = useState<RippleType[]>([])

  const onClear = useCallback(
    (key: React.Key) => {
      setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key))

      if (props?.onClear != null) {
        props.onClear(key)
      }
    },
    [props],
  )

  const onClick = useCallback((event: MouseEvent) => {
    const trigger = event.currentTarget as HTMLElement
    const size = Math.max(trigger.clientWidth, trigger.clientHeight)
    const rect = trigger.getBoundingClientRect()

    setRipples((prevRipples) => [
      ...prevRipples,
      {
        key: getUniqueID(prevRipples.length.toString()),
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
        size,
      },
    ])
  }, [])

  useEffect(() => {
    if (domRef.current instanceof HTMLElement) {
      const trigger = domRef.current
      trigger.style.position = 'relative'
      trigger.style.overflow = 'hidden'
      trigger.style.userSelect = 'none'

      trigger?.addEventListener('mousedown', onClick)

      return () => {
        trigger?.removeEventListener('mousedown', onClick)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Ripple key={'ripple'} {...props} ripples={ripples} onClear={onClear} />
}

export type UseRippleReturn = ReturnType<typeof useRipple>

export default useRipple
