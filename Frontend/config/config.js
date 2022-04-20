const LOCAL_URL = 'http://localhost:3001';

console.log('node env', process.env.NODE_ENV);

const common = {
    PORT: 3001 
}

const development = {
    ...common, 
    URL: LOCAL_URL,  
}

module.exports = development;