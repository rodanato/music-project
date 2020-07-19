class DatabaseService {
  private static instance: DatabaseService;
  public static getInstance() {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }

    return DatabaseService.instance;
  }
}
export default DatabaseService;