import useDOMRef from './use-dom-ref'
import useRipple from './use-ripple'

function App() {
  const mainRef = useDOMRef()
  const domRef = useDOMRef()
  const dom2Ref = useDOMRef()
  const buttonRef = useDOMRef<HTMLButtonElement>()
  const buttonDangerRef = useDOMRef<HTMLButtonElement>()

  const contextRipple = useRipple(mainRef)
  const contextRipple1 = useRipple(domRef)
  const contextRipple2 = useRipple(dom2Ref, { color: 'white' })
  const contextRipple3 = useRipple(buttonRef)
  const contextRipple4 = useRipple(buttonDangerRef)

  return (
    <section className='main' ref={mainRef}>
      <section className='pointer-container' ref={domRef}>
        Click This!
        {contextRipple1}
      </section>
      <section className='pointer-container dark' ref={dom2Ref}>
        Click This!
        {contextRipple2}
      </section>
      <section className='buttons-container'>
        <button type='button' className='button' ref={buttonRef}>
          Button
          {contextRipple3}
        </button>
        <button type='button' className='button danger' ref={buttonDangerRef}>
          Danger Button
          {contextRipple4}
        </button>
      </section>
      {contextRipple}
    </section>
  )
}

export default App
