import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordDirty, setPasswordDirty] = useState(true)
  const [emailDirty, setEmailDirty] = useState(true)
  const [emailError, setEmailError] = useState('Заполните Email')
  const [passwordError, setPasswordError] = useState(
    'Пароль не может быть пустым'
  )
  const [formValid, setFormValid] = useState(false)
  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError])

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Не корректный email')
    } else {
      setEmailError('')
    }
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,8}$/
    if (!regularExpression.test(e.target.value)) {
      setPasswordError('используйте в пароле спец символ % & # и др')
      if (e.target.value.length < 3 || e.target.value.length > 8) {
        setPasswordError('Пароль должен быть длиннее 3 и меньше 8 символов')
        if (!e.target.value) {
          setPasswordError('Пароль не может быть пустым')
        }
      }
    } else {
      setPasswordError('')
    }
  }
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

  return (
    <div className="App">
      <form className="Form">
        <h1 className="Reg">Регистрация </h1>
        {emailDirty && emailError && (
          <div style={{ color: 'red' }}>{emailError}</div>
        )}
        <input
          onChange={(e) => emailHandler(e)}
          defaultValue={email}
          onBlur={(e) => blurHandler(e)}
          className="Ema"
          mame="email"
          type="text"
          placeholder="Please, enter your email ..."
        />
        {passwordError && passwordDirty && (
          <div style={{ color: 'red' }}>{passwordError}</div>
        )}
        <input
          onChange={(e) => passwordHandler(e)}
          className="Pass"
          name="password"
          type="password"
          defaultValue={password}
          placeholder="Please, enter your password ..."
          onBlur={blurHandler}
        />
        <button disabled={!formValid} className="Reg" type="submit">
          Registration
        </button>
      </form>
    </div>
  )
}

export default App
