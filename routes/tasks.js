const Task = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async function createTask(){
    const task = new Task({
        name: 'first task'
    });

    const savedTask = await task.save();
    console.log(savedTask);
});