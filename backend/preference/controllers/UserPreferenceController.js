const updatePreferences = (userId, category, action) => {
  const pc = `preferredCategories.${category}`;

  profileService.edit(userId, {
    $inc : {
      [pc] : 1
    }
  })
}

module.exports = {
  updatePreferences,
}