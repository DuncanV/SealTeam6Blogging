db = db.getSiblingDB('admin');
// move to the admin db - always created in Mongo
db.auth("adminsealteam", "adminSealTeam123!");
// log as root admin if you decided to authenticate in your docker-compose file...
db = db.getSiblingDB('sealteam6blogging');
// create and move to your new database
db.createUser({
'user': "sealteam",
'pwd': "SealTeam123!",
'roles': [{
    'role': 'readWrite',
    'db': 'sealteam6blogging'}]});
// user created
db.createCollection('counters');
db.createCollection('users');
db.createCollection('blogs');
db.counters.insert({_id: 'blogId', sequence_count: 1});
db.counters.insert({_id: 'userId', sequence_count: 1});
// add new collection