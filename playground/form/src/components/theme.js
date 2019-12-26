import React, { useState } from 'react'
//创建并export上下文
const ThemeContext = React.createContext(null);

function Theme({ children }) {
  let [theme, setTheme] = useState({
    color: 'red', 'font-size': '14px'
  });
  return (
    <ThemeContext.Provider theme={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider >
  );
}

export { ThemeContext, Theme };