const toLocaleDateJA = locale => {
  const date = new Date(locale)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}年${month}月${day}日`
}

export default toLocaleDateJA
