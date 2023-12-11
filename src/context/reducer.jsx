export const reducer = (state, action) => {
  
    switch (action.type) {
      case "USER_LOGIN": {
        const user={
         //data:action.payload,
         name:action.payload?.fullName,
         email:action.payload?.email,
         phone:action.payload?.phone,
         id:action.payload.id,
        }
        return { ...state,isLogin:true, user: user, }
      }
      case "USER_LOGOUT": {
        
        return { ...state, user: null , isLogin:false} 
      }
      case "CHANGE_THEME": {
        return { ...state, darkTheme: !state.darkTheme }
      }
      default: {
       return state
      }
    }
  }