const dummy = (blogs) => {
  if(blogs) console.log('')//without this line eslint gives errors
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer,0)
}

module.exports = {
  dummy,
  totalLikes
}