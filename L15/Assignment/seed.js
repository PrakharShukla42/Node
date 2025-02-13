const mongoose = require('mongoose');
const Post = require('./models/post');

mongoose.connect('mongodb://127.0.0.1:27017/Assignment-13Feb')
    .then(() => { console.log('DB connected!'); })
    .catch(() => { console.log('DB not connected'); });

let dummyData = [
    {
        title: 'Understanding JavaScript',
        content: 'JavaScript is a versatile programming language used for web development, backend services, and even machine learning.',
        comments: ['Great post!', 'Very informative!'],
        tag: 'Programming'
    },
    {
        title: 'The Future of AI',
        content: 'Artificial Intelligence is transforming industries by automating tasks, enhancing decision-making, and improving efficiency.',
        comments: ['AI is the future!', 'Thanks for sharing!'],
        tag: 'Technology'
    },
    {
        title: 'Healthy Eating Habits',
        content: 'A balanced diet is crucial for maintaining a healthy lifestyle. Incorporate fruits, vegetables, and proteins for better well-being.',
        comments: ['Very helpful!', 'Will try these tips.'],
        tag: 'Health'
    },
    {
        title: 'Introduction to Node.js',
        content: 'Node.js allows developers to run JavaScript on the server, enabling full-stack development using a single language.',
        comments: ['Node.js is amazing!', 'Looking forward to learning more.'],
        tag: 'Web Development'
    }
];

Post.create(dummyData)
    .then(() => {
        console.log('Posts created!');
        mongoose.connection.close(); 
    })
    .catch((err) => {
        console.error('Error creating posts:', err);
    });
