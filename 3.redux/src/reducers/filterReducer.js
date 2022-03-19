export const filterReducer = (state = '@set_filter/all', {type}) => {
  if (type === '@set_filter/all') return state = 'all'
  if (type === '@set_filter/important') return state = 'important'
  if (type === '@set_filter/not_important') return state = 'not_important'
  
  return state
}