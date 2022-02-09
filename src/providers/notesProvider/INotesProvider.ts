interface INotesProvider {
  get({ username, password }): Promise<Boolean | String>
}

export { INotesProvider }