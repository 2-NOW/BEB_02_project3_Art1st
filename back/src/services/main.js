import db from '../models/index.js'


class MainService {
    constructor() {
        this.Main = db.Profile;
        this.UserServiceInterface = new UserService();
    }

    