// @flow
class DatabaseService {
  static instance: DatabaseService;
  static getInstance() {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }

    return DatabaseService.instance;
  }
}
export default DatabaseService;