import Users from '../models/Users';
import Doctors from '../models/Doctors';
import Admins from '../models/Admins';
import Address from '../models/Address';
import Phones from '../models/Phones';
import Specializations from '../models/Specializations';

const Models = [
  Users,
  Doctors,
  Admins,
  Address,
  Phones,
  Specializations,
];

export default (connection) => Models.map((model) => model.init(connection));
