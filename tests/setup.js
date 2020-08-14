import chai from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();
chai.expect();
module.exports = chai;