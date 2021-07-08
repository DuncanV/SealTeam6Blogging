mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);
    db.createUser({user: '$MONGO_USERNAME', pwd: '$MONGO_PASSWORD', roles: ["readWrite"]});
    db.counters.insertOne({'_id': 'blogId','sequence_value': 1})
    db.counters.insertOne({'_id': 'userId','sequence_value': 1})
EOF