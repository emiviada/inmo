export const isAuthenticated = state => !!state.user.token

export const getLoggedInUser = state => state.user
