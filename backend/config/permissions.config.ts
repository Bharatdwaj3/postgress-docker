const PERMISSIONS = {
  admin: [
   'listBook', 'viewBook', 'addBook', 'editBook', 'delBook',
   'listFaculty', 'addFaculty', 'viewFaculty', 'editFaculty', 'delFaculty',
   'listStudent', 'addStudent', 'viewStudent', 'editStudent', 'delStudent'

  ],

  faculty: [
    'listBook', 'viewBook', 
    'viewFaculty', 'editFaculty', 'delFaculty', 
    'viewStudent', 'addStudent', 
  ],

  student: [
    'listBook', 'viewBook', 
    'listFaculty', 'viewFaculty'
  ],
};

export default PERMISSIONS;