'use strict';
/*eslint no-process-env:0*/
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL;
var mongoURLLabel = '';

if (mongoURL === null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
  var mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'];
  var mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'];
  var mongoDatabase = process.env[mongoServiceName + '_DATABASE'];
  var mongoPassword = process.env[mongoServiceName + '_PASSWORD'];
  var mongoUser = process.env[mongoServiceName + '_USER'];
  console.log(mongoServiceName, mongoHost, mongoPort, mongoDatabase,
    mongoPassword, mongoUser);

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
  }
}
if (mongoURL === null) {
  // mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
  mongoURL = 'mongodb://mongo:mongo@localhost:27017/exampledb?authSource=admin';
}
var openshiftVars = {
  port: port,
  ip: ip,
  mongoURLLabel: mongoURLLabel,
  mongoURL: mongoURL,
  once: null
};
if (openshiftVars.once === null) {
  console.log('openshiftVars are ========================');
  console.log(openshiftVars);
  openshiftVars.once = 'done_once';
}

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
    process.env.ip ||
    undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI ||
      process.env.MONGOHQ_URL ||
      process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
      mongoURL ||
      'mongodb://localhost/mean1',
    mongoURLLabel: mongoURLLabel
  }
};
