const express = require('express')
const mongoose = require('mongoose')
const Poll = require('./models/pollModel')
const User = require('./models/userModel')
const app = express()
const port = 3000
const cors = require('cors')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const whitelist = ['http://localhost:3001', 'http://localhost:3000']
const corsOptions = {
  origin: 'http://localhost:3001'
}

app.use(cors(corsOptions));


// get polls
app.get('/polls', cors(corsOptions), async (req, res) => {
  try {
    const polls = await Poll.find({});
    res.status(200).json(polls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/polls/:id', cors(corsOptions), async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.status(200).json(poll)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message })
  }
})

// get a user
app.get('/signup', cors(corsOptions), (req, res) => {
  res.render("signup")
})

app.get('/', cors(corsOptions), (req, res) => {
  res.render("login");
});


// create a poll
app.post('/poll', cors(corsOptions), async (req, res) => {
  try {
    const { question, options } = req.body;

    const newPoll = new Poll({
      question,
      // questionOwner: user._id,
      // totalVotes,
      options,
    });

    await newPoll.save();

    res.status(201).json({ message: 'Poll submitted successfully', poll: newPoll });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


// registering the user
app.post('/signup', cors(corsOptions), async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    // Check if user with the same email exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


// log the user
app.post('/login', cors(corsOptions), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: 'Wrong password' });
    }

    // Successful login
    res.status(200).json({ success: true, user: { id: user.id } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
})


// Route to handle POST request to submit vote
// app.post('/polls/:id/vote',  cors(corsOptions), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { option } = req.body;

//     // Find the poll by ID
//     const poll = await Poll.findById(id);

//     if (!poll) {
//       return res.status(404).json({ error: 'Poll not found' });
//     }

//     // Update the vote count for the selected option
//     poll.votes.set(option, (poll.votes.get(option) || 0) + 1);

//     // Save the updated poll to the database
//     await poll.save();

//     res.status(200).json({ message: 'Vote submitted successfully' });
//   } catch (error) {
//     console.error('Error submitting vote:', error);
//     res.status(500).json({ error: 'Failed to submit vote' });
//   }
// });


//update a poll

// app.put('/polls/:id', cors(corsOptions), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { newQuestion, newOptions } = req.body;

//     // Construct the update object using $set
//     const updateObj = { $set: { question: newQuestion, options: newOptions.split(",") } };

//     // Use findByIdAndUpdate with the update object
//     const updatedPoll = await Poll.findByIdAndUpdate(id, updateObj, { new: true });

//     if (!updatedPoll) {
//       return res.status(404).json({ message: `Cannot find any poll with ID ${id}` });
//     }

//     res.status(200).json(updatedPoll);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

app.put('/polls/:id', cors(corsOptions), async (req, res) => {
  try {
    const { id } = req.params;
    const { newQuestion, newOptions } = req.body;

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the existing poll by ID
    const existingPoll = await Poll.findById(id);
    if (!existingPoll) {
      return res.status(404).json({ message: `Cannot find any poll with ID ${id}` });
    }

    // Update the poll properties if provided
    if (newQuestion !== undefined) {
      existingPoll.question = newQuestion;
    }
    if (typeof newOptions === 'string') {
      existingPoll.options = newOptions.split(",").map(option => option.trim());
    }

    // Save the updated poll
    const updatedPoll = await existingPoll.save();

    res.status(200).json(updatedPoll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.options('/polls/:id', cors())


//delete a poll
app.delete('/polls/:id', cors(corsOptions), async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findByIdAndDelete(id);
    if (!poll) {
      return res.status(404).json({ message: `cannot find any poll with ID ${id}` })
    }
    res.status(200).json(poll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message })
  }
})


// mongoose.set("strickQuery", false)
mongoose.connect('mongodb+srv://vishmi:vishmi@cluster0.bqj8gyb.mongodb.net/Node-API?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('connected to MongoDB');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  }).catch((error) => {
    console.log(error);
  })