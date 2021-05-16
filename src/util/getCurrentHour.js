const getCurrentHour = () => {
  const now = new Date()

  return `${now.toLocaleDateString()}/${now.getHours}`
}

module.exports = getCurrentHour
