// import React, { createContext, useContext, useState } from 'react'

// // Create the context
// const AuthContext = createContext()

// // Create a provider component
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [user, setUser] = useState(null)

//   const login = (userData) => {
//     setIsLoggedIn(true)
//     setUser(userData)
//   }

//   const logout = () => {
//     setIsLoggedIn(false)
//     setUser(null)
//   }

//   const value = {
//     isLoggedIn,
//     user,
//     login,
//     logout,
//     setIsLoggedIn
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// // Custom hook to use the auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }

// export default AuthContext
