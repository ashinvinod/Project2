
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const UserProfile = (function () {
	let lname = '';
	let fname = '';
	let password = '';

  const getLname = function() { return lname; };
  const setLname = function(lname1) { lname = lname1; };
	const getPassword = function() { return password; };
	const setPassword = function(password1) { password = password1; };

	let getFname = function() { return cookies.get('fname') };
	let setFname = function(fname1) {
		fname = fname1;
		cookies.set('fname', fname, { path: '/' });
	};
	let delFname = function() {
		cookies.remove('fname', { path: '/' })
	}

  return {
    getLname: getLname,
    setLname: setLname,
		getFname: getFname,
		setFname: setFname,
		delFname: delFname,
		getPassword: getPassword,
		setPassword: setPassword
  }

})();

export default UserProfile;
